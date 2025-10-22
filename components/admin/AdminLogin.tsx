import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (username.toLowerCase() === 'sudy master script' && password === '@DdSudy') {
        onLogin();
      } else {
        setError('Invalid username or password.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-orbitron text-4xl font-bold tracking-widest text-white uppercase">
            SUDY FILM STUDIO
          </h1>
          <p className="text-cyan-400 mt-2">Admin Panel</p>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-8">
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:bg-gray-600 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                    Authenticating...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
         <button
            onClick={() => window.location.hash = '#'}
            className="bg-transparent border-none p-0 inline-block mt-8 text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            &larr; Back to Main Site
          </button>
      </div>
    </div>
  );
};