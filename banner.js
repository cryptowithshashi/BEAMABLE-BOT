import chalk from 'chalk';

// ASCII Art Banner
export const banner = `
          

  ██████╗        ██╗   ██╗       ███████╗            
 ██╔════╝        ██║   ██║       ██╔════╝
 ██║             ██║ █╗ ██║      ███████╗
 ██║             ██║███╗██║      ╚════██║
 ╚██████╗        ╚███╔███╔╝      ███████║
  ╚═════╝         ╚══╝╚══╝       ╚══════╝


 -----------------------------------------------------------------------------

     ${chalk.magentaBright('--- BEAMABLE BOT ---')}    
   ➥ ${chalk.cyan('Telegram Channel:')} ${chalk.underline.blue('https://t.me/crypto_with_shashi')}
   ➥ ${chalk.cyan('Twitter Handle:')} ${chalk.underline.blue('https://x.com/SHASHI522004')}
   ➥ ${chalk.cyan('Github:')} ${chalk.underline.blue('https://github.com/cryptowithshashi')}
`;

// --- Welcome Box ---
// Defines the formatted welcome message box.
const welcomeMessage = "WELCOME TO CRYPTO WITH SHASHI";
const boxWidthWelcome = welcomeMessage.length + 4; // Adjust width based on message length
const topBottomBorderWelcome = chalk.blue('+') + chalk.blue('-'.repeat(boxWidthWelcome)) + chalk.blue('+');
const middleLineWelcome = chalk.blue('|') + ' '.repeat(boxWidthWelcome) + chalk.blue('|');
const textLineWelcome = chalk.blue('|') + '  ' + chalk.yellowBright.bold(welcomeMessage) + '  ' + chalk.blue('|');

export const welcomeBox = `
${topBottomBorderWelcome}
${middleLineWelcome}
${textLineWelcome}
${middleLineWelcome}
${topBottomBorderWelcome}
`;

// --- Follow Box ---
const followMessage = "FOR MORE UPDATES FOLLOW US ON TELEGRAM - CRYPTO WITH SHASHI";
const boxWidthFollow = followMessage.length + 4;
const topBottomBorderFollow = chalk.green('+') + chalk.green('-'.repeat(boxWidthFollow)) + chalk.green('+');
const middleLineFollow = chalk.green('|') + ' '.repeat(boxWidthFollow) + chalk.green('|');
const textLineFollow = chalk.green('|') + '  ' + chalk.whiteBright.bold(followMessage) + '  ' + chalk.green('|');

export const followBox = `
${topBottomBorderFollow}
${middleLineFollow}
${textLineFollow}
${middleLineFollow}
${topBottomBorderFollow}
`;
