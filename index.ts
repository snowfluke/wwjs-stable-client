import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";

const STABLE_WWJS_VERSION = "1.25.0";
const STABLE_WEB_VERSION = "2.3000.1012972578-alpha";

const SClient = new Client({
  authStrategy: new LocalAuth(),
  webVersion: STABLE_WEB_VERSION,
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/{version}.html",
  },
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

SClient.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

SClient.on("ready", () => {
  console.log("WHATSAPP BOT IS RUNNING");
});

export { SClient, STABLE_WEB_VERSION, STABLE_WWJS_VERSION };
