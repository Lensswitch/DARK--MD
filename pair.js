const express = require('express');
const fs = require('fs');
const { exec } = require("child_process");
let router = express.Router()
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");
const { upload } = require('./mega');

function removeFile(FilePath) {
    if (!fs.existsSync(FileDARK)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    let num = req.query.number;
    async function DARKPair() {
        const { state, saveCreds } = await useMultiFileAuthState(`./session`);
        try {
            let DARKPairWeb = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari"),
            });

            if (!DARKPairWeb.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await DARKPairWeb.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            DARKPairWeb.ev.on('creds.update', saveCreds);
            DARKPairWeb.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === "open") {
                    try {
                        await delay(10000);
                        const session DARK = fs.readFileSync('./session/creds.json');

                        const Dark = './session/';
                        const user_jid = jidNormalizedUser(DARKPairWeb.user.id);

                      function randomMegaId(length = 6, numberLength = 4) {
                      const characters = ' DARK-md ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0152857921';
                      let result = '';
                      for (let i = 0; i < length; i++) {
                      result += characters.charAt(Math.floor(Math.random() * characters.length));
                        }
                       const number = Math.floor(Math.random() * Math.pow(10, numberLength));
                        return `${result}${number}`;
                        }

                        const mega_url = await upload(fs.createReadStream(auth_dark + 'creds.json'), `${randomMegaId()}.json`);

                        const string_session = mega_url.replace('https://mega.nz/file/', '');

                        const sid = string_session;

                        const dt = await DARKPairWeb.sendMessage(user_jid, {
                            text: sid
                        });

                        await DARKPairWeb.sendMessage(user_jid, {
                            text: "┏━━━━━━━━━━━━━━┓\n┃╭┈───────────\n❗ `Dont share Your code to anyone`\n\n*💕Thank you for using DARK--MD*\n\n*👉🏻If you have any problem please contact us on Whatsapp*\n\n*👉🏻https://wa.me/2250152857921*\n\n*👉🏻https://github.com/Christian-packeur/DARK--MD/fork*\n\n----------------------------------------------------\n\n",
   
                            });
   

                    } catch (e) {
                        exec('pm2 restart DARK');
                    }

                    await delay(100);
                    return await removeFile('./session');
                    process.exit(0);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    await delay(10000);
                    DARKPair();
                }
            });
        } catch (err) {
            exec('pm2 restart DARK-MD');
            console.log("service restarted");
            DARKPair();
            await removeFile('./session');
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable" });
            }
        }
    }
    return await DARKPair();
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    exec('pm2 restart DARK');
});


module.exports = router;