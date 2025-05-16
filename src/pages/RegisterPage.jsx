import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.services';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await authService.register(formData);

    if (result.token) {
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/login');
    } else {
      setError(result.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="w-full px-4 py-2 rounded bg-gray-700" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 rounded bg-gray-700" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full px-4 py-2 rounded bg-gray-700" />

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-semibold">Register</button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => navigate('/login')}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
