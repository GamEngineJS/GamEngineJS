# install
## Node
Make sure you have npm and NodeJS installed.
To install this engine, follow the following steps:
```sh
npm i gamenginejs
```
After that, you will have two package files.json and package-lock.json and the engine itself.

NodeJS:
```js
let gamenginejs = require("gamenginejs");
```

If you want to update all global packages.
```sh
npm update -g
```

If you want to update specific global package.
```sh
npm update -g gamenginejs
```

Go to the github repository.
```sh
npm repo
```

## JavaScript
You can also connect the engine using a script in this way.
```html
<script src="https://cdn.jsdelivr.net/npm/gamenginejs@1.0.0/producrion.min.js"></script>
```
After that, the following message will appear in your logs:
```js
[GamEngineJS] connecting...
```

If the connection is successful, the following message will appear in the logs:
```js
[GamEngineJS] connected.
```

If the connection to the server is lost. then it will be output:
```js
[GamEngineJS] server connection lost. polling for restart...
```