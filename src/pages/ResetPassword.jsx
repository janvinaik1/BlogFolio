import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import authService from "../services/auth.services";

const ResetPasswordPage = () => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setIsTokenValid(true);
      } catch (error) {
        setIsTokenValid(false);
        setMessage("This password reset link is invalid or has expired.");
      } finally {
        setTokenChecked(true);
      }
    };
    if (token) {
      verifyToken();
    } else {
      setIsTokenValid(false);
      setTokenChecked(true);
      setMessage("Reset token is missing.");
    }
  }, [token]);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = passwords;

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Fix: authService.resetPassword needs to send both token and newPassword
      const response = await authService.resetPassword(token, newPassword);
      setIsSuccess(true);
      setMessage("Password successfully reset!");

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setIsSuccess(false);
      setMessage("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!tokenChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <p className="text-center">Verifying reset token...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        {message && (
          <p
            className={`text-sm text-center ${
              isSuccess ? "text-green-400" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {isTokenValid && !isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none"
                placeholder="Confirm your new password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-2 rounded text-white font-semibold disabled:bg-purple-800 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        ) : isSuccess ? (
          <div className="text-center space-y-4">
            <p className="text-green-400">
              Your password has been reset successfully.
            </p>
            <p className="text-white">Redirecting to login page...</p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-red-500">
              {message || "This password reset link is invalid or has expired."}
            </p>
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-purple-400 hover:underline"
            >
              Request a new reset link
            </button>
          </div>
        )}

        <div className="text-center text-sm pt-4">
          <Link to="/login" className="text-purple-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
