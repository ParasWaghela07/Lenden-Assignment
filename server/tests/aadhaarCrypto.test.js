import { encryptAadhaar } from "../utils/aadharEncrypt.js";
import { decryptAadhaar } from "../utils/aadharDecrypt.js";

describe("Aadhaar Encryption & Decryption", () => {
  const validAadhaar = "123412341234";

  // 1️⃣ Encryption should not return plaintext
  test("encrypts aadhaar and does not return plaintext", () => {
    const encrypted = encryptAadhaar(validAadhaar);

    expect(encrypted).toBeDefined();
    expect(typeof encrypted).toBe("string");
    expect(encrypted).not.toBe(validAadhaar);
  });

  // 2️⃣ Encrypt → Decrypt should return original value
  test("decrypts encrypted aadhaar correctly", () => {
    const encrypted = encryptAadhaar(validAadhaar);
    const decrypted = decryptAadhaar(encrypted);

    expect(decrypted).toBe(validAadhaar);
  });

  // 3️⃣ Tampered encrypted data should fail decryption
  test("fails decryption when encrypted data is tampered", () => {
    const encrypted = encryptAadhaar(validAadhaar);

    // Tamper with last character
    const tampered = encrypted.slice(0, -1) + "x";

    expect(() => decryptAadhaar(tampered)).toThrow();
  });

  // 4️⃣ Invalid Aadhaar format should be rejected
  test("rejects invalid aadhaar format during encryption", () => {
    expect(() => encryptAadhaar("1234")).toThrow();
    expect(() => encryptAadhaar("abcd12341234")).toThrow();
    expect(() => encryptAadhaar("1234-1234-1234")).toThrow();
  });

  // 5️⃣ Decryption should fail for malformed encrypted input
  test("fails decryption for invalid encrypted format", () => {
    expect(() => decryptAadhaar("invalid-data")).toThrow();
    expect(() => decryptAadhaar(":::")).toThrow();
    expect(() => decryptAadhaar("")).toThrow();
  });
});
