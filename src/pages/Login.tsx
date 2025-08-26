import axios from "axios";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loader state

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    let formErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formErrors.email = "Please enter a valid email";
        isValid = false;
      }
    }

    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else {
      if (password.length < 8 || password.length > 16) {
        formErrors.password = "Password must be 8-16 characters long";
        isValid = false;
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/;
      if (!passwordRegex.test(password)) {
        formErrors.password =
          "Password must include uppercase, lowercase, number, and special character";
        isValid = false;
      }
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true); // ✅ Show loader

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      const url = import.meta.env.VITE_BACKEND_URL
      console.log("url", url);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (res?.data?.status?.toLowerCase() === "success") {
        localStorage.setItem("pochoToken", res?.data?.token);
        localStorage.setItem(
          "pochoUserDetails",
          JSON.stringify(res?.data?.userDetails)
        );

        // Wait for 1 second before redirect
        setTimeout(() => {
          setLoading(false);
          onLogin(); // Navigate to dashboard
        }, 1000);
      } else {
        alert(res?.data?.message);
        setLoading(false);
      }
    } catch (error: any) {
      console.log("error inside catch", error);

      alert(error?.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#262B50] px-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden relative z-10">
        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 relative bg-[#262B50] text-white items-center justify-center">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFD700] rounded-full opacity-20 blur-3xl -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD700] rounded-full opacity-20 blur-3xl translate-x-16 translate-y-16"></div>
          <img
            src={"public/bg2.jpg"}
            alt="Auth Illustration"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 relative z-10">
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="h-14 w-14 sm:h-16 sm:w-16 bg-[#262B50] rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-user text-white text-xl sm:text-2xl"></i>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#262B50] mt-4">
              Welcome
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Sign in to continue
            </p>
          </div>

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#262B50] text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password with Eye Icon */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#262B50] text-sm sm:text-base pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-0 relative z-20">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#262B50] focus:ring-[#262B50]"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:underline text-[#262B50]">
                Forgot password?
              </a>
            </div>

            {/* Submit Button with Loader */}
            <button
              type="submit"
              className="w-full bg-[#262B50] text-white font-semibold py-2 sm:py-3 rounded-lg hover:bg-[#1E2340] transition duration-300 text-sm sm:text-base flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
