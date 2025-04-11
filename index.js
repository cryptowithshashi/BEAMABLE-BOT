import fs from "fs/promises";
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";
import chalk from "chalk";
import readline from 'readline/promises';
import { banner, welcomeBox, followBox } from './banner.js'; // Import banner and boxes

// Display Follow Box first
console.log(followBox);

// Display Welcome Box
console.log(welcomeBox);

// Display Banner
console.log(banner);


// Helper Function: Logger
function logger(message, level = "info") {
  const now = new Date().toISOString();
  const colors = {
    info: chalk.blue,
    warn: chalk.yellow,
    error: chalk.red,
    success: chalk.green,
    debug: chalk.magenta,
  };
  const color = colors[level] || chalk.white;
  console.log(color(`[${now}] [${level.toUpperCase()}]: ${message}`));
}

const headers = {
  "accept":"text/x-component",
  "accept-language":"en-US,en;q=0.9,vi;q=0.8", // Changed accept-language preference
  "cache-control":"no-cache",
  "content-type":"text/plain;charset=UTF-8",
  "next-router-state-tree":"%5B%22%22%2C%7B%22children%22%3A%5B%22modules%22%2C%7B%22children%22%3A%5B%5B%22moduleIdOrPath%22%2C%22questsold%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%5B%22moduleNestedId1%22%2C%227129%22%2C%22d%22%5D%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%5D%7D%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D",
  "origin":"https://hub.beamable.network",
  "pragma":"no-cache",
  "priority":"u=1, i",
  "referer":"https://hub.beamable.network/modules/questsold/7129",
  "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36", // User agent might need updates
};

async function readFiles() {
  const proxyStr = await fs.readFile("proxies.txt", "utf-8");
  const proxies = proxyStr.trim().split("\n").map(proxy => proxy.trim()).filter(p => p); // Filter empty lines
  const cookieData = await fs.readFile("cookies.txt", "utf-8");
  // Read cookies, remove comment line if present
  const cookies = cookieData.trim().split("\n").map(cookie => cookie.trim()).filter(c => c && !c.startsWith('[source: 1]'));
  return { proxies, cookies };
}

async function clickQuest(cookie, agent) {
  async function quest7129() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/7129'
      headers["next-action"] ="eef77ac1785cc4d8ca64fb769a7cc5e0bc594592",
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":7129,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment - GDC Schedule","progress":1,"affirmType":{"questId":7129,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":7129,"link":"https://x.com/BeamableNetwork/status/1901989668947960223"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like and Comment - GDC Schedule")
    } catch (error) {
      logger(`Error quest Retweet, Like and Comment - GDC Schedule: ${error.message}`, 'error')
    }
  }

  async function quest7117() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/7117'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":7117,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment - GDC is Here^!","progress":1,"affirmType":{"questId":7117,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":7117,"link":"https://x.com/Beamable/status/1901677776819917239"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like and Comment - GDC is Here!")
    } catch (error) {
      logger(`Error quest Retweet, Like and Comment - GDC is Here!: ${error.message}`, 'error')
    }
  }

  async function quest7081() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/7081'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":7081,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - Founder Introduction","progress":1,"affirmType":{"questId":7081,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":7081,"link":"https://x.com/jradoff/status/1900616630041817119"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like & Comment - Founder Introduction")

    } catch (error) {
      logger(`Error quest: Retweet, Like & Comment - Founder Introduction: ${error.message}`, 'error')

    }
  }

  async function quest7075() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/7075'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":7075,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment - Evolution of Creator Economies","progress":1,"affirmType":{"questId":7075,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":7075,"link":"https://x.com/Beamablenetwork/status/1900532368693416167"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like and Comment - Evolution of Creator Economies")

    } catch (error) {
      logger(`Error quest Retweet, Like and Comment - Evolution of Creator Economies: ${error.message}`, 'error')

    }
  }

  async function quest7069() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/7069'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":7069,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - First peek at Ninja Frog Gameplay","progress":1,"affirmType":{"questId":7069,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":7069,"link":"https://x.com/PlayPudgyParty/status/1900215815191859469"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like & Comment - First peek at Ninja Frog Gameplay")

    } catch (error) {
      logger(`Error quest Retweet, Like & Comment - First peek at Ninja Frog Gameplay: ${error.message}`, 'error')

    }
  }

  async function quest6975() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6975'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6975,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment - See you soon WolvesDEN","progress":1,"affirmType":{"questId":6975,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6975,"link":"https://x.com/Beamablenetwork/status/1900328521840443409"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like and Comment - See you soon WolvesDEN")

    } catch (error) {
      logger(`Error quest Retweet, Like and Comment - See you soon WolvesDEN: ${error.message}`, 'error')

    }
  }

  async function quest6973() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6973'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6973,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - Beamable and WolvesDAO at GDC","progress":1,"affirmType":{"questId":6973,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6973,"link":"https://x.com/Beamable/status/1900284795763974309"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like & Comment - Beamable and WolvesDAO at GDC")

    } catch (error) {
      logger(`Error quest Retweet, Like & Comment - Beamable and WolvesDAO at GDC: ${error.message}`, 'error')

    }
  }

  async function quest6956() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6956'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6956,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - Is This A Good Offer?","progress":1,"affirmType":{"questId":6956,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6956,"link":"https://x.com/Beamablenetwork/status/1899928563752853638"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like & Comment - Is This A Good Offer?") // Corrected log message

    } catch (error) {
      logger(`Error quest Retweet, Like & Comment - Is This A Good Offer?: ${error.message}`, 'error') // Corrected log message

    }
  }

  async function quest6969() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6969'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6969,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - Beamable Hub","progress":1,"affirmType":{"questId":6969,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6969,"link":"https://x.com/Beamable/status/1900230776051908677"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like & Comment - Beamable Hub") // Corrected log message

    } catch (error) {
      logger(`Error quest Retweet, Like & Comment - Beamable Hub: ${error.message}`, 'error') // Corrected log message

    }
  }

  async function quest6955() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6955'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6955,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - Web3 Game Development Livestream","progress":1,"affirmType":{"questId":6955,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6955,"link":"https://x.com/jradoff/status/1899807546766213581"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like & Comment - Web3 Game Development Livestream")

    } catch (error) {
      logger(`Error quest Retweet, Like & Comment - Web3 Game Development Livestream: ${error.message}`, 'error')

    }
  }

  async function quest6948() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6948'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6948,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment on our sponsorship post from WolvesDAO^!","progress":1,"affirmType":{"questId":6948,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6948,"link":"https://x.com/WolvesDAO/status/1899844715610353923"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like and Comment on our sponsorship post from WolvesDAO!")

    } catch (error) {
      logger(`Error quest Retweet, Like and Comment on our sponsorship post from WolvesDAO: ${error.message}`, 'error')

    }
  }

  async function quest6933() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6933'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6933,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment our latest tweet on Beamable Network","progress":1,"affirmType":{"questId":6933,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6933,"link":"https://x.com/Beamablenetwork/status/1899591317627494836"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like and Comment our latest tweet on Beamable Network")

    } catch (error) {
      logger(`Error quest Retweet, Like and Comment our latest tweet on Beamable Network: ${error.message}`, 'error')

    }
  }

  async function quest6904() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6904'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6904,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment on our First Tweet on Beamable Network","progress":2,"affirmType":{"questId":6904,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6904,"link":"https://x.com/Beamablenetwork/status/1899226126352093354"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like and Comment on our First Tweet on Beamable Network")

    } catch (error) {
      logger(`Error quest Retweet, Like and Comment on our First Tweet on Beamable Network: ${error.message}`, 'error')

    }
  }

  async function quest6866() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6866'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6866,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment on our GDC Founders & Investors Brunch Tweet","progress":1,"affirmType":{"questId":6866,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6866,"link":"https://x.com/Beamable/status/1899175498913128509"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like and Comment on our GDC Founders & Investors Brunch Tweet")

    } catch (error) {
      logger(`Error quest Retweet, Like and Comment on our GDC Founders & Investors Brunch Tweet: ${error.message}`, 'error')

    }
  }

  async function quest6840() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6840'
      headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
      headers.Cookie = cookie
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6840,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":false,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment on our Dashboard Tweet","progress":1,"affirmType":{"questId":6840,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6840,"link":"https://x.com/Beamable/status/1897692463931740500"},"showDescription":false,"claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},1614,"questsold",true,false]`
      })
      logger("Clicked quest: Retweet, Like & Comment on our Dashboard Tweet")

    } catch (error) {
      logger(`Error quest Retweet, Like & Comment on our Dashboard Tweet: ${error.message}`, 'error')

    }
  }

  async function questInFuture() {
    try {
      // This URL might contain future quests added by the developer
      const response = await fetch(`https://gist.githubusercontent.com/hthodev/d34feb751b2314dd8abdfa4f1b2b60a4/raw/beamable_quest.txt`, {
        method: "GET",
      });
      logger("Checking if any new quests were added?")

      const res = await response.text();
      if (!res || res === 'none') {
        logger("No new quests added")

        return;
      }

      const quests = res.trim().split('\n').map(quest => quest.trim());
      for (const quest of quests) {
        const questId = quest.split('||')[0];
        const body = quest.split('||')[1];
        const url = `https://hub.beamable.network/modules/questsold/${questId}`
        headers["next-action"] = "eef77ac1785cc4d8ca64fb769a7cc5e0bc594592"
        headers.Cookie = cookie
        await fetch(url, {
          method: 'POST',
          headers,
          agent,
          body
        })
      }
      logger("Clicked newly added quests")

    } catch (error) {
      logger(`Error fetching future quests: ${error.message}`, 'error')

    }
  }

  await quest7129()
  await quest7117()
  await quest7081()
  await quest7075()
  await quest7069()
  await quest6975()
  await quest6973()
  await quest6956()
  await quest6969()
  await quest6955()
  await quest6948()
  await quest6933()
  await quest6904()
  await quest6866()
  await quest6840()
  await questInFuture() // Attempt to click any potentially new quests
}

async function completeQuest(cookie, agent) {
  async function quest7129() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/7129'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":7129,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment - GDC Schedule","progress":2,"affirmType":{"questId":7129,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":7129,"link":"https://x.com/BeamableNetwork/status/1901989668947960223"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like and Comment - GDC Schedule", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like and Comment - GDC Schedule: ${error.message}`, 'error')

    }
  }

  async function quest7117() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/7117'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":7117,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment - GDC is Here^!","progress":2,"affirmType":{"questId":7117,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":7117,"link":"https://x.com/Beamable/status/1901677776819917239"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like and Comment - GDC is Here!", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like and Comment - GDC is Here: ${error.message}`, 'error')

    }
  }

  async function quest7081() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/7081'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":7081,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - Founder Introduction","progress":2,"affirmType":{"questId":7081,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":7081,"link":"https://x.com/jradoff/status/1900616630041817119"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like & Comment - Founder Introduction", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like & Comment - Founder Introduction: ${error.message}`, 'error')

    }
  }

  async function quest7075() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/7075'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":7075,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment - Evolution of Creator Economies","progress":2,"affirmType":{"questId":7075,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":7075,"link":"https://x.com/Beamablenetwork/status/1900532368693416167"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like and Comment - Evolution of Creator Economies", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like and Comment - Evolution of Creator Economies: ${error.message}`, 'error')

    }
  }

  async function quest7069() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/7069'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":7069,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - First peek at Ninja Frog Gameplay","progress":2,"affirmType":{"questId":7069,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":7069,"link":"https://x.com/PlayPudgyParty/status/1900215815191859469"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like & Comment - First peek at Ninja Frog Gameplay", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like & Comment - First peek at Ninja Frog Gameplay: ${error.message}`, 'error')

    }
  }

  async function quest6975() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6975'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6975,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment - See you soon WolvesDEN","progress":2,"affirmType":{"questId":6975,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6975,"link":"https://x.com/Beamablenetwork/status/1900328521840443409"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like and Comment - See you soon WolvesDEN", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like and Comment - See you soon WolvesDEN: ${error.message}`, 'error')

    }
  }

  async function quest6973() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6973'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6973,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - Beamable and WolvesDAO at GDC","progress":2,"affirmType":{"questId":6973,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6973,"link":"https://x.com/Beamable/status/1900284795763974309"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like & Comment - Beamable and WolvesDAO at GDC", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like & Comment - Beamable and WolvesDAO at GDC: ${error.message}`, 'error')

    }
  }

  async function quest6956() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6956'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6956,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - Is This A Good Offer?","progress":2,"affirmType":{"questId":6956,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6956,"link":"https://x.com/Beamablenetwork/status/1899928563752853638"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like & Comment - Is This A Good Offer?", 'success') // Corrected log message

    } catch (error) {
      logger(`Error claiming quest Retweet, Like & Comment - Is This A Good Offer?: ${error.message}`, 'error') // Corrected log message

    }
  }

  async function quest6969() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6969'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6969,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - Beamable Hub","progress":2,"affirmType":{"questId":6969,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6969,"link":"https://x.com/Beamable/status/1900230776051908677"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like & Comment - Beamable Hub", 'success') // Corrected log message

    } catch (error) {
      logger(`Error claiming quest Retweet, Like & Comment - Beamable Hub: ${error.message}`, 'error') // Corrected log message

    }
  }

  async function quest6955() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6955'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6955,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment - Web3 Game Development Livestream","progress":2,"affirmType":{"questId":6955,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6955,"link":"https://x.com/jradoff/status/1899807546766213581"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like & Comment - Web3 Game Development Livestream", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like & Comment - Web3 Game Development Livestream: ${error.message}`, 'error')

    }
  }

  async function quest6948() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6948'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6948,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment on our sponsorship post from WolvesDAO^!","progress":2,"affirmType":{"questId":6948,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6948,"link":"https://x.com/WolvesDAO/status/1899844715610353923"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like and Comment on our sponsorship post from WolvesDAO!", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like and Comment on our sponsorship post from WolvesDAO: ${error.message}`, 'error')

    }
  }

  async function quest6933() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6933'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6933,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment our latest tweet on Beamable Network","progress":2,"affirmType":{"questId":6933,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6933,"link":"https://x.com/Beamablenetwork/status/1899591317627494836"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like and Comment our latest tweet on Beamable Network", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like and Comment our latest tweet on Beamable Network: ${error.message}`, 'error')

    }
  }

  async function quest6904() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6904'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6904,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment on our First Tweet on Beamable Network","progress":2,"affirmType":{"questId":6904,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6904,"link":"https://x.com/Beamablenetwork/status/1899226126352093354"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like and Comment on our First Tweet on Beamable Network", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like and Comment on our First Tweet on Beamable Network: ${error.message}`, 'error')

    }
  }

  async function quest6866() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6866'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6866,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like and Comment on our GDC Founders & Investors Brunch Tweet","progress":2,"affirmType":{"questId":6866,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6866,"link":"https://x.com/Beamable/status/1899175498913128509"},"showDescription":false,"description":"ex. 'This quest is for x and y'","claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like and Comment on our GDC Founders & Investors Brunch Tweet", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like and Comment on our GDC Founders & Investors Brunch Tweet: ${error.message}`, 'error')

    }
  }

  async function quest6840() {
    try {
      const url = 'https://hub.beamable.network/modules/questsold/6840'
      headers.Cookie = cookie
      headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
      await fetch(url, {
        method: 'POST',
        headers,
        agent,
        body: `[{"questId":6840,"rewards":[{"resource":{"resourceId":4543,"projectId":80,"name":"Points","imageUrl":"https://cdn.harbor.gg/project/80/eee511fd8300e15e2997d773e8fba93c4d495516b64b58b181c202d3a02eef3d.png","description":"","longDescription":"","createdAt":"^$D2024-12-12T03:31:24.000Z"},"amount":500}],"questCompleted":true,"rewardClaimed":false,"questType":"ClickLink","questTypeName":"ClickLink","questName":"Retweet, Like & Comment on our Dashboard Tweet","progress":2,"affirmType":{"questId":6840,"affirm":"NonAffirmative"},"requires":0,"additional":{"questId":6840,"link":"https://x.com/Beamable/status/1897692463931740500"},"showDescription":false,"claimBehaviour":"ClaimThroughDetailsPage","detailsBehaviour":"DetailsPage","needsDetailsPage":true},{"modulePath":"questsold"},false]`
      })
      logger("Claimed quest: Retweet, Like & Comment on our Dashboard Tweet", 'success')

    } catch (error) {
      logger(`Error claiming quest Retweet, Like & Comment on our Dashboard Tweet: ${error.message}`, 'error')

    }
  }

  async function questInFuture() {
    try {
      // This URL might contain future quests completion logic added by the developer
      const response = await fetch(`https://gist.githubusercontent.com/hthodev/ce040c0cb8cc5a3e0a01b47556237225/raw/beamable_complete_quest.txt`, {
        method: "GET",
      });
      const res = await response.text();
      if (!res || res === 'none') {
        return;
      }

      const quests = res.trim().split('\n').map(quest => quest.trim());
      for (const quest of quests) {
        const questId = quest.split('||')[0];
        const body = quest.split('||')[1];
        const url = `https://hub.beamable.network/modules/questsold/${questId}`
        headers["next-action"] = "bbbd8d0791d8eb36a310384fa0d2b41763f342ed"
        headers.Cookie = cookie
        await fetch(url, {
          method: 'POST',
          headers,
          agent,
          body
        })
      }
      logger("Claimed all newly added quests.")

    } catch (error) {
      logger(`Error claiming future quests: ${error.message}`, 'error')
    }
  }

  await quest7129()
  await quest7117()
  await quest7081()
  await quest7075()
  await quest7069()
  await quest6975()
  await quest6973()
  await quest6956()
  await quest6969()
  await quest6955()
  await quest6948()
  await quest6933()
  await quest6904()
  await quest6866()
  await quest6840()
  await questInFuture() // Attempt to claim any potentially new quests
}

async function checkProxySpeed(agent) {
  const startTime = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout
  const testUrl = "https://icanhazip.com/" // Simple IP check site
  try {
      const response = await fetch(testUrl, {
          agent,
          signal: controller.signal,
      });

      clearTimeout(timeout);
      const elapsedTime = Date.now() - startTime;
      return {
          status: 'success',
          time: elapsedTime,
          statusCode: response.status,
      };
  } catch (error) {
      clearTimeout(timeout); // Clear timeout in case of non-timeout error
      return {
          status: 'error',
          error: error.name === 'AbortError' ? 'Timeout' : error.message,
      };
  }
}

async function dailyCheckIn(cookie, agent) {
  try {
    const url = 'https://hub.beamable.network/modules/dailycheckin'
    headers.Cookie = cookie
    headers["next-action"] = "d93df389f759877e49b020b7ff454db350580fc7"
    await fetch(url, {
      method: 'POST',
      headers,
      agent,
      body: `[346,"dailycheckin"]`
    })
    logger("Daily check-in successful", 'success')

  } catch (error) {
    logger(`Error during daily check-in: ${error.message}`, 'error')

  }
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log("TOOL DEVELOPED BY: THIEN THO TRAN"); // English translation
  console.log(
    "Join the Facebook group for new tools: https://www.facebook.com/groups/2072702003172443/" // English translation
  );
  console.log("------------------------------------------------------------");
  const doTask = await rl.question('Do you want to perform tasks, or just daily check-in? (y/n): '); // English translation

  while (true) {
    const { proxies, cookies } = await readFiles();

    if (cookies.length === 0) {
      logger("No accounts found in cookies.txt. Please add accounts.", "error");
      break; // Exit if no accounts
    }

    for (let i = 0; i < cookies.length; i++) {
      logger(`Processing account ${i + 1} of ${cookies.length}`) // English translation
      const cookie = cookies[i]
      let agent = null;
      // Use proxy only if available for the current account index
      if (proxies.length > i && proxies[i]) {
          try {
              agent = new HttpsProxyAgent(proxies[i]);
              logger(`Checking proxy: ${proxies[i]}`);
              const checkProxy = await checkProxySpeed(agent);
              if(checkProxy.status === 'success') {
                 logger(`Proxy: ${proxies[i]} - Speed: ${checkProxy.time}ms - Status: ${checkProxy.statusCode}`, 'info');
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


      if (doTask.toLowerCase() === 'y') {
        await clickQuest(cookie, agent)
        logger("Waiting a bit before claiming...", 'warn') // English translation
        await new Promise(resolve => setTimeout(resolve, 10 * 1000)) // 10 seconds delay
        await completeQuest(cookie, agent)
      }

      await dailyCheckIn(cookie, agent)
      logger(`Account ${i + 1} finished. Moving to the next.`, 'info');
      // Optional short delay between accounts
       await new Promise(resolve => setTimeout(resolve, 2 * 1000)); // 2 seconds delay
    }
    logger("All accounts processed for this cycle. Waiting 24 hours for the next run.", 'warn') // English translation
    await new Promise(resolve => setTimeout(resolve, 24 * 60 * 60 * 1000)) // Wait 24 hours
  }
  rl.close(); // Close the readline interface when the loop breaks
}

main().catch(error => {
    logger(`An unexpected error occurred in main: ${error.message}`, 'error');
});
