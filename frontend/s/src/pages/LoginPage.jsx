import { NotebookIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    navigate('/');
    console.log('Login:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-800 via-[#212229] to-neutral-800 flex items-center justify-center p-4">
      

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            V<span className="text-green-500">!</span>notes
          </h1>
          
        </div>

        {/* Login Card */}
        <div className="bg-neutral-900 rounded-xl shadow-xl p-8 border border-black">
          <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2f3f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none  focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:ring-opacity-20 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2f3f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:ring-opacity-20 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg  cursor-pointer"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1e2330] text-gray-500">OR</span>
            </div>
          </div>

          

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#21ec9e] hover:text-green-600 font-semibold transition-colors">
              Sign up
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our{' '}
          <a href="#" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="text-gray-400 hover:text-[#00ff9d] transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;