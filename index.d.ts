import { EventEmitter } from "events";
import { AuthStrategy, Client } from "whatsapp-web.js";

/**
 * Options for configuring the StableWhatsappClient
 */
export interface StableClientOptions {
  /**
   * Authentication strategy for the WhatsApp client
   * @default LocalAuth()
   */
  authStrategy?: AuthStrategy;

  /**
   * Optional callback function to handle QR code generation
   * @param qr The QR code string
   */
  onQR?: (qr: string) => void;
}

/**
 * Stable WhatsApp Web version
 */
export const STABLE_WEB_VERSION: string;

/**
 * Stable WhatsApp Web JS library version
 */
export const STABLE_WWJS_VERSION: string;

/**
 * A stable wrapper for the WhatsApp Web JS Client
 */
export class StableWhatsappClient {
  /**
   * The underlying WhatsApp Web JS Client
   */
  client: Client;

  /**
   * Private event emitter for client events
   * @private
   */
  private eventEmitter: EventEmitter;

  /**
   * Constructor for StableWhatsappClient
   * @param options Configuration options for the client
   */
  constructor(options: StableClientOptions);

  /**
   * Register a callback to be executed when the client is ready
   * @param callback Function to call when the client is ready
   */
  onStableClientReady(callback: () => void): void;

  /**
   * Initialize the client and start authentication process
   */
  initialize(): Promise<void>;

  /**
   * Default QR code generation method
   * @private
   * @param qr QR code string
   */
  private defaultOnQR(qr: string): void;
}
