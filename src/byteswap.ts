const zero = 0n;
const one = 1n;
const n256 = 256n;

export class ByteSwap {
    static from_little_endian(bytes: Uint8Array): bigint {
        let result = zero;
        let base = one;
        bytes.forEach(function (byte: any) {
            result = result + (base * (BigInt(byte)));
            base = base * n256;
        });
        return result;
    }

    static from_big_endian(bytes: Uint8Array): bigint {
        return this.from_little_endian(bytes.reverse());
    }

    static to_little_endian(bigNumber: bigint): Uint8Array {
        let result = new Uint8Array(8);
        let i = 0;
        while (bigNumber > zero) {
            result[i] = Number(bigNumber % n256);
            bigNumber = bigNumber / n256;
            i += 1;
        }
        return result;
    }

    static to_big_endian(bytes: bigint): Uint8Array {
        return this.to_little_endian(bytes).reverse();
    }
}