import crypto from "crypto";
import 'dotenv/config';

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // recommended for GCM
const KEY = Buffer.from(process.env.AADHAAR_ENCRYPTION_KEY, "hex");

/**
 * Encrypt Aadhaar number
 * @param {string} aadhaar - 12 digit aadhaar number
 * @returns {string} encrypted value (iv:authTag:data)
 */
export const encryptAadhaar = (aadhaar) => {
  if (!aadhaar || !/^\d{12}$/.test(aadhaar)) {
    throw new Error("Invalid Aadhaar format");
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  let encrypted = cipher.update(aadhaar, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
};
