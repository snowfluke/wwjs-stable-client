import { EventEmitter } from "events";
import qrcode from "qrcode-terminal";
import {
  AuthStrategy,
  Client,
  LocalAuth,
  NoAuth,
  RemoteAuth,
  type Message,
  type MessageMedia,
} from "whatsapp-web.js";

interface StableClientOptions {
  authStrategy?: AuthStrategy;
  onQR?: (qr: string) => void;
}

const STABLE_WWJS_VERSION = "1.34.1";
const STABLE_WEB_VERSION = "2.3000.1027323699-alpha";

class StableWhatsappClient {
  client: Client;
  private eventEmitter = new EventEmitter();

  constructor(options?: StableClientOptions) {
    this.client = new Client({
      authStrategy: options?.authStrategy || new LocalAuth(),
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

    this.client.on("qr", options?.onQR || this.defaultOnQR);

    this.client.on("ready", async () => {
      console.log("[LOG] WHATSAPP BOT IS RUNNING");
      console.log(`[LOG] WWJS VERSION: ${STABLE_WWJS_VERSION}`);
      console.log(`[LOG] WEB CACHE VERSION: ${STABLE_WEB_VERSION}`);

      this.eventEmitter.emit("ready");
    });
  }

  onStableClientReady(callback: () => void) {
    this.eventEmitter.on("ready", callback);
  }

  async initialize() {
    this.client.initialize();
  }

  private defaultOnQR(qr: string) {
    qrcode.generate(qr, { small: true });
  }
}

export {
  LocalAuth,
  Message,
  MessageMedia,
  NoAuth,
  RemoteAuth,
  STABLE_WEB_VERSION,
  STABLE_WWJS_VERSION,
  StableWhatsappClient,
};
