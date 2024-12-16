import { EventEmitter } from "events";
import qrcode from "qrcode-terminal";
import {
  AuthStrategy,
  Client,
  LocalAuth,
  NoAuth,
  RemoteAuth,
} from "whatsapp-web.js";

interface StableClientOptions {
  authStrategy?: AuthStrategy;
  onQR?: (qr: string) => void;
  syncTime?: number;
}

const STABLE_WWJS_VERSION = "1.26.0";
const STABLE_WEB_VERSION = "2.3000.1018890352-alpha";

class StableWhatsappClient {
  client: Client;
  private eventEmitter = new EventEmitter();
  private syncTime: number;

  constructor(options?: StableClientOptions) {
    this.syncTime = options?.syncTime || 2 * 60 * 1000;

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

      const yoctoSpinner: any = await this.importYoctoSpinner();
      const spinner = yoctoSpinner({
        text: "[LOG] SYNCING SESSION...",
      }).start();

      await this.sleep(this.syncTime);
      spinner.success("[LOG] SYNCED");

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

  private async importYoctoSpinner() {
    const yoctoSpinner = await import("yocto-spinner");
    return yoctoSpinner;
  }

  private sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export {
  LocalAuth,
  NoAuth,
  RemoteAuth,
  STABLE_WEB_VERSION,
  STABLE_WWJS_VERSION,
  StableWhatsappClient,
};
