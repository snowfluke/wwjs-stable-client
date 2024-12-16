# wwjs-stable-client

A stable and consistent wrapper for WhatsApp Web JS to manage versions across multiple projects.

## Motivation

Managing WhatsApp Web JS versions across multiple projects can be challenging. This package provides a consistent, stable client implementation to simplify version management and reduce configuration overhead.

## Installation

```bash
npm install wwjs-stable-client
```

## Usage

```typescript
import {
  StableWhatsappClient,
  STABLE_WEB_VERSION,
  STABLE_WWJS_VERSION,
} from "wwjs-stable-client";

// Create a client instance
const stableClient = new StableWhatsappClient({
  // Optional: custom QR code handler
  onQR: (qr) => {
    console.log("Scan this QR code to authenticate");
  },
});

// Listen for client ready event
stableClient.onStableClientReady(() => {
  console.log("WhatsApp client is ready!");

  // Access the underlying whatsapp-web.js client
  stableClient.client.on("message", (msg) => {
    console.log("Received message:", msg.body);
  });
});

// Initialize the client
stableClient.client.initialize();
```

## Configuration

The client uses sensible defaults:

- Local authentication strategy
- Cached web version
- Puppeteer configuration for compatibility

### Customizing Authentication

```typescript
import { StableWhatsappClient } from "wwjs-stable-client";
import { RemoteAuth } from "whatsapp-web.js";

// Use a custom authentication strategy
const stableClient = new StableWhatsappClient({
  authStrategy: new RemoteAuth(),
  onQR: (qr) => {
    // Custom QR handling
  },
});
```

## API

### Constructor Options

- `authStrategy`: Custom authentication strategy (defaults to `LocalAuth`)
- `onQR`: Optional callback for QR code handling

### Methods

- `onStableClientReady(callback)`: Register a callback for when the client is ready
- `client`: Access to the underlying whatsapp-web.js `Client` instance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
