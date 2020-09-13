"use strict";

const zero = 0n;
const one = 1n;
const n256 = 256n;

module.exports = class ByteSwap {
    static from_little_endian(bytes) {
        let result = zero;
        let base = one;
        bytes.forEach(function (byte) {
            result = result + (base * (BigInt(byte)));
            base = base * n256;
        });
        return result;
    }

    static from_big_endian(bytes) {
        return this.from_little_endian(bytes.reverse());
    }

    static to_little_endian(bigNumber) {
        let result = new Uint8Array(8);
        let i = 0;
        while (bigNumber > zero) {
            result[i] = Number(bigNumber % n256);
            bigNumber = bigNumber / n256;
            i += 1;
        }
        return result;
    }

    static to_big_endian(bytes) {
        return this.to_little_endian(bytes).reverse();
    }
}