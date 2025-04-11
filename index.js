import fs from "fs/promises"; // [cite: 1]
import { HttpsProxyAgent } from "https-proxy-agent"; // [cite: 1]
import fetch from "node-fetch"; // [cite: 1]
import chalk from "chalk"; // [cite: 1]
import readline from 'readline/promises'; // [cite: 2]
import { banner, welcomeBox, followBox } from './banner.js';

// Display Follow Box first
console.log(followBox);

// Display Welcome Box
console.log(welcomeBox);

// Display Banner
console.log(banner);


// Helper Function: Logger
function logger(message, level = "info") { // [cite: 2]
  const now = new Date().toISOString(); // [cite: 2]
  const colors = { // [cite: 3]
    info: chalk.blue,
    warn: chalk.yellow,
    error: chalk.red,
    success: chalk.green,
    debug: chalk.magenta,
  };
  const color = colors[level] || chalk.white; // [cite: 4]
  console.log(color(`[${now}] [${level.toUpperCase()}]: ${message}`)); // [cite: 4]
}

// Updated Headers based on beam.txt
const headers = { // [cite: 4]
  "accept": "text/x-component",
  "accept-language": "en-US,en;q=0.9,vi;q=0.8",
  "content-type": "text/plain;charset=UTF-8",
  "next-router-state-tree": "%5B%22%22%2C%7B%22children%22%3A%5B%5B%22host%22%2C%22hub.beamable.network%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22modules%22%2C%7B%22children%22%3A%5B%5B%22moduleIdOrPath%22%2C%22questsold%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%5B%22moduleNestedId1%22%2C%227570%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2C%22%2Fmodules%2Fquestsold%2F7570%22%2C%22refresh%22%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D", // [cite: 4] Note: This might need periodic updates
  "priority": "u=1, i",
  "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"", // [cite: 4] Note: This might need periodic updates
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "Referer": "https://hub.beamable.network/modules/questsold/7571", // [cite: 4] Note: Referer might need updates depending on the quest
  "Referrer-Policy": "strict-origin-when-cross-origin"
};

async function readFiles() { // [cite: 5]
  const proxyStr = await fs.readFile("proxies.txt", "utf-8"); // [cite: 5]
  // Read proxies, filter out empty lines and comment line
  const proxies = proxyStr.trim().split("\n").map(proxy => proxy.trim()).filter(p => p && !p.startsWith('[source: 2]')); // [cite: 5]
  const cookieData = await fs.readFile("cookies.txt", "utf-8"); // [cite: 6]
  // Read cookies, filter out empty lines and comment line
  const cookies = cookieData.trim().split("\n").map(cookie => cookie.trim()).filter(c => c && !c.startsWith('[source: 1]')); // [cite: 6]
  return { proxies, cookies }; // [cite: 6]
}

async function getNonce(cookie, agent) { // [cite: 22]
  const url = 'https://hub.beamable.network/modules/aprildailies'; // [cite: 23]
  headers.Cookie = cookie; // [cite: 23]

  for (let attempt = 1; attempt <= 5; attempt++) { // [cite: 23]
    try {
      const request = await fetch(url, { // [cite: 23]
        method: 'GET',
        headers,
        agent,
      });
      const response = await request.text(); // [cite: 24]
      // Increased slice size just in case nonce is deeper in a large response
      const text = response.slice(-500000); // [cite: 24]
      const cleanedText = text.replace(/\\"/g, '"'); // [cite: 24]
      const regex = /"nonce":"([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})"/; // [cite: 24]
      const match = cleanedText.match(regex); // [cite: 25]

      if (match) { // [cite: 25]
        logger(`Nonce found on attempt ${attempt}`, 'debug');
        return match[1]; // [cite: 25]
      } else {
        logger(`Nonce not found (attempt ${attempt})`, 'warn'); // [cite: 26]
      }
    } catch (error) {
      logger(`Error getting nonce (attempt ${attempt}): ${error.message}`, 'error'); // [cite: 27]
    }

    if (attempt < 5) { // [cite: 28]
      logger(`Retrying nonce fetch in 5 seconds...`);
      // Wait 5 seconds before retrying [cite: 28]
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  // If nonce is not found after 5 attempts [cite: 29]
  logger('Failed to get nonce after 5 attempts.', 'error');
  return null; // [cite: 30]
}


async function clickQuest(cookie, agent, nonce) { // [cite: 7]
    if (!nonce) {
        logger("Skipping clickQuest due to missing nonce.", "warn");
        return;
    }
    try {
      // Fetch quest details dynamically [cite: 7]
      const response = await fetch(`https://gist.githubusercontent.com/hthodev/d34feb751b2314dd8abdfa4f1b2b60a4/raw/beamable_quest.txt`, {
        method: "GET",
        agent // Use agent for fetching quest list if proxy is configured
      });
      logger("Checking for new quests to click..."); // [cite: 8] (English translation)

      const res = await response.text();
      if (!res || res.trim() === 'none') { // [cite: 9]
        logger("No new quests found to click."); // [cite: 9] (English translation)
        return;
      }

      const quests = res.trim().split('\n').map(quest => quest.trim()); // [cite: 10]
      const questAsync = []; // [cite: 11]
      logger(`Found ${quests.length} quests to click.`);
      for (const quest of quests) { // [cite: 11]
        const [questId, body] = quest.split('||').map(data => data.trim()); // [cite: 11]
        if (!questId || !body) {
            logger(`Skipping invalid quest data line: ${quest}`, 'warn');
            continue;
        }
        const url = `https://hub.beamable.network/modules/questsold/${questId}`; // [cite: 11]
        headers["next-action"] = "7f88f675202a5b494db75a56741697346cbe35156f"; // [cite: 11] Note: This action ID might need updates
        headers["cookie"] = cookie; // [cite: 11]
        const bodyNonce = body.replace('uuid', nonce); // [cite: 11] Replace placeholder with actual nonce
        questAsync.push(fetch(url, { // [cite: 11]
          method: 'POST',
          headers, // [cite: 12]
          agent,
          body: bodyNonce // [cite: 12]
        }));

        logger(`Clicking quest ${questId}...`); // [cite: 12] (English translation)
      }
      // Wait for all click requests to complete
      const results = await Promise.allSettled(questAsync); // [cite: 12]
      results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
              logger(`Quest ${quests[index].split('||')[0]} clicked successfully.`, 'debug');
          } else {
              logger(`Failed to click quest ${quests[index].split('||')[0]}: ${result.reason}`, 'error');
          }
      });
      logger("Finished clicking all new quests.", "success"); // [cite: 12] (English translation)


    } catch (error) {
      logger(`Error processing click quests: ${error.message}`, 'error'); // [cite: 12] (English translation)
    }
}

async function completeQuest(cookie, agent) { // [cite: 13]
    try {
      // Fetch quest completion details dynamically [cite: 13]
      const response = await fetch(`https://gist.githubusercontent.com/hthodev/ce040c0cb8cc5a3e0a01b47556237225/raw/beamable_complete_quest.txt`, {
        method: "GET",
        agent // Use agent for fetching quest list if proxy is configured
      });
      logger("Checking for new quests to claim...");

      const res = await response.text(); // [cite: 14]
      if (!res || res.trim() === 'none') { // [cite: 14]
        logger("No new quests found to claim.");
        return; // [cite: 15]
      }

      const quests = res.trim().split('\n').map(quest => quest.trim()); // [cite: 15]
      const questAsync = []; // [cite: 16]
       logger(`Found ${quests.length} quests to claim.`);
      for (const quest of quests) { // [cite: 16]
        const [questId, body] = quest.split('||').map(data => data.trim()); // [cite: 16]
         if (!questId || !body) {
            logger(`Skipping invalid claim data line: ${quest}`, 'warn');
            continue;
        }
        const url = `https://hub.beamable.network/modules/questsold/${questId}`; // [cite: 16]
        headers["next-action"] = "7f63ca5a304b9b646d220b090c9a8b2346108e02e0"; // [cite: 16] Note: This action ID might need updates
        headers.Cookie = cookie; // [cite: 16]
        questAsync.push(fetch(url, { // [cite: 16]
          method: 'POST',
          headers,
          agent,
          body // [cite: 17]
        }));
        logger(`Claiming quest ${questId}...`); // [cite: 17] (English translation)

      }
      // Wait for all claim requests to complete
      const results = await Promise.allSettled(questAsync); // [cite: 17]
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
              logger(`Quest ${quests[index].split('||')[0]} claimed successfully.`, 'success');
          } else {
              logger(`Failed to claim quest ${quests[index].split('||')[0]}: ${result.reason}`, 'error');
          }
      });
      logger("Finished claiming all new quests.", "success"); // [cite: 17] (English translation)

    } catch (error) {
      logger(`Error processing claim quests: ${error.message}`, 'error'); // [cite: 17] (English translation)
    }
}

async function checkProxySpeed(agent) { // [cite: 17]
  const startTime = Date.now();
  const controller = new AbortController(); // [cite: 18]
  const timeout = setTimeout(() => controller.abort(), 5000); // [cite: 18] 5 second timeout
  const testUrl = "https://icanhazip.com/"; // [cite: 19] Simple IP check site
  try {
      const response = await fetch(testUrl, { // [cite: 19]
          agent,
          signal: controller.signal,
      });

      clearTimeout(timeout); // [cite: 20]
      const elapsedTime = Date.now() - startTime; // [cite: 20]
      return { // [cite: 20]
          status: 'success',
          time: elapsedTime,
          statusCode: response.status,
      };
  } catch (error) { // [cite: 21]
      clearTimeout(timeout); // Clear timeout in case of non-timeout error
      return { // [cite: 21]
          status: 'error',
          error: error.name === 'AbortError' ? 'Timeout' : error.message, // [cite: 22]
      };
  }
}

async function openBox(cookie, agent) { // [cite: 22]
  try {
    const url = 'https://hub.beamable.network/modules/profile/5456'; // [cite: 22] Note: This ID might change
    headers.Cookie = cookie; // [cite: 22]
    headers["next-action"] = "7f1ddd18727e2bda9884d4f73c1ed2de315c9667cf"; // [cite: 22] Note: This action ID might need updates
    await fetch(url, { // [cite: 22]
      method: 'POST',
      headers,
      agent,
      body: "[5456,{\"path\":\"/profile/5456\"},1]" // [cite: 22] Note: Body might need updates if ID changes
    });
    logger("Opened daily box successfully", 'success'); // [cite: 22] (English translation)

  } catch (error) {
    logger(`Error opening daily box: ${error.message}`, 'error'); // [cite: 22] (English translation)
  }
}


async function dailyCheckIn(cookie, agent, nonce) { // [cite: 30]
   if (!nonce) {
        logger("Skipping dailyCheckIn due to missing nonce.", "warn");
        return;
    }
  try {
    // Use a distinct header object for this request to avoid conflicts potentially?
    const dailyHeaders = { // [cite: 30]
        "accept": "text/x-component",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "text/plain;charset=UTF-8",
        "next-action": "7fb84504b1af6fa4a015452e147da5ba17d2d03551", // [cite: 30] Note: This action ID might need updates
        "next-router-state-tree": "%5B%22%22%2C%7B%22children%22%3A%5B%5B%22host%22%2C%22hub.beamable.network%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22modules%22%2C%7B%22children%22%3A%5B%5B%22moduleIdOrPath%22%2C%22aprildailies%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2C%22%2Fmodules%2Faprildailies%22%2C%22refresh%22%5D%7D%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D", // [cite: 30] Note: This might need periodic updates
        "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Herond\";v=\"120\"", // [cite: 30] Example, might need updates
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"", // [cite: 31]
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1", // [cite: 31]
        "cookie": cookie,
        "Referer": "https://hub.beamable.network/modules/aprildailies",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    };
    const a = await fetch("https://hub.beamable.network/modules/aprildailies", { // [cite: 30]
      headers: dailyHeaders, // [cite: 31]
      body: `[467,"${nonce}","aprildailies"]`, // [cite: 31] Note: The ID 467 might need updates
      method: "POST", // [cite: 31]
      agent
    });
    if (a.status == 200) { // [cite: 32]
      logger("Daily check-in successful", 'success'); // [cite: 32] (English translation)
      await openBox(cookie, agent); // [cite: 32] Call openBox on successful check-in
    } else if (a.status == 403) { // [cite: 32]
      logger("Error: Blocked due to proxy location restrictions by the project.", 'error'); // [cite: 32] (English translation)
    } else if (a.status == 504 || a.status == 502 || a.status == 503) { // [cite: 32] Handling common server errors
      logger(`Server error (${a.status}), retrying check-in after 5 minutes...`, 'error'); // [cite: 32] (English translation)
      await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000)); // [cite: 33] Wait 5 minutes
      await dailyCheckIn(cookie, agent, nonce); // [cite: 33] Retry
    } else {
         logger(`Daily check-in failed with status: ${a.status}`, 'error');
         // Optionally log response body for debugging if needed
         // const responseBody = await a.text();
         // logger(`Response body: ${responseBody}`, 'debug');
    }

  } catch (error) {
    logger(`Error during daily check-in: ${error.message}`, 'error'); // [cite: 33] (English translation)
  }
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log("TOOL DEVELOPED BY: THIEN THO TRAN"); // [cite: 34] (English translation)
  console.log( // [cite: 34]
    "Join the Facebook group for new tools: https://www.facebook.com/groups/2072702003172443/" // (English translation)
  );
  console.log("------------------------------------------------------------"); // [cite: 35]
  const doTask = await rl.question('Do you want to perform tasks, or just daily check-in? (y/n): '); // [cite: 35] (English translation)

  while (true) { // [cite: 36]
    const { proxies, cookies } = await readFiles(); // [cite: 36]

     if (cookies.length === 0) {
      logger("No accounts found in cookies.txt. Please add accounts and restart.", "error");
      break; // Exit if no accounts
    }

    // Process accounts concurrently using Promise.all [cite: 37]
    await Promise.all(cookies.map(async (cookie, i) => { // [cite: 37]
      logger(`Processing account ${i + 1} of ${cookies.length}`); // [cite: 37] (English translation)
      let agent = null;
      // Use proxy only if available for the current account index
      if (proxies.length > i && proxies[i]) { // [cite: 37]
          try {
              agent = new HttpsProxyAgent(proxies[i]); // [cite: 37]
              logger(`Checking proxy: ${proxies[i]}`); // [cite: 37] (English translation)
              const checkProxy = await checkProxySpeed(agent); // [cite: 37]
               if(checkProxy.status === 'success') {
                 logger(`Proxy: ${proxies[i]} - Speed: ${checkProxy.time}ms - Status: ${checkProxy.statusCode}`, 'info'); // [cite: 37]
              } else {
                 logger(`Proxy ${proxies[i]} failed check: ${checkProxy.error}. Proceeding without proxy.`, 'warn');
                 agent = null; // Reset agent if proxy fails
              }
          } catch (e) {
               logger(`Error creating proxy agent for ${proxies[i]}: ${e.message}. Proceeding without proxy.`, 'error');
               agent = null; // Reset agent if proxy creation fails
          }
      } else {
          logger("No proxy configured for this account or proxy list shorter than cookie list. Proceeding without proxy.", "info");
      }

      // Get Nonce first - critical for other actions
      const nonce = await getNonce(cookie, agent); // [cite: 38]

      if (doTask.toLowerCase() === 'y') { // [cite: 38]
        await clickQuest(cookie, agent, nonce); // [cite: 38] Pass nonce
        logger("Waiting a bit before claiming...", 'warn'); // [cite: 38] (English translation)
        await new Promise(resolve => setTimeout(resolve, 10 * 1000)); // [cite: 38] 10 seconds delay
        // Claim quest does not seem to need nonce based on beam.txt provided
        await completeQuest(cookie, agent); // [cite: 38]
      }

      await dailyCheckIn(cookie, agent, nonce); // [cite: 38] Pass nonce
      logger(`Account ${i + 1} finished.`, 'info');

    })); // End of Promise.all

    logger("All accounts processed for this cycle. Waiting 6 hours for the next run.", 'warn'); // [cite: 38] (English translation, updated time)


    await new Promise(resolve => setTimeout(resolve, 6 * 60 * 60 * 1000)); // [cite: 39] Wait 6 hours
  }
  rl.close(); // Close the readline interface when the loop breaks (won't be reached in infinite loop unless error occurs)
}

main().catch(error => {
    logger(`An unexpected error occurred in main loop: ${error.message}`, 'error');
    // Consider adding process.exit(1) here if the error is fatal
});
