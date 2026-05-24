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
      <div className="container mx-auto px-4 py-32 max-w-md min-h-[70vh] flex flex-col justify-center">
        <h1 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6 text-center text-foreground">Register</h1>
        {error && <p className="text-destructive mb-4 text-center text-sm">{error}</p>}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-border bg-background text-foreground px-4 py-3 rounded-md focus:outline-none focus:border-neon"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-border bg-background text-foreground px-4 py-3 rounded-md focus:outline-none focus:border-neon"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-border bg-background text-foreground px-4 py-3 rounded-md focus:outline-none focus:border-neon"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-border bg-background text-foreground px-4 py-3 rounded-md focus:outline-none focus:border-neon"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className="bg-primary text-primary-foreground py-3 rounded-md font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-center text-muted-foreground text-sm">Already have an account? <Link to="/login" className="text-neon hover:underline">Login here</Link></p>
      </div>
      <Footer />
    </div>
  );
};
export default Register;