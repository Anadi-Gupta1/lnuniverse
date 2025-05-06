import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/auth-context';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsSubmitting(false);
      return;
    }

    // Phone validation - should have at least 10 digits
    if (!/^\d{10,}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      setError('Please enter a valid phone number with at least 10 digits');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting registration form with data:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: '[REDACTED]'
      });
      
      await register(
        formData.name, 
        formData.email, 
        formData.password, 
        formData.phone, 
        formData.address
      );
      navigate('/home');
    } catch (err: any) {
      console.error('Registration error in component:', err);
      let errorMessage = 'Registration failed. Please check your network connection and try again.';
      
      // Check for specific error messages
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = err.response.data?.error || 'Invalid registration data. Please check your information.';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (err.response.status === 409) {
          errorMessage = 'Email already exists. Please use a different email or login.';
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check if the backend server is running.';
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
            Create your account
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
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 bg-pure-black text-pure-white rounded-t-md focus:outline-none focus:ring-healthcare-blue focus:border-healthcare-blue focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 bg-pure-black text-pure-white focus:outline-none focus:ring-healthcare-blue focus:border-healthcare-blue focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 bg-pure-black text-pure-white focus:outline-none focus:ring-healthcare-blue focus:border-healthcare-blue focus:z-10 sm:text-sm"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 bg-pure-black text-pure-white focus:outline-none focus:ring-healthcare-blue focus:border-healthcare-blue focus:z-10 sm:text-sm"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 bg-pure-black text-pure-white focus:outline-none focus:ring-healthcare-blue focus:border-healthcare-blue focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-800 placeholder-gray-500 bg-pure-black text-pure-white rounded-b-md focus:outline-none focus:ring-healthcare-blue focus:border-healthcare-blue focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
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
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-healthcare-blue hover:text-blue-400"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}