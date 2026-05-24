import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-32 max-w-md min-h-[70vh] flex flex-col justify-center">
        <h1 className="text-3xl font-heading font-bold uppercase tracking-wider mb-6 text-center text-foreground">Login</h1>
        {error && <p className="text-destructive mb-4 text-center text-sm">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          <button type="submit" disabled={loading} className="bg-primary text-primary-foreground py-3 rounded-md font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-muted-foreground text-sm">Don't have an account? <Link to="/register" className="text-neon hover:underline">Register here</Link></p>
      </div>
      <Footer />
    </div>
  );
};
export default Login;