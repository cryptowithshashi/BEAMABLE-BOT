# Beamable Bot Script Guide

A Node.js script designed to automate daily interactions with Beamable, specifically focusing on daily check-ins and optional quest completion for multiple accounts.

This script reads account cookies from `cookie.txt` and optionally uses proxies from `proxy.txt` to perform actions. It provides detailed logging to the console and runs in a continuous 24-hour cycle.

## Features

* **Automated Daily Check-in:** Performs the daily check-in action for each account.
* **Optional Quest Automation:** Can be configured to also click and complete the daily login quest.
* **Multi-Account Support:** Manages multiple accounts listed in `cookie.txt`.
* **Proxy Support:** Uses proxies listed in `proxy.txt`, cycling through them for different accounts. Includes basic proxy validation.
* **Informative Logging:** Outputs status updates, successes, warnings, and errors to the console using `chalk` for readability.
* **Continuous Operation:** Runs indefinitely, waiting approximately 24 hours between cycles.
* **User-Friendly Setup:** Automatically creates `cookie.txt` and `proxy.txt` if they are missing on the first run.

## Prerequisites

Ensure you have the following installed on your system (e.g., local machine or VPS):

* **Git:** For cloning the repository.
* **Node.js:** Version 18.0.0 or higher is recommended (check with `node -v`).
* **npm:** Node Package Manager (usually installed with Node.js, check with `npm -v`).

Example installation commands for Debian/Ubuntu-based systems:
```bash
sudo apt update
sudo apt upgrade -y
sudo apt install git nodejs npm -y
Installation GuideClone Repository:Replace YOUR_USERNAME/YOUR_REPO_NAME with the actual path to your repository on GitHub.git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
Navigate to Directory:cd YOUR_REPO_NAME
(Replace YOUR_REPO_NAME with the actual directory name)Install Packages:This command reads the package.json file and installs the required dependencies (axios, chalk, https-proxy-agent, node-fetch).npm install
Usage InstructionsPrepare cookie.txt:Create a file named cookie.txt in the same directory as main.js.Each line in this file should contain the full cookie string for one Beamable account. Obtain this from your browser's developer tools (Network tab) after logging into the Beamable website.Example cookie.txt:beamable_session=xxxxxxxxxxxxx; other_cookie=yyyyyy; ...
beamable_session=aaaaaaaaaaaaa; other_cookie=bbbbbb; ...
Prepare proxy.txt (Optional):Create a file named proxy.txt in the same directory.Each line should contain one proxy URL in the format http://[user:pass@]host:port.Example proxy.txt:[http://username:password@proxy.example.com:8080](http://username:password@proxy.example.com:8080)
[http://192.168.1.100:3128](http://192.168.1.100:3128)
If this file is empty or missing, the script will run without proxies. If fewer proxies than cookies are provided, the script will cycle through the available proxies.Execute the Script:node main.js
ornpm start
The script will first display a banner and then ask if you want to perform tasks (click & complete quest) in addition to the daily check-in. Enter y or n.The script will then process each account, logging its actions.After processing all accounts, it will wait approximately 24 hours before starting the next cycle.To stop the script manually, press Ctrl+C.TroubleshootingScript Errors: Ensure cookie.txt is correctly formatted and contains valid, non-expired cookies. Incorrect cookies are the most common cause of failure.Proxy Errors: Verify proxy formats in proxy.txt. The script performs a basic check, but proxies might still be blocked or slow. Errors
