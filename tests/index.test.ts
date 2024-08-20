import { test, expect } from "bun:test"
import FriendCode from "../src"

test("encode", () => {
    expect(FriendCode.encode(76561197960287930n)).toBe("SUCVS-FADA")
    expect(FriendCode.encode("76561197960287930")).toBe("SUCVS-FADA")
})
test("decode", () => {
    expect(FriendCode.decode("SUCVS-FADA")).toBe("76561197960287930")
})