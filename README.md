
# BEAMABLE AUTO SCRIPT BOT

A Node.js script designed to automate daily interactions with Beamable, specifically focusing on daily check-ins and optional quest completion for multiple accounts.

This script reads account cookies from cookie.txt and optionally uses proxies from proxy.txt to perform actions. It provides detailed logging to the console and runs in a continuous 24-hour cycle.

# Features

- Automated Daily Check-in: Performs the daily check-in action for each account.

- Optional Quest Automation: Can be configured to also click and complete the daily login quest.

- Multi-Account Support: Manages multiple accounts listed in cookie.txt.

- Proxy Support: Uses proxies listed in proxy.txt, cycling through them for different accounts. Includes basic proxy validation.

- Continuous Operation: Runs indefinitely, waiting approximately 24 hours between cycles.

# Pre Requisites

- Ensure Git, Node.js, and npm are installed. If not, install them using your VPS distribution's package manager.

```bash
    sudo apt update
```
```bash
    sudo apt install git nodejs npm -y
```
# INSTALLATION GUIDE

Clone Repository

```bash
   git clone https://github.com/cryptowithshashi/BEAMABLE-BOT.git
```

```bash
   cd BEAMABLE-BOT
```

Install Dependencies

```bash
   npm install
```


# Configuration

- `cookies.txt` - Contains the list of user cookies, one per line. Each cookie corresponds to one account.

```bash
   cookie_string_for_account_1
   cookie_string_for_account_2
```

- `proxies.txt` (Optional) - Contains a list of proxy URLs, one per line. The script will match each proxy with the corresponding cookie by line order.

```bash
   http://username:password@proxy1.example.com:8080
   http://username:password@proxy2.example.com:8080
```


## Execute the code

```bash
   node main.js
```

- Enter y if you want the bot to perform the full suite of tasks (quest clicking and claiming) before doing daily check-ins.
- Enter n if you want the bot to only perform the daily check-in action.


# Disclaimer

This script is intended for educational purposes only. Use it responsibly and ensure you have permission to access and automate interactions with the corresponding platform. The author is not responsible for any misuse.



ABOUT ME

Twitter -- https://x.com/SHASHI522004

Github -- https://github.com/cryptowithshashi
