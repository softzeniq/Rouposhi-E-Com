import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePageContent } from '@/hooks/usePageContents';
import { useSettings } from '@/hooks/useDatabase';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2 } from 'lucide-react';
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
      
      {/* Premium Dark Hero Banner */}
      <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-primary relative overflow-hidden">
        {/* Subtle background glow/pattern */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>
        
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest text-primary-foreground mb-6 drop-shadow-lg">
              {isLoading ? <Loader2 className="w-10 h-10 animate-spin text-neon mx-auto" /> : page?.page_title || 'Contact Us'}
            </h1>
            <div className="w-24 h-1.5 bg-neon mx-auto mb-8 glow-neon rounded-full"></div>
            {page?.content ? (
              <div className="max-w-2xl mx-auto space-y-4">
                {page.content.split('\n').map((paragraph, i) => (
                  paragraph.trim() ? <p key={i} className="font-body text-lg md:text-xl text-primary-foreground/80 leading-relaxed font-light">{paragraph}</p> : null
                ))}
              </div>
            ) : (
              <p className="font-body text-lg md:text-xl text-primary-foreground/80 leading-relaxed font-light max-w-2xl mx-auto">
                Have a question about our collections? Need assistance with an order? Our dedicated team is here to provide you with an exceptional premium experience.
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Left: Contact Info (Takes 2/5 width) */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
              <h3 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground mb-8 flex items-center gap-4">
                Get in Touch <span className="flex-1 h-px bg-border"></span>
              </h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {s?.contact_email && (
                  <a href={`mailto:${s.contact_email}`} className="flex items-center gap-6 p-6 bg-card border border-border rounded-2xl hover:border-neon hover:shadow-[0_8px_30px_rgba(var(--neon),0.1)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shrink-0 group-hover:bg-neon transition-colors duration-300 group-hover:scale-110">
                      <Mail className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground mb-1">Email</h4>
                      <p className="font-body text-sm text-muted-foreground break-all transition-colors group-hover:text-foreground">{s.contact_email}</p>
                    </div>
                  </a>
                )}

                {s?.contact_phone && (
                  <a href={`tel:${s.contact_phone}`} className="flex items-center gap-6 p-6 bg-card border border-border rounded-2xl hover:border-neon hover:shadow-[0_8px_30px_rgba(var(--neon),0.1)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shrink-0 group-hover:bg-neon transition-colors duration-300 group-hover:scale-110">
                      <Phone className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground mb-1">Phone</h4>
                      <p className="font-body text-sm text-muted-foreground transition-colors group-hover:text-foreground">{s.contact_phone}</p>
                    </div>
                  </a>
                )}

                {s?.whatsapp_number && (
                  <a href={`https://wa.me/${s.whatsapp_number.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-6 p-6 bg-card border border-border rounded-2xl hover:border-[#25D366] hover:shadow-[0_8px_30px_rgba(37,211,102,0.15)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#25D366] transition-colors duration-300 group-hover:scale-110">
                      <MessageCircle className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground mb-1">WhatsApp</h4>
                      <p className="font-body text-sm text-muted-foreground transition-colors group-hover:text-foreground">{s.whatsapp_number}</p>
                    </div>
                  </a>
                )}

                {s?.contact_address && (
                  <div className="flex items-center gap-6 p-6 bg-card border border-border rounded-2xl hover:border-neon hover:shadow-[0_8px_30px_rgba(var(--neon),0.1)] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shrink-0 group-hover:bg-neon transition-colors duration-300 group-hover:scale-110">
                      <MapPin className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold uppercase tracking-wider text-sm text-foreground mb-1">Address</h4>
                      <p className="font-body text-sm text-muted-foreground transition-colors group-hover:text-foreground">{s.contact_address}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Contact Form (Takes 3/5 width) */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-3">
              <div className="bg-card border border-border p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-neon/5 blur-[100px] rounded-full pointer-events-none"></div>
                
                <h3 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground mb-2 relative z-10">Send a Message</h3>
                <p className="font-body text-muted-foreground mb-8 relative z-10">Fill out the form below and we'll get back to you as soon as possible.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground">Your Name *</label>
                      <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-5 py-4 border border-border bg-background/50 backdrop-blur-sm rounded-xl font-body text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all hover:border-foreground/30" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground">Email Address *</label>
                      <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-5 py-4 border border-border bg-background/50 backdrop-blur-sm rounded-xl font-body text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all hover:border-foreground/30" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground">Subject</label>
                    <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-5 py-4 border border-border bg-background/50 backdrop-blur-sm rounded-xl font-body text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all hover:border-foreground/30" placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-body text-xs font-bold uppercase tracking-wider text-foreground">Message *</label>
                    <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={6} className="w-full px-5 py-4 border border-border bg-background/50 backdrop-blur-sm rounded-xl font-body text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all resize-none hover:border-foreground/30" placeholder="Write your message here..."></textarea>
                  </div>
                  <button type="submit" disabled={sending} className="w-full bg-primary text-primary-foreground py-5 rounded-xl font-body text-sm font-bold tracking-widest uppercase hover:bg-neon hover:text-white transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(var(--neon),0.3)] flex items-center justify-center gap-3 disabled:opacity-70 group mt-4 overflow-hidden relative">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                    <span className="relative z-10 flex items-center gap-3">
                      {sending ? 'Sending...' : 'Send Message'} 
                      {!sending && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Live Location Map */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-20 lg:mt-24 w-full h-[400px] md:h-[500px] bg-secondary/30 rounded-3xl overflow-hidden border border-border shadow-lg relative group">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            <iframe
              src="https://maps.google.com/maps?q=Nesto%20Hypermarket%20-%20Dragon%20Mart%202,%20Dubai&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Live Location"
              className="relative z-0"
            ></iframe>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
