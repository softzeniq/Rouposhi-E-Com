import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useActiveCategories } from '@/hooks/useCategories';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { useSettings } from '@/hooks/useDatabase';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cartCount } = useCart();
  const { data: categories = [] } = useActiveCategories();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: settings } = useSettings();
  const { user, signOut } = useAuth();
  const s = Array.isArray(settings) ? settings[0] || {} : settings || {};

  const topCategories = categories.filter(c => !c.parent_id).slice(0, 3);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src={s?.logo_url || '/logo.png'} alt={s?.site_name || 'legacy'} className="h-10 lg:h-12 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-widest uppercase font-medium text-foreground">
            <Link to="/" className="hover-neon transition-colors duration-300">{t('nav.home')}</Link>
            <Link to="/shop" className="hover-neon transition-colors duration-300">{t('nav.shop')}</Link>
            {topCategories.map(cat => (
              <Link key={cat.id} to={`/shop?category=${cat.slug}`} className="hover-neon transition-colors duration-300">
                {cat.name}
              </Link>
            ))}
            <Link to="/about" className="hover-neon transition-colors duration-300">{t('footer.about')}</Link>
            <Link to="/contact" className="hover-neon transition-colors duration-300">{t('footer.contact')}</Link>
          </div>

          <div className="flex items-center gap-4 text-foreground">
            <Link to="/shop" className="hover-neon transition-colors duration-300" aria-label="Search"><Search className="w-5 h-5" /></Link>
            {/* <Link to="/wishlist" className="hover-neon transition-colors duration-300"><Heart className="w-5 h-5" /></Link> */}
            <Link to="/cart" className="relative flex items-center justify-center w-10 h-10 bg-secondary/30 hover:bg-primary/10 rounded-full transition-all duration-300 group ml-2">
              <ShoppingCart className="w-[18px] h-[18px] text-foreground group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-neon text-accent-foreground rounded-full text-[10px] flex items-center justify-center font-bold shadow-md border-2 border-background">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2 md:gap-3 bg-card shadow-sm px-2 md:px-3 lg:py-2 py-1 rounded-full border border-border ml-1 md:ml-2">
                <Link to="/profile" className="flex items-center gap-1.5 hover:text-primary transition-colors duration-300 group" aria-label="Profile">
                  <div className="bg-primary/10 p-1 rounded-full group-hover:bg-primary/20 transition-colors">
                    <UserIcon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="hidden md:block font-body text-xs font-bold uppercase tracking-wider">{user.user_metadata?.full_name?.split(' ')[0] || 'Profile'}</span>
                </Link>
                <div className="w-px h-3 bg-border"></div>
                <button onClick={() => signOut()} className="hover:text-destructive transition-colors duration-300 flex items-center gap-1.5" aria-label="Logout">
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden md:block font-body text-xs font-bold uppercase tracking-wider">{t('logout', 'Logout')}</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-neon text-accent-foreground hover:bg-neon-glow px-4 md:px-6 py-2 lg:py-3 rounded-full font-body text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md glow-neon ml-1 md:ml-2">
                <UserIcon className="w-4 h-4" />
                <span className="hidden md:block">{t('login', 'Login')}</span>
              </Link>
            )}
            <button className="md:hidden hover-neon transition-colors duration-300 ml-1" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden absolute top-full left-0 w-full shadow-2xl"
          >
            <div className="flex flex-col px-6 py-6 gap-2 font-body text-sm tracking-widest uppercase font-medium text-foreground">
              <Link to="/" onClick={() => setMobileOpen(false)} className="hover:text-neon transition-colors py-3 border-b border-border/40">{t('nav.home')}</Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="hover:text-neon transition-colors py-3 border-b border-border/40">{t('nav.shop')}</Link>
              {topCategories.map(cat => (
                <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setMobileOpen(false)} className="hover:text-neon transition-colors py-3 border-b border-border/40">
                  {cat.name}
                </Link>
              ))}
              <Link to="/about" onClick={() => setMobileOpen(false)} className="hover:text-neon transition-colors py-3 border-b border-border/40">{t('footer.about')}</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="hover:text-neon transition-colors py-3 border-b border-border/40">{t('footer.contact')}</Link>
              {user ? (
                <div className="flex flex-col gap-3 mt-4">
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="hover:bg-primary/10 bg-secondary/50 rounded-lg transition-colors py-3.5 px-4 flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-primary" /> Profile
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="hover:bg-destructive hover:text-destructive-foreground bg-destructive/10 text-destructive rounded-lg transition-colors py-3.5 px-4 text-start flex items-center gap-3">
                    <LogOut className="w-5 h-5" /> {t('logout', 'Logout')}
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="bg-neon text-accent-foreground glow-neon hover:bg-neon-glow px-4 py-4 rounded-lg transition-all flex items-center justify-center gap-2 mt-4 font-bold uppercase tracking-wider shadow-lg">
                  <UserIcon className="w-5 h-5" /> {t('login', 'Login')}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
