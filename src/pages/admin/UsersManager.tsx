import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Search, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

interface DbUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
}

const UsersManager = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users_list'],
    queryFn: async () => {
      const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as DbUser[];
    }
  });

  const updateRole = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const { error } = await supabase.from('users').update({ role }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users_list'] });
    }
  });

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      await updateRole.mutateAsync({ id, role: newRole });
      toast.success(`User role updated to ${newRole}`);
    } catch {
      toast.error('Failed to update user role. Are you sure you are an admin?');
    }
  };

  const filtered = users.filter(u => 
    u.email?.toLowerCase().includes(search.toLowerCase()) || 
    u.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p className="text-center py-10 text-muted-foreground">Loading users...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">User Roles</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">Manage admin access and website users</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-border bg-card rounded-md font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
      </div>

      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">User</th>
              <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Email</th>
              <th className="text-left p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Joined</th>
              <th className="text-right p-4 font-heading text-xs uppercase tracking-wider text-muted-foreground">Role</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-body text-sm font-semibold text-foreground">{user.full_name || 'No Name'}</span>
                  </div>
                </td>
                <td className="p-4 font-body text-sm text-muted-foreground">{user.email}</td>
                <td className="p-4 font-body text-sm text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={updateRole.isPending}
                    className={`px-3 py-1.5 border rounded-md font-body text-sm outline-none transition-colors ${
                      user.role === 'admin' 
                        ? 'bg-primary/10 border-primary/30 text-primary font-bold' 
                        : 'bg-background border-border text-foreground hover:border-primary/50'
                    }`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-muted-foreground font-body text-sm">No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManager;