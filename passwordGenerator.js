const Module = require('node:module');
const process = require('node:process');
const readline = require('node:readline');
const userArguments = process.argv.slice(2);

const iF = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let length = 8;
let useLowercase = false;
let useUppercase = false;
let useNumbers = false;

/**
 * takes in user arguments and sets the options for password generation
 * @param {string[]} userArguments - The command-line arguments provided by the user.
 */
function parseArguments(userArguments) {
    for (let i = 0; i < userArguments.length; i++) {
        if (userArguments[i].startsWith('--')) {
            switch (userArguments[i]) {
                case '--length':
                    length = parseInt(userArguments[i + 1]);
                    break;
                case '--lowercase':
                    useLowercase = true;
                    break;
                case '--uppercase':
                    useUppercase = true;
                    break;
                case '--numbers':
                    useNumbers = true;
                    break;
                case '--h':    
                case '--help':
                    helpMessage();
                    return;
                default:
                    console.log(`Unknown option: ${userArguments[i]}`);
                    helpMessage();
                    break;
            
                }
            }
        }    
}

/**
 * Displays a help message to the user, outlining the available options for password generation.
 */
function helpMessage() {
        console.log(`
Usage: passwordGenerator.js [options]

Options:
    --length <number>       Specify the desired length of the password.
    --lowercase             Include lowercase letters in the password.
    --uppercase             Include uppercase letters in the password.
    --numbers               Include numbers in the password.
    --help, -h              Display this help message.

Example:
    node passwordGenerator.js --length 12 --lowercase --uppercase --numbers
        `);
}

/**
 * Generates a random password based on the provided options.
 *
 * @param {number} length - The desired length of the password.
 * @param {boolean} useLowercase - Whether to include lowercase letters.
 * @param {boolean} useUppercase - Whether to include lowercase letters.
 * @param {boolean} useNumbers - Whether to include numbers.
 * @returns {string} The generated password.
 */
function generatePassword(length, useLowercase, useUppercase, useNumbers) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';

    let characterList = '';
    if (useLowercase) {
        characterList += lowercaseChars;
    }
    if (useUppercase) {
        characterList += uppercaseChars;
    }
    if (useNumbers) {
        characterList += numberChars;
    }

    let password = '';

    for (let i = 0; i < length; i++) {
        password += characterList.charAt(Math.floor(Math.random() * characterList.length));
    }

    return password;
}
  

module.exports = {
    generatePassword,
    parseArguments
};

if (require.main === module) {
    parseArguments(userArguments);
    const password = generatePassword(length, useLowercase, useUppercase, useNumbers);
    console.log(`Generated password: ${password}`);
    iF.close();
}
