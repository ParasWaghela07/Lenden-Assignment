import { encryptAadhaar } from "../utils/aadharEncrypt.js";
import { decryptAadhaar } from "../utils/aadharDecrypt.js";

describe("Aadhaar Encryption / Decryption", () => {
  const aadhaar = "123412341234";

  test("encrypts aadhaar", () => {
    const encrypted = encryptAadhaar(aadhaar);
    expect(encrypted).not.toBe(aadhaar);
  });

  test("decrypts aadhaar correctly", () => {
    const encrypted = encryptAadhaar(aadhaar);
    const decrypted = decryptAadhaar(encrypted);
    expect(decrypted).toBe(aadhaar);
  });

  test("fails on tampered data", () => {
    const encrypted = encryptAadhaar(aadhaar);
    const tampered = encrypted.replace(/.$/, "x");
    expect(() => decryptAadhaar(tampered)).toThrow();
  });
});
