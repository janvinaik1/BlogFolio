import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.services";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await authService.login(formData);

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user || {}));

      const userId = res.user?.id;
      navigate(`/blog/home?authorId=${userId}`);
     
    } else {
      setError(res.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none" />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none" />
          <div className="text-right mt-1">
            <span 
              className="text-sm text-purple-400 cursor-pointer hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>
        </div>

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-2 rounded text-white font-semibold">
          Login
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;