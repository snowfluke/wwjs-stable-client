I had a lot of project depends on whatsapp.web-js so managing the version is challenging, and for that I create an npm package to use the same version across all my repo instance.


## Instalation

`npm install wwjs-stable-client`

## Usage

```ts
import { SClient, STABLE_WEB_VERSION, STABLE_WWJS_VERSION } from "wwjs-stable-client";

SClient.on("message", (msg) => {
  // Do something with the message
});

SClient.initialize();
```
