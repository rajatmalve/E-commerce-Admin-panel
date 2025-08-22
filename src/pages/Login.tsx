import React, { useState } from "react";

interface AuthProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const AuthPage: React.FC<AuthProps> = ({ onLogin, onSignUp }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      alert("Please enter a valid email or 10-digit phone number");
      return;
    }

    if (!isLogin && name.trim() === "") {
      alert("Please enter your full name");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (isLogin) {
      console.log("Login attempt:", { emailOrPhone, password });
      onLogin();
    } else {
      console.log("Sign Up attempt:", { name, emailOrPhone, password });
      onSignUp();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#262B50] px-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
        {/* Left Side - Image + Yellow Accent */}
        <div className="hidden md:flex md:w-1/2 relative bg-[#262B50] text-white items-center justify-center">
          {/* Yellow Shape */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFD700] rounded-full opacity-20 blur-3xl -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD700] rounded-full opacity-20 blur-3xl translate-x-16 translate-y-16"></div>

          {/* Image */}
          <img
            src="/bg2.jpg" 
            alt="Auth Illustration"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="h-14 w-14 sm:h-16 sm:w-16 bg-[#262B50] rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-user text-white text-xl sm:text-2xl"></i>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#262B50] mt-4">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              {isLogin ? "Sign in to continue" : "Sign up to start your journey"}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex mb-6 border border-gray-300 rounded-lg overflow-hidden text-sm sm:text-base">
            <button
              onClick={() => setIsLogin(true)}
              type="button"
              className={`flex-1 py-2 sm:py-3 font-semibold ${
                isLogin ? "bg-[#262B50] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              type="button"
              className={`flex-1 py-2 sm:py-3 font-semibold ${
                !isLogin ? "bg-[#262B50] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#262B50] text-sm sm:text-base"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="emailOrPhone"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Email or Phone
              </label>
              <input
                id="emailOrPhone"
                type="text"
                placeholder="Enter your email or phone number"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#262B50] text-sm sm:text-base"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#262B50] text-sm sm:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {isLogin && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-0">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#262B50] focus:ring-[#262B50]"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="hover:underline text-[#262B50]">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#262B50] text-white font-semibold py-2 sm:py-3 rounded-lg hover:bg-[#1E2340] transition duration-300 text-sm sm:text-base"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {isLogin && (
            <>
              <div className="mt-6 flex items-center text-gray-400">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 sm:px-3 text-xs sm:text-sm">OR</span>
                <hr className="flex-1 border-gray-300" />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 sm:py-3 rounded-lg hover:bg-gray-200 transition shadow text-sm sm:text-base">
                  <i className="fab fa-google text-red-500 mr-2"></i> Google
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 sm:py-3 rounded-lg hover:bg-gray-200 transition shadow text-sm sm:text-base">
                  <i className="fab fa-facebook text-blue-600 mr-2"></i> Facebook
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
