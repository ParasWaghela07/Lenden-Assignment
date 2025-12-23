import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../api/auth.api";
import { setAuthToken } from "../utils/authToken";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    aadhaarNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Creating account...");
    try {
      const res = await signupApi(formData);

      setAuthToken(res.data.token);
      toast.dismiss(loadingToast);
      toast.success(res.data.message);

      navigate("/");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center mb-7">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="aadhaarNumber"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaarNumber"
              id="aadhaarNumber"
              placeholder="1234 5678 9012"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition duration-200 shadow-lg hover:shadow-xl mt-2 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
