import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LogOut, User as UserIcon, Mail, CheckCircle, LayoutDashboard } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const Profile = () => {
  const { user, loading, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updating, setUpdating] = useState(false);
  const [role, setRole] = useState<string>('user');

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.full_name || '');
      setEmail(user.email || '');
      
      supabase.from('users').select('role').eq('id', user.id).single().then(({ data }) => {
        if (data) setRole(data.role);
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 py-32 text-center text-muted-foreground flex items-center justify-center">Loading...</div>
        <Footer />
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    
    const { error } = await supabase.auth.updateUser({
      email: email,
      data: { full_name: name }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    }
    setUpdating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-32 max-w-5xl min-h-[70vh]">
        <div className="mb-10">
          <h1 className="text-3xl font-heading font-bold uppercase tracking-wider text-foreground">My Dashboard</h1>
          <p className="font-body text-muted-foreground mt-2">Manage your account details and settings.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="md:col-span-1 bg-card border border-border p-6 md:p-8 rounded-xl shadow-sm h-fit text-center">
            <div className="w-24 h-24 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center text-4xl font-bold uppercase mb-4 border-2 border-primary/20">
              {name ? name.charAt(0) : (user.email ? user.email.charAt(0) : 'U')}
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground mb-1">{name || 'User'}</h2>
            <p className="font-body text-sm text-muted-foreground mb-8">{user.email}</p>
            
            {role === 'admin' && (
              <Link 
                to="/admin" 
                className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-4 py-3 rounded-md font-bold uppercase tracking-wider transition-colors duration-300 mb-3">
                <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
              </Link>
            )}
            <button 
              onClick={() => signOut()} 
              className="w-full flex items-center justify-center gap-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground px-4 py-3 rounded-md font-bold uppercase tracking-wider transition-colors duration-300">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
          
          {/* Edit Form */}
          <div className="md:col-span-2 bg-card border border-border p-6 md:p-8 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
              <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-foreground">Account Settings</h3>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="text-neon font-body text-sm font-semibold hover:underline">Edit Profile</button>
              )}
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2"><UserIcon className="w-3 h-3" /> Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} required className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm focus:outline-none focus:border-neon disabled:opacity-60 transition-colors" />
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2"><Mail className="w-3 h-3" /> Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} required className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm focus:outline-none focus:border-neon disabled:opacity-60 transition-colors" />
                {isEditing && <p className="text-xs text-muted-foreground mt-2">Note: Changing your email will send a confirmation link to both addresses.</p>}
              </div>
              
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <button type="submit" disabled={updating} className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70">{updating ? 'Saving...' : 'Save Changes'} <CheckCircle className="w-4 h-4" /></button>
                  <button type="button" onClick={() => setIsEditing(false)} className="border border-border text-foreground px-6 py-3 rounded-md font-bold uppercase tracking-wider hover:bg-muted transition-colors">Cancel</button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Profile;