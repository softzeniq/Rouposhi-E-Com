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
    let finalEmail = identifier;
    
    if (!isEmail) {
      // Trick: Convert phone to a dummy email
      finalEmail = `${identifier.replace(/[^0-9+]/g, '')}@phone.saudiecom.com`;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ 
      email: finalEmail, 
      password 
    });
    authError = signInError;
    
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
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 blur-[100px]" />
      </div>

      <Navbar />
      
      <div className="flex-grow w-full flex items-center justify-center px-4 pt-32 pb-16 lg:pt-36">
        <div className="bg-white/80 backdrop-blur-xl w-full max-w-[440px] p-8 md:p-10 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-80" />
          
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-gray-900 mb-2">LOGIN</h1>
            <p className="text-sm text-gray-500 font-medium">Welcome back to your account</p>
          </div>

          {error && <p className="text-destructive bg-destructive/10 p-3 rounded-md mb-4 text-center text-sm">{error}</p>}
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email / Phone Number</label>
              <input
                type="text"
                placeholder="Enter your email or phone number"
                className="border border-gray-200 bg-gray-50/50 text-gray-900 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border border-gray-200 bg-gray-50/50 text-gray-900 px-4 py-3.5 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 pr-12 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 mt-2 flex justify-center items-center gap-2"
            >
              {loading ? 'LOGGING IN...' : (
                <>
                  <LogIn size={18} /> LOGIN
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/register')}
              className="w-full bg-gray-50 text-gray-900 py-3.5 rounded-xl font-bold uppercase tracking-wider flex justify-center items-center gap-2 hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 border border-gray-200"
            >
              <UserPlus size={18} /> CREATE NEW ACCOUNT
            </button>

            <button 
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-200 text-gray-900 py-3.5 rounded-xl font-bold uppercase tracking-wider flex justify-center items-center gap-3 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
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