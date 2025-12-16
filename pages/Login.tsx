import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'portal' && password === '123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-red/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-8 md:p-12 rounded-2xl w-full max-w-md relative z-10 shadow-2xl">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-primary mb-4 border border-white/10">
                    <i className="fa-solid fa-lock text-2xl"></i>
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-2">Admin Portal</h2>
                <p className="text-gray-500 text-sm">Enter your credentials to access the dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Username</label>
                    <div className="relative">
                        <i className="fa-solid fa-user absolute left-4 top-3.5 text-gray-500 text-xs"></i>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                            placeholder="Enter username"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Password</label>
                    <div className="relative">
                        <i className="fa-solid fa-key absolute left-4 top-3.5 text-gray-500 text-xs"></i>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                            placeholder="Enter password"
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-500 text-xs text-center bg-red-500/10 py-2 rounded border border-red-500/20">
                        {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-orange-600 text-black font-bold py-3 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg shadow-orange-900/20"
                >
                    Sign In
                </button>
            </form>

            <div className="mt-8 text-center">
                <button onClick={() => navigate('/')} className="text-gray-500 hover:text-white text-xs transition-colors">
                    <i className="fa-solid fa-arrow-left mr-1"></i> Back to Site
                </button>
            </div>
        </div>
    </div>
  );
};

export default Login;
