import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData, {withCredentials: true});

      console.log('Login success:', response.data);

      // Optional: Save token to localStorage if provided
      // localStorage.setItem('token', response.data.token);

      navigate('/home');
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMessage = 'Login failed. Please try again.';

      if (err.response) {
        if (err.response.status === 400 || err.response.status === 401) {
          errorMessage = err.response.data?.error || 'Invalid email or password.';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (err.request) {
        errorMessage = 'No response from server. Is it running?';
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pure-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-pure-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 bg-pure-black text-pure-white rounded-t-md focus:outline-none focus:ring-healthcare-blue focus:border-healthcare-blue focus:z-10 sm:text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 bg-pure-black text-pure-white rounded-b-md focus:outline-none focus:ring-healthcare-blue focus:border-healthcare-blue focus:z-10 sm:text-sm"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-healthcare-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}