import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Download, ExternalLink, Trash2, Eye, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function JobApplicationsManager() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      toast.error('Error fetching applications');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      setApplications(apps => apps.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
      toast.success('Status updated');
    } catch (error: any) {
      toast.error('Failed to update status');
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setApplications(apps => apps.filter(app => app.id !== id));
      toast.success('Application deleted');
    } catch (error: any) {
      toast.error('Failed to delete application');
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Applications</h1>
        <p className="text-muted-foreground mt-2">Manage and review candidates who applied through the Careers page.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Applicant</th>
                <th className="px-6 py-4 font-medium">Position</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                    No applications received yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{app.full_name}</div>
                      <div className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate" title={app.cover_letter}>
                        {app.cover_letter || 'No cover letter'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {app.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div>{app.email}</div>
                      <div>{app.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {format(new Date(app.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className="bg-background border border-border rounded px-2 py-1 text-xs outline-none focus:border-primary text-foreground"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {app.cv_url && (
                        <a 
                          href={app.cv_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex p-2 hover:bg-muted rounded-md text-primary transition-colors"
                          title="View CV"
                        >
                          <FileText className="w-4 h-4" />
                        </a>
                      )}
                      <button 
                        onClick={() => deleteApplication(app.id)}
                        className="inline-flex p-2 hover:bg-destructive/10 rounded-md text-destructive transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
