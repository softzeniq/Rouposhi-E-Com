import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { full_name: name }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      if (data.session) {
        toast.success("Registration successful!");
        navigate('/'); 
      } else {
        toast.info("Registration successful! Please check your email to verify your account.");
        setLoading(false);
        navigate('/login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20 lg:py-28 flex justify-center">
        <div className="bg-[#f8fafc] w-full max-w-[440px] p-8 md:p-10 rounded-xl border border-gray-200">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-8 text-center text-[#111827]">REGISTER</h1>
          
          {error && <p className="text-destructive bg-destructive/10 p-3 rounded-md mb-4 text-center text-sm">{error}</p>}
          
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 bg-white text-[#111827] px-4 py-3.5 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 bg-white text-[#111827] px-4 py-3.5 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 bg-white text-[#111827] px-4 py-3.5 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-300 bg-white text-[#111827] px-4 py-3.5 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-[#111827] text-white py-4 rounded-md font-bold uppercase tracking-wider hover:bg-[#1f2937] transition-colors mt-2"
            >
              {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-500 text-sm">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Register;