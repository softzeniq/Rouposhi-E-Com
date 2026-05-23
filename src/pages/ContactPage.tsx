import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageContent } from '@/hooks/usePageContents';
import { useSettings } from '@/hooks/useDatabase';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useAddContactMessage } from '@/hooks/useContactMessages';

const ContactPage = () => {
  const { data: page, isLoading } = usePageContent('contact');
  const { data: settings } = useSettings();
  const s = Array.isArray(settings) ? settings[0] || {} : settings || {};

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const addMessage = useAddContactMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      await addMessage.mutateAsync({
        name: form.name,
        email: form.email,
        subject: form.subject || null,
        message: form.message
      });
      toast.success("Thank you! Your message has been sent successfully.");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error("Contact Form Error:", error);
      toast.error(error?.message || "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-12">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-foreground mb-6">
              {isLoading ? 'Loading...' : page?.page_title || 'Contact Us'}
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            {page?.content && (
              <div className="max-w-2xl mx-auto space-y-4">
                {page.content.split('\n').map((paragraph, i) => (
                  paragraph.trim() ? <p key={i} className="font-body text-muted-foreground leading-relaxed">{paragraph}</p> : null
                ))}
              </div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Contact Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
              <h3 className="font-heading text-2xl font-bold uppercase tracking-wider text-foreground mb-8">Get in Touch</h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {s?.contact_email && (
                  <a href={`mailto:${s.contact_email}`} className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-1 transition-all group shadow-sm">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <Mail className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground mb-2">Email</h4>
                    <p className="font-body text-sm text-muted-foreground break-all">{s.contact_email}</p>
                  </a>
                )}

                {s?.contact_phone && (
                  <a href={`tel:${s.contact_phone}`} className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-1 transition-all group shadow-sm">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <Phone className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground mb-2">Phone</h4>
                    <p className="font-body text-sm text-muted-foreground">{s.contact_phone}</p>
                  </a>
                )}

                {s?.whatsapp_number && (
                  <a href={`https://wa.me/${s.whatsapp_number.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                    className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-1 transition-all group shadow-sm">
                    <div className="w-14 h-14 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#25D366] transition-colors">
                      <MessageCircle className="w-6 h-6 text-[#25D366] group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground mb-2">WhatsApp</h4>
                    <p className="font-body text-sm text-muted-foreground">{s.whatsapp_number}</p>
                  </a>
                )}

                {s?.contact_address && (
                  <div className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:-translate-y-1 transition-all group shadow-sm">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <MapPin className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground mb-2">Address</h4>
                    <p className="font-body text-sm text-muted-foreground">{s.contact_address}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <div className="bg-secondary/30 border border-border p-6 rounded-2xl shadow-sm">
                <h3 className="font-heading text-2xl font-bold uppercase tracking-wider text-foreground mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Your Name *</label><input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" /></div>
                    <div><label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Email Address *</label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" /></div>
                  </div>
                  <div><label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Subject</label><input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm focus:outline-none focus:border-primary transition-colors" placeholder="How can we help?" /></div>
                  <div><label className="block font-body text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Message *</label><textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} className="w-full px-4 py-3 border border-border bg-background rounded-md font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Write your message here..."></textarea></div>
                  <button type="submit" disabled={sending} className="w-full bg-primary text-primary-foreground py-4 rounded-md font-body text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70">
                    {sending ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
