# csgo-friendcode

Based on the [go version](https://github.com/emily33901/go-csfriendcode) that I wrote initially. This takes a steamid64 and turns it into a CSGO friend code or takes a friend code and turns it into a steamid64.

```js
const FriendCode = require("csgo-friendcode");

// Should be SUCVS-FADA
console.log(FriendCode.friend_code(76561197960287930n))
console.log(FriendCode.friend_code("76561197960287930"))

// should be 76561197960287930
console.log(FriendCode.steam_id("SUCVS-FADA"))
```