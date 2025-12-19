import User from "../models/user.model.js";
import { decryptAadhaar } from "../utils/aadharDecrypt.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const decryptedAadhaar = decryptAadhaar(user.aadhaarEncrypted);

    return res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        aadhaarNumber: decryptedAadhaar
      },
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
