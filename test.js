const FriendCode = require("./index.js");

// Should be SUCVS-FADA
console.log(FriendCode.friend_code(76561197960287930n))
console.log(FriendCode.friend_code("76561197960287930"))

// should be 76561197960287930
console.log(FriendCode.steam_id("SUCVS-FADA"))