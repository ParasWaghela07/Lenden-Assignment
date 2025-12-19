import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY = Buffer.from(process.env.AADHAAR_ENCRYPTION_KEY, "hex");

/**
 * Decrypt Aadhaar number
 * @param {string} encryptedText - iv:authTag:data
 * @returns {string} original aadhaar number
 */
export const decryptAadhaar = (encryptedText) => {
  if (!encryptedText) {
    throw new Error("Encrypted Aadhaar is required");
  }

  const [ivHex, authTagHex, encrypted] = encryptedText.split(":");

  if (!ivHex || !authTagHex || !encrypted) {
    throw new Error("Invalid encrypted Aadhaar format");
  }

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(ivHex, "hex")
  );

  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
