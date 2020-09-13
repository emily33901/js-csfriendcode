# csgo-friendcode

Based on the [go version](https://github.com/emily33901/go-csfriendcode) that I wrote initially. This takes a steamid64 and turns it into a CSGO friend code.

```js
const friend_code = require("csgo-friendcode");

// Should be SUCVS-FADA
console.log(friend_code(76561197960287930n))
console.log(friend_code("76561197960287930"))
```