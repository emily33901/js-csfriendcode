# csgo-friendcode

Based on the [go version](https://github.com/emily33901/go-csfriendcode) that I wrote initially. This takes a steamid64 and turns it into a CSGO friend code or takes a friend code and turns it into a steamid64.

```js
const FriendCode = require("csgo-friendcode");

// Should be SUCVS-FADA
console.log(FriendCode.encode(76561197960287930n));
console.log(FriendCode.encode("76561197960287930"));

// should be 76561197960287930
console.log(FriendCode.decode("SUCVS-FADA"));

// Generate a drirect challenge
console.log(FriendCode.encode_direct_challenge(22202n));
console.log(FriendCode.encode_direct_challenge(76561197960287930n));
console.log(FriendCode.encode_direct_challenge("76561197960287930"));

// Decode a direct challenge
console.log(
  FriendCode.decode_direct_challenge(FriendCode.encode_direct_challenge(22202n))
);

// Generate a drirect group challenge
console.log(FriendCode.encode_direct_group_challenge(31642128n));
console.log(FriendCode.encode_direct_group_challenge(103582791461163536n));
console.log(FriendCode.encode_direct_group_challenge("103582791461163536"));

console.log(
  FriendCode.decode_direct_challenge(
    FriendCode.encode_direct_group_challenge(31642128n)
  )
);
```
