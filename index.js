"use strict";

const md5 = require("md5");
const ByteSwap = require("./byte-swap");

const alnum = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

let b32 = (input) => {
    let res = ""
    // Make input into a big endian
    input = ByteSwap.from_big_endian(ByteSwap.to_little_endian(input))

    for (let i = 0; i < 13; i++) {
        if (i == 4 || i == 9) {
            res += "-"
        }
        res += alnum[input & 0x1Fn]
        input >>= 5n
    }

    return res
}

let hash_steam_id = (id) => {
    let account_id = id & 0xFFFFFFFFn
    let strange_steam_id = account_id | 0x4353474F00000000n

    let bytes = ByteSwap.to_little_endian(strange_steam_id)
    let hash = md5(bytes)
    let buf = Buffer.from(hash, "hex").slice(0, 4)

    return ByteSwap.from_little_endian(buf)
}

let make_u64 = (hi, lo) => {
    return hi << 32n | lo
}

module.exports = (steamid) => {
    steamid = BigInt(steamid)

    let h = hash_steam_id(steamid)

    let r = 0n
    for (let i = 0; i < 8; i++) {
        let id_nibble = steamid & 0xFn
        steamid >>= 4n

        let hash_nibble = (h >> BigInt(i)) & 1n

        let a = r << 4n | id_nibble

        r = make_u64(r >> 28n, a)
        r = make_u64(r >> 31n, a << 1n | hash_nibble)
    }
    let res = b32(r)

    // Check if it begins with AAAA- and remove if it does

    if (res.slice(0, 4) === "AAAA") {
        res = res.slice(5)
    }

    return res
}