const FriendCode = require("./index.js");

// Should be SUCVS-FADA
console.log(FriendCode.encode(76561197960287930n))
console.log(FriendCode.encode("76561197960287930"))

// should be 76561197960287930
console.log(FriendCode.decode("SUCVS-FADA"))