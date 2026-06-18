import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveCategories } from "@/hooks/useCategories";
import { useSettings } from "@/hooks/useDatabase";
import { AnimatePresence, motion } from "framer-motion";
import {
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User as UserIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cartCount } = useCart();
  const { data: categories = [] } = useActiveCategories();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: settings } = useSettings();
  const { user, signOut } = useAuth();
  const s = Array.isArray(settings) ? settings[0] || {} : settings || {};

  const topCategories = categories.filter((c) => !c.parent_id).slice(0, 3);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-[0_4px_30px_rgb(0,0,0,0.03)] transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            {s?.logo_url ? (
              <img
                src={s.logo_url}
                alt={s?.site_name || "Legacy-29"}
                width="150"
                height="48"
                className="h-10 lg:h-16 w-auto rounded-full object-contain"
              />
            ) : (
              <div className="h-10 lg:h-12 w-[150px]"></div>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-8 font-body text-[13px] tracking-widest uppercase font-semibold text-foreground/80">
            <Link
              to="/"
              className="relative py-2 group hover:text-neon transition-colors duration-300"
            >
              {t("nav.home")}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/shop"
              className="relative py-2 group hover:text-neon transition-colors duration-300"
            >
              {t("nav.shop")}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {topCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                className="relative py-2 group hover:text-neon transition-colors duration-300"
              >
                {cat.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              to="/about"
              className="relative py-2 group hover:text-neon transition-colors duration-300"
            >
              {t("footer.about")}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/careers"
              className="relative py-2 group hover:text-neon transition-colors duration-300"
            >
              Careers
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact"
              className="relative py-2 group hover:text-neon transition-colors duration-300"
            >
              {t("footer.contact")}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-3 text-foreground">
            <Link
              to="/shop"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F4F4] hover:bg-gray-200 text-[#111] transition-all duration-300 group"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />
            </Link>

            <Link
              to="/cart"
              aria-label="Shopping Cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#F4F4F4] hover:bg-gray-200 text-[#111] transition-all duration-300 group"
            >
              <ShoppingCart className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-5 h-5 bg-[#111] text-white rounded-full text-[10px] flex items-center justify-center font-bold shadow-sm border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="hidden md:block w-px h-6 bg-border mx-1"></div>

            {user ? (
              <div className="hidden md:flex items-center gap-1">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 md:px-3 md:py-1.5 rounded-full hover:bg-gray-100 transition-colors group"
                  aria-label="Profile"
                >
                  <div className="w-10 h-10 md:w-8 md:h-8 flex items-center justify-center bg-[#F4F4F4] md:bg-transparent rounded-full group-hover:bg-gray-200 transition-colors">
                    <UserIcon className="w-[18px] h-[18px] md:w-4 md:h-4 text-[#111]" />
                  </div>
                  <span className="hidden md:block font-bold text-xs uppercase tracking-widest text-[#111] mt-[1px]">
                    {user.user_metadata?.full_name?.split(" ")[0] || "Profile"}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all duration-300 group"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-6 md:py-2.5 rounded-full bg-[#111] md:bg-[#111] text-white hover:bg-black transition-all duration-300 shadow-sm group"
              >
                <UserIcon className="w-[18px] h-[18px] md:w-4 md:h-4 md:mr-2" />
                <span className="hidden md:block font-bold text-[11px] uppercase tracking-widest">
                  Login
                </span>
              </Link>
            )}

            <button
              aria-label="Toggle mobile menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-[#111] transition-colors duration-300 ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden absolute top-full left-0 w-full shadow-2xl"
          >
            <div className="flex flex-col px-6 py-6 gap-2 font-body text-sm tracking-widest uppercase font-medium text-foreground">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="hover:text-neon transition-colors py-3 border-b border-border/40"
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileOpen(false)}
                className="hover:text-neon transition-colors py-3 border-b border-border/40"
              >
                {t("nav.shop")}
              </Link>
              {topCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-neon transition-colors py-3 border-b border-border/40"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="hover:text-neon transition-colors py-3 border-b border-border/40"
              >
                {t("footer.about")}
              </Link>
              <Link
                to="/careers"
                onClick={() => setMobileOpen(false)}
                className="hover:text-neon transition-colors py-3 border-b border-border/40"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="hover:text-neon transition-colors py-3 border-b border-border/40"
              >
                {t("footer.contact")}
              </Link>
              {user ? (
                <div className="flex flex-col gap-3 mt-4">
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="hover:bg-gray-200 bg-[#F4F4F4] text-[#111] font-bold tracking-wider rounded-xl transition-colors py-4 px-5 flex items-center gap-3"
                  >
                    <UserIcon className="w-5 h-5" /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="hover:bg-red-100 text-red-500 font-bold tracking-wider bg-red-50 rounded-xl transition-colors py-4 px-5 text-start flex items-center gap-3"
                  >
                    <LogOut className="w-5 h-5" /> {t("logout", "Logout")}
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="bg-[#111] text-white hover:bg-black px-4 py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 font-bold uppercase tracking-wider shadow-md"
                >
                  <UserIcon className="w-5 h-5" /> {t("login", "Login")}
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
