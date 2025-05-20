import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/auth.services";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await authService.forgotPassword({ email });
      setIsSuccess(true);
      setMessage(response.msg || "Reset link sent! Please check your email.");
    } catch (error) {
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        
        {message && (
          <p className={`text-sm text-center ${isSuccess ? "text-green-400" : "text-red-500"}`}>
            {message}
          </p>
        )}
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none"
                placeholder="Enter your account email"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-2 rounded text-white font-semibold disabled:bg-purple-800 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-green-400">
              Please check your email for password reset instructions.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="text-purple-400 hover:underline"
            >
              Return to Login
            </button>
          </div>
        )}
        
        <div className="flex justify-between text-sm pt-4">
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </span>
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;