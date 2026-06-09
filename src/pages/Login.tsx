import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Login = () => {
  const [identifier, setIdentifier] = useState(''); // email or phone
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let authError;

    // Check if it's an email (contains @)
    const isEmail = identifier.includes('@');
    
    if (isEmail) {
      const { error } = await supabase.auth.signInWithPassword({ email: identifier, password });
      authError = error;
    } else {
      // Treat as phone number
      const { error } = await supabase.auth.signInWithPassword({ phone: identifier, password });
      authError = error;
    }
    
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      }
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20 lg:py-28 flex justify-center">
        <div className="bg-[#f8fafc] w-full max-w-[440px] p-8 md:p-10 rounded-xl border border-gray-200">
          
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-8 text-center text-[#111827]">LOGIN</h1>

          {error && <p className="text-destructive bg-destructive/10 p-3 rounded-md mb-4 text-center text-sm">{error}</p>}
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#111827]">Email / Phone Number</label>
              <input
                type="text"
                placeholder="Enter your email or phone number"
                className="border border-gray-300 bg-white text-[#111827] px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-sm font-semibold text-[#111827]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border border-gray-300 bg-white text-[#111827] px-4 py-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="bg-[#111827] text-white py-3.5 rounded-md font-bold uppercase tracking-wider hover:bg-[#1f2937] transition-colors mt-2 flex justify-center items-center gap-2"
            >
              {loading ? 'LOGGING IN...' : (
                <>
                  <LogIn size={18} /> LOGIN
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-5 mb-6">
            <Link to="/forgot-password" className="text-[#111827] font-semibold text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/register')}
              className="w-full bg-[#f3f4f6] text-[#111827] py-3.5 rounded-md font-bold uppercase tracking-wider flex justify-center items-center gap-2 hover:bg-[#e5e7eb] transition-colors"
            >
              <UserPlus size={18} /> CREATE NEW ACCOUNT
            </button>

            <button 
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-300 text-[#111827] py-3.5 rounded-md font-bold uppercase tracking-wider flex justify-center items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon /> CONTINUE WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Login;