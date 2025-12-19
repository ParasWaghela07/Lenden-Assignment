import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileApi } from "../api/auth.api";
import { clearAuthToken } from "../utils/authToken";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAadhaar, setShowAadhaar] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();
        setUser(res.data.data);
      } catch (err) {
        clearAuthToken();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          User Profile
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Aadhaar Number</p>

            <div className="flex items-center justify-between">
              <p className="font-medium tracking-wider">
                {showAadhaar
                  ? user.aadhaarNumber
                  : maskAadhaar(user.aadhaarNumber)}
              </p>

              <button
                onClick={() => setShowAadhaar((prev) => !prev)}
                className="text-gray-600 hover:text-gray-900 transition cursor-pointer"
                aria-label={showAadhaar ? "Hide Aadhaar" : "Show Aadhaar"}
              >
                {showAadhaar ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            clearAuthToken();
            toast.success("User logged out")
            navigate("/login");
          }}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Mask Aadhaar → XXXX-XXXX-1234
const maskAadhaar = (aadhaar) => {
  if (!aadhaar) return "";
  return aadhaar.replace(/\d(?=\d{4})/g, "X");
};

export default Profile;
