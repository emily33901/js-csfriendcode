import { ByteSwap } from "./byteswap"

const alnum: string = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
interface ralNum {
    [key: string]: bigint
}
const ralnum: ralNum = {
    'A': 0n,
    'B': 1n,
    'C': 2n,
    'D': 3n,
    'E': 4n,
    'F': 5n,
    'G': 6n,
    'H': 7n,
    'J': 8n,
    'K': 9n,
    'L': 10n,
    'M': 11n,
    'N': 12n,
    'P': 13n,
    'Q': 14n,
    'R': 15n,
    'S': 16n,
    'T': 17n,
    'U': 18n,
    'V': 19n,
    'W': 20n,
    'X': 21n,
    'Y': 22n,
    'Z': 23n,
    '2': 24n,
    '3': 25n,
    '4': 26n,
    '5': 27n,
    '6': 28n,
    '7': 29n,
    '8': 30n,
    '9': 31n,
}

const default_steam_id: bigint = 0x110000100000000n
const default_group_id: bigint = 0x170000000000000n

let b32 = (input: bigint): string => {
    let res = ""
    // Make input into a big endian
    input = ByteSwap.from_big_endian(ByteSwap.to_little_endian(input))

    for (let i = 0; i < 13; i++) {
        if (i == 4 || i == 9) {
            res += "-"
        }
        res += alnum[((input & 0x1Fn) as unknown) as number]
        input >>= 5n
    }

    return res
}

let rb32 = (input: string): bigint => {
    let res = 0n

    for (let i = 0; i < 13; i++) {
        if (i == 4 || i == 9) {
            input = input.slice(1)
        }
        res |= ralnum[input[0]] << (5n * BigInt(i))
        input = input.slice(1)
    }

    return ByteSwap.from_big_endian(ByteSwap.to_little_endian(res))
}

let hash_steam_id = (id: bigint): bigint => {
    let account_id = id & 0xFFFFFFFFn
    let strange_steam_id = account_id | 0x4353474F00000000n

    let bytes = ByteSwap.to_little_endian(strange_steam_id)

    let hash = new Bun.CryptoHasher("md5").update(bytes).digest()
    let buf = hash.slice(0, 4)

    return ByteSwap.from_little_endian(buf)
}

let make_u64 = (hi: bigint, lo: bigint): bigint => {
    return hi << 32n | lo
}

/**
 * @hideconstructor
 */
export default class FriendCode {
    static encode(steamid: string | bigint): string {
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
        if (res.slice(0, 4) === "AAAA") {
            res = res.slice(5)
        }

        return res
    }

    static __decode(friend_code: string): bigint | null {
        if (friend_code.length != 10) return null;

        if (friend_code.slice(0, 5) != "AAAA-") {
            friend_code = "AAAA-" + friend_code
        }

        let val = rb32(friend_code)
        let id = 0n

        for (let i = 0; i < 8; i++) {
            val >>= 1n
            let id_nibble = val & 0xFn
            val >>= 4n

            id <<= 4n
            id |= id_nibble
        }

        return id
    }

    static decode(friend_code: string): string {
        let id = this.__decode(friend_code)

        if (id) {
            return (id | default_steam_id).toString()
        }
        return ""
    }

    static encode_direct_challenge(account_id: string | bigint): string {
        account_id = BigInt(account_id)
        let r = () => BigInt(Math.floor(Math.random() * 0x7fff)) << 16n
        let part1 = FriendCode.encode(r() | (account_id & 0x0000FFFFn))
        let part2 = FriendCode.encode(r() | ((account_id & 0xFFFF0000n) >> 16n))

        return `${part1}-${part2}`
    }

    static encode_direct_group_challenge(group_id: string | bigint): string {
        group_id = BigInt(group_id)
        let part1 = FriendCode.encode((0x10000n) | (group_id & 0x0000FFFFn))
        let part2 = FriendCode.encode((0x10000n) | ((group_id & 0xFFFF0000n) >> 16n))

        return `${part1}-${part2}`
    }

    static decode_direct_challenge(challenge_code: string): string {
        if (challenge_code.length != 21) return ""

        let part1 = FriendCode.__decode(challenge_code.substr(0, 10)) as bigint
        let part2 = FriendCode.__decode(challenge_code.substr(11)) as bigint

        let type = "u";
        let id = (part1 & 0x0000FFFFn) | ((part2 & 0x0000FFFFn) << 16n)

        if ((part1 & 0xFFFF0000n) == 0x10000n && (part2 & 0xFFFF0000n) == 0x10000n) {
            type = "g"
            id = id | default_group_id
        } else {
            id = id | default_steam_id
        }

        return `${part1},${part2},${type},${id}`
    }
}