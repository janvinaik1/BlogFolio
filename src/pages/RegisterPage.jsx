import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.services";
import ButtonLoader from "../components/ButtonLoader";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await authService.register(formData);

    if (result.msg === "User Created") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full px-4 py-2 rounded bg-gray-700"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 rounded bg-gray-700"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-4 py-2 rounded bg-gray-700"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors py-2 rounded text-white font-semibold ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? <ButtonLoader /> : "Register"}
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
