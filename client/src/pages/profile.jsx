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
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-400 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-sm bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">User Profile</h2>
          <p className="text-gray-400 mt-1 text-sm">Your account information</p>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
            <p className="text-xs text-gray-400 mb-1">Name</p>
            <p className="font-semibold text-white">{user.name}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
            <p className="text-xs text-gray-400 mb-1">Email</p>
            <p className="font-semibold text-white">{user.email}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
            <p className="text-xs text-gray-400 mb-1.5">Aadhaar Number</p>

            <div className="flex items-center justify-between">
              <p className="font-semibold text-white tracking-wider">
                {showAadhaar
                  ? user.aadhaarNumber
                  : maskAadhaar(user.aadhaarNumber)}
              </p>

              <button
                onClick={() => setShowAadhaar((prev) => !prev)}
                className="text-gray-400 hover:text-indigo-400 transition duration-200 cursor-pointer p-1.5"
                aria-label={showAadhaar ? "Hide Aadhaar" : "Show Aadhaar"}
              >
                {showAadhaar ? (
                  <FaEyeSlash className="text-lg" />
                ) : (
                  <FaEye className="text-lg" />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            clearAuthToken();
            toast.success("User logged out");
            navigate("/login");
          }}
          className="mt-5 w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition duration-200 shadow-lg hover:shadow-xl text-sm"
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