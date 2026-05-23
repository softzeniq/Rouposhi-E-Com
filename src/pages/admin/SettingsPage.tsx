import { useSettings, useUpdateSettings } from '@/hooks/useDatabase';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { uploadProductImage } from '@/lib/image-upload';
import { Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SettingsPage = () => {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const s = Array.isArray(settings) ? settings[0] || {} : settings || {};
  const [form, setForm] = useState({
    site_name: '', site_description: '', meta_title: '', meta_description: '',
    whatsapp_number: '', instagram_handle: '', free_shipping_threshold: 30, currency: 'AED',
    language: 'en',
    logo_url: '', favicon_url: '', footer_description: '', footer_copyright: '', footer_tagline: '',
    contact_email: '', contact_phone: '', contact_address: '',
    facebook_url: '', twitter_url: '', youtube_url: '', instagram_url: '',
  });

  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUploading, setFaviconUploading] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);
  const faviconRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (settings) {
      setForm({
        site_name: s.site_name || '', site_description: s.site_description || '',
        meta_title: s.meta_title || '', meta_description: s.meta_description || '',
        whatsapp_number: s.whatsapp_number || '', instagram_handle: s.instagram_handle || '',
        free_shipping_threshold: Number(s.free_shipping_threshold) || 30, currency: s.currency || 'AED',
        language: s.language || 'en',
        logo_url: s.logo_url || '/logo.png', favicon_url: s.favicon_url || '/favicon.ico',
        footer_description: s.footer_description || '', footer_copyright: s.footer_copyright || '', footer_tagline: s.footer_tagline || '',
        contact_email: s.contact_email || '', contact_phone: s.contact_phone || '', contact_address: s.contact_address || '',
        facebook_url: s.facebook_url || '', twitter_url: s.twitter_url || '', youtube_url: s.youtube_url || '', instagram_url: s.instagram_url || '',
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let targetId = s?.id;
      if (!targetId) {
        const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();
        targetId = existing?.id;
      }
      
      if (!targetId) {
        const { error } = await supabase.from('site_settings').insert([{ ...form }]);
        if (error) throw error;
      } else {
        await updateSettings.mutateAsync({ id: targetId, ...form });
      }
      toast.success('Settings saved');
    } catch (err: any) { 
      console.error(err);
      toast.error(err?.message || 'Failed to save'); 
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    try {
      const url = await uploadProductImage(file, 'logo');
      setForm(f => ({ ...f, logo_url: url }));
      toast.success('Logo uploaded');
    } catch {
      toast.error('Logo upload failed');
    } finally {
      setLogoUploading(false);
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFaviconUploading(true);
    try {
      const url = await uploadProductImage(file, 'favicon');
      setForm(f => ({ ...f, favicon_url: url }));
      toast.success('Favicon uploaded');
    } catch {
      toast.error('Favicon upload failed');
    } finally {
      setFaviconUploading(false);
    }
  };

  if (isLoading) return <p className="text-center py-10 text-muted-foreground">Loading...</p>;

  const Field = ({ label, field, type = 'text', placeholder = '' }: { label: string; field: string; type?: string; placeholder?: string }) => (
    <div>
      <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</label>
      <input type={type} value={(form as any)[field]} onChange={e => setForm({ ...form, [field]: type === 'number' ? +e.target.value : e.target.value })} placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
    </div>
  );

  const TextArea = ({ label, field, rows = 2 }: { label: string; field: string; rows?: number }) => (
    <div>
      <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</label>
      <textarea value={(form as any)[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} rows={rows}
        className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary resize-none" />
    </div>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-card border border-border p-6 rounded-lg">
      <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-foreground">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Settings</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Store configuration, branding & SEO</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        <Section title="Store Identity">
          <Field label="Site Name" field="site_name" />
          <TextArea label="Site Description" field="site_description" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Logo URL</label>
              <div className="flex items-center gap-3">
                <input ref={logoRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                <button type="button" onClick={() => logoRef.current?.click()} disabled={logoUploading}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground hover:bg-secondary transition-colors disabled:opacity-50 shrink-0">
                  {logoUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {logoUploading ? 'Uploading...' : 'Upload'}
                </button>
                <input type="text" value={form.logo_url} onChange={e => setForm({ ...form, logo_url: e.target.value })} placeholder="/logo.png"
                  className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Favicon URL</label>
              <div className="flex items-center gap-3">
                <input ref={faviconRef} type="file" accept="image/*" onChange={handleFaviconUpload} className="hidden" />
                <button type="button" onClick={() => faviconRef.current?.click()} disabled={faviconUploading}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground hover:bg-secondary transition-colors disabled:opacity-50 shrink-0">
                  {faviconUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {faviconUploading ? 'Uploading...' : 'Upload'}
                </button>
                <input type="text" value={form.favicon_url} onChange={e => setForm({ ...form, favicon_url: e.target.value })} placeholder="/favicon.ico"
                  className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>
          </div>
          {form.logo_url && (
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-md">
                <img src={form.logo_url} alt="Logo preview" className="h-10 w-auto" />
              </div>
              <span className="font-body text-xs text-muted-foreground">Logo preview</span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Currency" field="currency" />
            <Field label="Free Shipping Min" field="free_shipping_threshold" type="number" />
          </div>
          <div>
            <label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1">Website Language</label>
            <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}
              className="w-full px-4 py-2.5 border border-border bg-background rounded-md font-body text-sm text-foreground focus:outline-none focus:border-primary">
              <option value="en">English</option>
            </select>
          </div>
        </Section>

        <Section title="SEO Settings">
          <Field label="Meta Title" field="meta_title" />
          <p className="font-body text-xs text-muted-foreground -mt-3">{form.meta_title.length}/60 characters</p>
          <TextArea label="Meta Description" field="meta_description" />
          <p className="font-body text-xs text-muted-foreground -mt-3">{form.meta_description.length}/160 characters</p>
        </Section>

        <Section title="Contact Information">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Contact Email" field="contact_email" placeholder="info@example.com" />
            <Field label="Contact Phone" field="contact_phone" placeholder="+971 1234 5678" />
          </div>
          <Field label="Address" field="contact_address" placeholder="Dubai, UAE" />
          <Field label="WhatsApp Number" field="whatsapp_number" placeholder="+97112345678" />
        </Section>

        <Section title="Social Media Links">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Instagram URL" field="instagram_url" placeholder="https://instagram.com/..." />
            <Field label="Facebook URL" field="facebook_url" placeholder="https://facebook.com/..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Twitter URL" field="twitter_url" placeholder="https://twitter.com/..." />
            <Field label="YouTube URL" field="youtube_url" placeholder="https://youtube.com/..." />
          </div>
          <Field label="Instagram Handle (legacy)" field="instagram_handle" />
        </Section>

        <Section title="Footer Settings">
          <TextArea label="Footer Description" field="footer_description" />
          <Field label="Copyright Text" field="footer_copyright" placeholder="© 2026 Store Name. All rights reserved." />
          <Field label="Footer Tagline" field="footer_tagline" placeholder="🇦🇪 Free delivery across Dubai" />
        </Section>

        <button type="submit" disabled={updateSettings.isPending}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-body text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-all disabled:opacity-50">
          {updateSettings.isPending ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
