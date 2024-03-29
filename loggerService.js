// Importing the pino and dotenv modules.
const pino = require('pino');
const dotenv = require('dotenv');

dotenv.config();

const today = new Date();
const filenamelog = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}.log`;

// Exporting the pino module.
module.exports = pino({
    level: process.env.PINO_LOG_LEVEL || 'debug',
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                level: 'trace',
                options: {
                    colorize: true,
                    translateTime: 'SYS:dd-mm-yyyy HH:MM:ss'
                }
            },
            {
                target: 'pino/file',
                level: 'trace',
                options: {
                    // destination: './logs/main.log',
                    destination: `./logs/${filenamelog}`,
                    mkdir: true
                }
            }
        ]
    }
});
