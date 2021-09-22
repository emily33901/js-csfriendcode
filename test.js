const FriendCode = require("./index.js");

// Should be SUCVS-FADA
console.log(FriendCode.encode(76561197960287930n))
console.log(FriendCode.encode("76561197960287930"))

// should be 76561197960287930
console.log(FriendCode.decode("SUCVS-FADA"))

console.log(FriendCode.encode_direct_challenge(22202n))
console.log(FriendCode.encode_direct_challenge(76561197960287930n))
console.log(FriendCode.encode_direct_challenge("76561197960287930"))

console.log(FriendCode.decode_direct_challenge(
    FriendCode.encode_direct_challenge(22202n)))

console.log(FriendCode.encode_direct_group_challenge(31642128n))
console.log(FriendCode.encode_direct_group_challenge(103582791461163536n))
console.log(FriendCode.encode_direct_group_challenge("103582791461163536"))

console.log(FriendCode.decode_direct_challenge(
    FriendCode.encode_direct_group_challenge(31642128n)))
