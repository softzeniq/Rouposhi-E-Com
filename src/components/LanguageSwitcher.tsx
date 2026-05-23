import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language } = useLanguage();

  return (
    <div
      className="flex items-center gap-1.5 transition-colors duration-300 text-foreground text-xs font-body tracking-wide uppercase"
      aria-hidden
    >
      <Globe className="w-4 h-4" />
      <span>EN</span>
    </div>
  );
};

export default LanguageSwitcher;
