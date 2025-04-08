// --- Imports ---
import fs from "fs/promises"; // For file system operations (reading cookies/proxies)
import { HttpsProxyAgent } from "https-proxy-agent"; // For using HTTPS proxies
import fetch from "node-fetch"; // For making HTTP requests
import chalk from "chalk"; // For styling console output
import readline from 'readline/promises'; // For reading user input from the console
import axios from 'axios'; // For checking proxy speed/validity
import { banner, welcomeBox } from './banner.js'; // Import banner and welcome box from banner.js

// --- Helper Function: Logger ---
// Logs messages to the console with timestamps and color-coded levels.
function logger(message, level = "info") {
  const now = new Date().toISOString(); // Get current time in ISO format
  // Define colors for different log levels
  const colors = {
    info: chalk.blue,
    warn: chalk.yellow,
    error: chalk.red,
    success: chalk.green,
    debug: chalk.magenta,
  };
  const color = colors[level] || chalk.white; // Get color for the level, default to white
  console.log(color(`[${now}] [${level.toUpperCase()}]: ${message}`)); // Log the formatted message
}

// --- HTTP Headers ---
// Defines the headers used in the fetch requests to Beamable.
const headers = {
  "accept": "text/x-component",
  "accept-language": "en-US,en;q=0.9", // Prefer English
  "cache-control": "no-cache",
  "content-type": "text/plain;charset=UTF-8",
  // These 'next-*' headers might be specific session/navigation identifiers.
  // Keep them as they were unless you know they need changing.
  "next-action": "156628cb6385c96158d83bc55246f2a1b6e0b7ba",
  "next-router-state-tree": "%5B%22%22%2C%7B%22children%22%3A%5B%22modules%22%2C%7B%22children%22%3A%5B%5B%22moduleId%22%2C%22clg3lq7ec0000111v8b9k2vyd%22%5D%2C%7B%22children%22%3A%5B%22quests%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%5D%7D%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
  "pragma": "no-cache",
  "priority": "u=1, i",
  "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "Referer": "https://app.beamable.com/modules/clg3lq7ec0000111v8b9k2vyd/quests",
  "Referrer-Policy": "strict-origin-when-cross-origin"
};

// --- Function to read cookie and proxy files ---
// Reads 'cookie.txt' and 'proxy.txt', handles errors, and creates files if missing.
async function readFiles() {
  try {
    // Read both files concurrently
    const [proxyData, cookieData] = await Promise.all([
      fs.readFile("proxy.txt", "utf8").catch(() => ""), // Return empty string if proxy file doesn't exist
      fs.readFile("cookie.txt", "utf8"), // This one is required, will throw error if missing
    ]);

    // Split lines and filter out empty ones
    const proxies = proxyData.split(/\r?\n/).filter(line => line.trim() !== '');
    const cookies = cookieData.split(/\r?\n/).filter(line => line.trim() !== '');

    // Ensure cookies are present
    if (cookies.length === 0) {
      logger("Cookie file is empty or missing. Please add cookies to cookie.txt", "error");
      // Attempt to create cookie.txt if it was missing
      try {
          await fs.access('cookie.txt'); // Check if file exists
      } catch (e) {
          await fs.writeFile('cookie.txt', '', 'utf8');
          logger('Created empty cookie.txt', 'warn');
      }
      process.exit(1); // Exit if no cookies
    }

    // Create proxy.txt if it was missing
     try {
         await fs.access('proxy.txt');
     } catch (e) {
         await fs.writeFile('proxy.txt', '', 'utf8');
         logger('Created empty proxy.txt', 'warn');
     }


    logger(`Read ${cookies.length} cookies and ${proxies.length} proxies.`, "info");
    return { proxies, cookies }; // Return the arrays
  } catch (error) {
    logger(`Error reading files: ${error.message}`, "error");
    // Handle case where cookie.txt specifically couldn't be read (other than not existing)
    if (error.code !== 'ENOENT') { // ENOENT handled above for cookie.txt
        logger('An unexpected error occurred while reading files.', 'error');
    }
    process.exit(1); // Exit on error
  }
}

// --- Function to check proxy speed and validity ---
// Uses api.ipify.org to check if the proxy works and measures response time.
async function checkProxySpeed(agent) {
    const startTime = Date.now(); // Record start time
    try {
        // Make request through the proxy agent
        const response = await axios.get('https://api.ipify.org?format=json', {
            httpsAgent: agent,
            timeout: 10000 // 10 seconds timeout
        });
        const endTime = Date.now(); // Record end time
        // Return success details
        return {
            time: endTime - startTime,
            statusCode: response.status,
            ip: response.data.ip // Return the IP seen by the target server
        };
    } catch (error) {
        const endTime = Date.now(); // Record end time even on error
        logger(`Proxy check failed: ${error.message}`, 'error');
        // Return failure details
        return {
            time: endTime - startTime,
            statusCode: error.response ? error.response.status : 'N/A', // Get status code if available
            ip: 'N/A'
        };
    }
}


// --- Function to click the daily login quest ---
// Sends a POST request to simulate clicking the quest.
async function clickQuest(cookie, agent) {
  logger(`Clicking daily login quest...`, 'info');
  try {
    const response = await fetch("https://app.beamable.com/modules/clg3lq7ec0000111v8b9k2vyd/quests", {
      "headers": { ...headers, "cookie": cookie }, // Add specific account cookie
      // The body contains the action details for Beamable's backend.
      "body": "[\"{\\\"id\\\":\\\"clg3lq7ec0000111v8b9k2vyd\\\"}\",\"clickQuest\",[[\"$K\",\"quest_daily_login\"]]]",
      "method": "POST",
      agent // Use proxy agent if provided
    });
    const data = await response.text(); // Get response body as text
    // Check for errors in response or non-200 status
    if (data.includes('error') || response.status !== 200) {
        logger(`Failed to click quest. Status: ${response.status}, Response: ${data.substring(0, 100)}...`, 'error');
    } else {
        logger("Clicked daily login quest successfully.", "success");
    }
  } catch (error) {
    logger(`Error clicking quest: ${error.message}`, "error");
  }
}

// --- Function to complete (claim) the daily login quest ---
// Sends a POST request to simulate completing/claiming the quest.
async function completeQuest(cookie, agent) {
  logger(`Completing daily login quest...`, 'info');
  try {
    const response = await fetch("https://app.beamable.com/modules/clg3lq7ec0000111v8b9k2vyd/quests", {
      "headers": { ...headers, "cookie": cookie }, // Add specific account cookie
      // The body contains the action details for Beamable's backend.
      "body": "[\"{\\\"id\\\":\\\"clg3lq7ec0000111v8b9k2vyd\\\"}\",\"completeQuest\",[[\"$K\",\"quest_daily_login\"]]]",
      "method": "POST",
      agent // Use proxy agent if provided
    });
    const data = await response.text(); // Get response body as text
    // Check for errors in response or non-200 status
     if (data.includes('error') || response.status !== 200) {
        logger(`Failed to complete quest. Status: ${response.status}, Response: ${data.substring(0, 100)}...`, 'error');
    } else {
        // Basic check if rewards were mentioned in the response
        if (data.includes('xp') || data.includes('energy')) {
             logger("Completed daily login quest and claimed rewards.", "success");
        } else {
             logger("Completed daily login quest (no specific reward info found in response).", "success");
        }
    }
  } catch (error) {
    logger(`Error completing quest: ${error.message}`, "error");
  }
}

// --- Function for daily check-in ---
// Sends a POST request to perform the separate daily check-in action.
async function dailyCheckIn(cookie, agent) {
  logger(`Performing daily check-in...`, 'info');
  try {
    const response = await fetch("https://app.beamable.com/modules/clg3lq7ec0000111v8b9k2vyd/quests", {
      "headers": { ...headers, "cookie": cookie }, // Add specific account cookie
      // The body contains the action details for Beamable's backend.
      "body": "[\"{\\\"id\\\":\\\"clg3lq7ec0000111v8b9k2vyd\\\"}\",\"dailyCheckIn\",[]]",
      "method": "POST",
      agent // Use proxy agent if provided
    });
    const data = await response.text(); // Get response body as text
    // Check for errors in response or non-200 status
    if (data.includes('error') || response.status !== 200) {
        logger(`Daily check-in failed. Status: ${response.status}, Response: ${data.substring(0, 100)}...`, 'error');
         // Specifically check if the error is because it was already done today
         if (data.includes("Already checked in today")) {
             logger("Already checked in today for this account.", "warn");
         }
    } else {
        logger("Daily check-in successful.", "success");
    }
  } catch (error) {
    logger(`Error during daily check-in: ${error.message}`, "error");
  }
}


// --- Main Execution Logic ---
// Orchestrates the script's flow.
async function main() {
  // Display Banner and Welcome Box from banner.js
  console.log(banner);
  console.log(welcomeBox);

  // Setup readline interface for user input
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  // Ask user if they want to perform tasks (click & complete) or just daily check-ins
  let doTask = '';
  while (doTask !== 'y' && doTask !== 'n') {
      doTask = await rl.question(chalk.cyan('Do you want to perform tasks (click & complete quest), or just daily check-ins? (y/n): '));
      doTask = doTask.toLowerCase().trim(); // Normalize input
      if (doTask !== 'y' && doTask !== 'n') {
          logger("Invalid input. Please enter 'y' or 'n'.", "warn");
      }
  }
  rl.close(); // Close readline interface after getting input

  // --- Main Loop ---
  // Runs indefinitely, processing accounts and waiting 24 hours.
  while (true) {
    const { proxies, cookies } = await readFiles(); // Read files fresh each cycle

    logger(`Starting new cycle with ${cookies.length} accounts. Task mode: ${doTask === 'y' ? 'Enabled' : 'Disabled'}`, "info");

    // Iterate through each cookie (account)
    for (let i = 0; i < cookies.length; i++) {
      const accountIndex = i + 1; // User-friendly 1-based index
      logger(`--- Processing Account ${accountIndex} / ${cookies.length} ---`, 'info');
      const cookie = cookies[i];
      let agent = null; // Proxy agent, null if no proxy or proxy fails
      let proxyInfo = 'None'; // For logging which proxy is used

      // --- Proxy Setup ---
      // Use a proxy if available, cycling through the proxy list.
      if (proxies.length > 0) {
          const proxyIndex = i % proxies.length; // Use modulo to loop through proxies
          const proxyUrl = proxies[proxyIndex];
          if (proxyUrl && proxyUrl.trim()) { // Ensure proxy URL is not empty
              try {
                  agent = new HttpsProxyAgent(proxyUrl); // Create agent
                  proxyInfo = proxyUrl;
                  logger(`Attempting to use proxy: ${proxyInfo} for Account ${accountIndex}`, 'debug');

                  // --- Check Proxy ---
                  const proxyCheckResult = await checkProxySpeed(agent);
                   if (proxyCheckResult.statusCode === 200) {
                       // Proxy is working
                       logger(`Proxy check OK for ${proxyInfo} - Speed: ${proxyCheckResult.time}ms - IP: ${proxyCheckResult.ip}`, 'success');
                   } else {
                       // Proxy failed check
                       logger(`Proxy check FAILED for ${proxyInfo} - Status: ${proxyCheckResult.statusCode}. Continuing without proxy for this account.`, 'error');
                       agent = null; // Reset agent to null, don't use the failed proxy
                       proxyInfo = 'Failed - None Used';
                   }
              } catch (e) {
                   // Error creating proxy agent (e.g., invalid URL format)
                   logger(`Invalid proxy format or error creating agent for ${proxyUrl}: ${e.message}. Continuing without proxy.`, 'error');
                   agent = null;
                   proxyInfo = 'Error - None Used';
              }
          } else {
             // Handle case where proxy line exists but is empty/whitespace
             proxyInfo = 'Empty line in proxy file';
             logger(`Empty proxy line at index ${proxyIndex} for Account ${accountIndex}. Continuing without proxy.`, 'warn');
             agent = null;
          }
      } else {
          // No proxies listed in the file
          logger(`No proxies found in proxy.txt. Running Account ${accountIndex} without proxy.`, 'info');
      }


      // --- Perform Actions based on user choice ---
      if (doTask === 'y') {
        // Click quest, wait, then complete quest
        await clickQuest(cookie, agent);
        const claimDelaySeconds = 10;
        logger(`Waiting ${claimDelaySeconds} seconds before claiming...`, 'warn');
        await new Promise(resolve => setTimeout(resolve, claimDelaySeconds * 1000)); // Wait
        await completeQuest(cookie, agent);
      }

      // Always perform daily check-in regardless of task choice
      await dailyCheckIn(cookie, agent);

      logger(`--- Account ${accountIndex} Processing Complete ---`, 'info');

      // --- Delay between accounts ---
      // Add a small delay to avoid potential rate limiting by the server.
      if (i < cookies.length - 1) { // Don't delay after the last account
          const delaySeconds = 5; // 5 seconds delay
          logger(`Waiting ${delaySeconds} seconds before processing the next account...`, 'info');
          await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
      }
    } // End of loop through accounts

    // --- Wait for the next cycle ---
    const waitHours = 24;
    const bufferMinutes = 5;
    const waitMilliseconds = (waitHours * 60 * 60 * 1000) + (bufferMinutes * 60 * 1000); // 24 hours + 5 minutes buffer
    const nextRunTime = new Date(Date.now() + waitMilliseconds); // Calculate approximate next run time
    logger(`All accounts processed for this cycle. Waiting approx. ${waitHours} hours until the next run (around ${nextRunTime.toLocaleString()})...`, 'warn');
    await new Promise(resolve => setTimeout(resolve, waitMilliseconds)); // Wait for the calculated duration

  } // End of main while(true) loop
}

// --- Start the script ---
// Calls the main function and catches any top-level unhandled errors.
main().catch(error => {
  logger(`Unhandled error in main execution: ${error.message}`, "error");
  console.error(error); // Log the full error stack for debugging
  process.exit(1); // Exit with an error code
});
