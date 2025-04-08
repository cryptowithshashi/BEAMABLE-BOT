import chalk from 'chalk';

// ASCII Art Banner for the EVM Wallet Generator
export const banner = `
                         

 ██████╗            ██╗    ██╗        ███████╗              
██╔════╝            ██║    ██║        ██╔════╝
██║                 ██║ █╗ ██║        ███████╗
██║                 ██║███╗██║        ╚════██║
╚██████╗            ╚███╔███╔╝        ███████║
 ╚═════╝             ╚══╝╚══╝         ╚══════╝

 -___________________________________________________________________________-                                                           

 ✦    ${chalk.magentaBright('--- SOLANA-WALLET-GENERATOR ---')}    ✦     
 ➥  ${chalk.cyan('Telegram Channel:')} ${chalk.underline.blue('https://t.me/crypto_with_shashi')} 
 ➥  ${chalk.cyan('Twitter Handle:')} ${chalk.underline.blue('https://x.com/SHASHI522004')}
 ➥  ${chalk.cyan('Github:')} ${chalk.underline.blue('https://github.com/cryptowithshashi')}
`;

// --- Welcome Box ---
// Defines the formatted welcome message box.
const welcomeMessage = "WELCOME TO CRYPTO WITH SHASHI";
const boxWidth = welcomeMessage.length + 4; // Adjust width based on message length
const topBottomBorder = chalk.blue('+') + chalk.blue('-'.repeat(boxWidth)) + chalk.blue('+');
const middleLine = chalk.blue('|') + ' '.repeat(boxWidth) + chalk.blue('|');
const textLine = chalk.blue('|') + '  ' + chalk.yellowBright.bold(welcomeMessage) + '  ' + chalk.blue('|');

export const welcomeBox = `
${topBottomBorder}
${middleLine}
${textLine}
${middleLine}
${topBottomBorder}
`;
