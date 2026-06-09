import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Zap, Truck, RefreshCw, Shield, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useActiveProducts, useActiveBanners } from '@/hooks/useDatabase';
import { useActiveCategories } from '@/hooks/useCategories';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-sports.jpg';
import { useState, useEffect, useCallback, useRef } from 'react';

import basketballImg from '@/assets/shoe-basketball.jpg';
import runnerImg from '@/assets/shoe-runner-1.jpg';
import footballImg from '@/assets/shoe-football.jpg';
import trainingImg from '@/assets/shoe-training.jpg';
import lifestyleImg from '@/assets/shoe-lifestyle.jpg';
import trailImg from '@/assets/shoe-trail.jpg';
import womensImg from '@/assets/shoe-womens-run.jpg';

const fallbackImages: Record<string, string> = {
  running: runnerImg, basketball: basketballImg, football: footballImg,
  training: trainingImg, lifestyle: lifestyleImg, trail: trailImg, women: womensImg,
};

// Mixed Brands for Clothing, Furniture, and Electronics
const displayBrands = ['ZARA', 'IKEA', 'SAMSUNG', 'H&M', 'APPLE', 'GUCCI', 'SONY', 'ASHLEY', 'LG', 'WEST ELM', "LEVI'S", 'PANASONIC', 'CALVIN KLEIN', 'PHILIPS'];

const reviews = [
  { name: 'Khalid A.', text: 'Authentic products, fast shipping. Best R-Shirt store in Arob Amirat!', rating: 5 },
  { name: 'Fatima R.', text: 'Got my Air Jordans in 2 days. Perfect condition, 100% legit.', rating: 5 },
  { name: 'Mohammed S.', text: 'Great selection of brands. The Ultraboost are incredibly comfortable.', rating: 5 },
];

const Index = () => {
  const { data: dbProducts = [], isLoading: productsLoading } = useActiveProducts();
  const { data: dbCategories = [], isLoading: categoriesLoading } = useActiveCategories();
  const { data: banners = [], isLoading: bannersLoading } = useActiveBanners();
  const { t } = useLanguage();
  const [currentBanner, setCurrentBanner] = useState(0);
  const products = dbProducts.map(p => ({
    id: p.id, name: p.name, brand: p.brand, price: Number(p.price),
    originalPrice: p.original_price ? Number(p.original_price) : undefined,
    category: p.category as any, image: p.image, images: p.images || [p.image],
    sizes: p.sizes || [], colors: p.colors || [], description: p.description || '',
    rating: Number(p.rating) || 4.5, reviews: p.reviews || 0,
    isTrending: p.is_trending || false, isNew: p.is_new || false,
  }));
  const trendingProducts = products.filter(p => p.isTrending);
  const newProducts = products.filter(p => p.isNew);
  const [email, setEmail] = useState('');
  const isLoading = productsLoading || categoriesLoading || bannersLoading;

  const [visibleNewCount, setVisibleNewCount] = useState(10);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef1 = useRef<HTMLDivElement>(null);
  const categoryScrollRef2 = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for Categories
  useEffect(() => {
    if (dbCategories.length <= 8) return; 
    
    const scrollRow = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          ref.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const itemWidth = window.innerWidth < 640 ? 95 : window.innerWidth < 768 ? 112 : window.innerWidth < 1024 ? 136 : 156;
          ref.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      }
    };

    const interval1 = setInterval(() => scrollRow(categoryScrollRef1), 2500);
    const interval2 = setInterval(() => scrollRow(categoryScrollRef2), 3800);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [dbCategories.length]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleNewCount < newProducts.length) {
          setTimeout(() => {
            setVisibleNewCount((prev) => prev + 10);
          }, 800); // Show loading spinner for 800ms
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [visibleNewCount, newProducts.length]);

  const heroBanners = banners.filter(b => b.position === 'hero');
  const promoBanners = banners.filter(b => b.position === 'promo');

  const midCategory = Math.ceil(dbCategories.length / 2);
  const categoryRow1 = dbCategories.slice(0, midCategory);
  const categoryRow2 = dbCategories.slice(midCategory);

  const nextBanner = useCallback(() => {
    if (heroBanners.length > 1) setCurrentBanner(prev => (prev + 1) % heroBanners.length);
  }, [heroBanners.length]);

  const prevBanner = useCallback(() => {
    if (heroBanners.length > 1) setCurrentBanner(prev => (prev - 1 + heroBanners.length) % heroBanners.length);
  }, [heroBanners.length]);

  useEffect(() => {
    if (heroBanners.length <= 1) return;
    const interval = setInterval(nextBanner, 5000);
    return () => clearInterval(interval);
  }, [heroBanners.length, nextBanner]);

  const getCategoryImage = (slug: string, imageUrl: string | null) =>
    imageUrl || fallbackImages[slug] || runnerImg;

  const getCategoryCount = (slug: string) =>
    products.filter(p => p.category === slug).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center pt-20">
          <Loader2 className="w-12 h-12 animate-spin text-neon" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner Section */}
      {heroBanners.length > 0 ? (
        <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={currentBanner} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
              <img src={heroBanners[currentBanner].image_url} alt={heroBanners[currentBanner].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent md:bg-gradient-to-r md:from-primary/90 md:via-primary/50 md:to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex items-end pb-16 sm:pb-20 md:items-center md:pb-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
              <h1 className="heading-display text-3xl sm:text-5xl md:text-7xl lg:text-7xl font-bold leading-[0.95] mb-3 md:mb-6 text-primary-foreground">
                {heroBanners[currentBanner].title}
              </h1>
              {heroBanners[currentBanner].subtitle && (
                <p className="text-primary-foreground/70 font-body text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-lg">
                  {heroBanners[currentBanner].subtitle}
                </p>
              )}
              {heroBanners[currentBanner].link_url && (
                <Link to={heroBanners[currentBanner].link_url!}
                  className="inline-flex items-center gap-2 bg-neon text-accent-foreground px-6 py-3 md:px-8 md:py-4 font-body text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-neon-glow transition-all duration-300 glow-neon rounded-sm">
                  {t('hero.shop_now')} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          </div>

          {heroBanners.length > 1 && (
            <>
              <button onClick={prevBanner} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/50 transition-colors border border-border/30">
                <ChevronLeft className="w-5 h-5 text-primary-foreground" />
              </button>
              <button onClick={nextBanner} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/50 transition-colors border border-border/30">
                <ChevronRight className="w-5 h-5 text-primary-foreground" />
              </button>
              <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {heroBanners.map((_, i) => (
                  <button key={i} onClick={() => setCurrentBanner(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === currentBanner ? 'w-8 bg-neon' : 'w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60'}`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      ) : (
        <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Athletic running shoes in action" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent md:bg-gradient-to-r md:from-primary/90 md:via-primary/60 md:to-transparent" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
              <h1 className="heading-display text-4xl sm:text-6xl md:text-8xl lg:text-7xl font-bold leading-[0.9] mb-6 text-primary-foreground">
                {t('hero.fuel')}<br /><span className="text-neon text-glow">{t('hero.game')}</span>
              </h1>
              <p className="text-primary-foreground/70 font-body text-base md:text-xl mb-8 max-w-lg">
                {t('hero.subtitle')}
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 bg-neon text-accent-foreground px-6 py-3 md:px-8 md:py-4 font-body text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-neon-glow transition-all duration-300 glow-neon rounded-sm">
                {t('hero.shop_now')} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Promo Banners */}
      {promoBanners.length > 0 && (
        <section className="py-6 md:py-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className={`grid gap-4 ${promoBanners.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
              {promoBanners.map(b => (
                <Link key={b.id} to={b.link_url || '/shop'} className="block group relative aspect-[16/7] sm:aspect-[16/6] overflow-hidden rounded-lg">
                  <img src={b.image_url} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6">
                    <h3 className="font-heading text-lg md:text-2xl font-bold uppercase text-primary-foreground">{b.title}</h3>
                    {b.subtitle && <p className="font-body text-xs md:text-sm text-primary-foreground/70 mt-1">{b.subtitle}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand Ticker
      <section className="py-5 border-b border-border bg-card overflow-hidden">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[...displayBrands, ...displayBrands, ...displayBrands].map((brand, i) => (
            <span key={i} className="font-heading text-2xl font-bold text-muted-foreground/30 uppercase tracking-wider">{brand}</span>
          ))}
        </div>
      </section>
      */}

      {/* Categories Grid */}
      <section className="py-12 lg:py-16 bg-pink-50/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="heading-display text-xl md:text-2xl font-bold text-foreground">{t('categories.title')}</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-1 font-body text-sm font-medium text-foreground hover-neon transition-colors">
              {t('categories.all')} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-3 md:gap-4 lg:gap-2">
            <div ref={categoryScrollRef1} className="overflow-x-auto hide-scrollbar pb-2 lg:pb-3 w-full scroll-smooth" style={{ scrollSnapType: 'x mandatory' }}>
              <div className="flex gap-3 md:gap-4 w-max px-1 lg:px-0">
                {categoryRow1.map((cat, i) => (
                  <div key={cat.id} className="w-[85px] sm:w-[100px] md:w-[120px] lg:w-[140px] shrink-0" style={{ scrollSnapAlign: 'start' }}>
                    <Link to={`/shop?category=${cat.slug}`} className="flex flex-col items-center group text-center w-full">
                      <div className="w-full aspect-square overflow-hidden rounded-lg bg-gradient-to-b from-[#eaf6ff] to-[#dbf0ff] transition-all mb-2 relative group-hover:shadow-md border border-border/50">
                        <img src={getCategoryImage(cat.slug, cat.image_url)} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      </div>
                      <h3 className="font-body text-[11px] sm:text-[12px] md:text-[14px] font-medium text-foreground group-hover:text-primary transition-colors truncate w-full text-center leading-tight px-1">{cat.name}</h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {categoryRow2.length > 0 && (
              <div ref={categoryScrollRef2} className="overflow-x-auto hide-scrollbar pb-2 lg:pb-0 w-full scroll-smooth" style={{ scrollSnapType: 'x mandatory' }}>
                <div className="flex gap-3 md:gap-4 w-max px-1 lg:px-0">
                  {categoryRow2.map((cat, i) => (
                    <div key={cat.id} className="w-[85px] sm:w-[100px] md:w-[120px] lg:w-[140px] shrink-0" style={{ scrollSnapAlign: 'start' }}>
                      <Link to={`/shop?category=${cat.slug}`} className="flex flex-col items-center group text-center w-full">
                        <div className="w-full aspect-square overflow-hidden rounded-lg bg-gradient-to-b from-[#eaf6ff] to-[#dbf0ff] transition-all mb-2 relative group-hover:shadow-md border border-border/50">
                          <img src={getCategoryImage(cat.slug, cat.image_url)} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                        </div>
                        <h3 className="font-body text-[11px] sm:text-[12px] md:text-[14px] font-medium text-foreground group-hover:text-primary transition-colors truncate w-full text-center leading-tight px-1">{cat.name}</h3>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-neon font-body text-sm font-bold tracking-[0.1em] uppercase">{t('trending.label')}</span>
              <h2 className="heading-display text-2xl md:text-2xl font-bold mt-1 text-foreground">{t('trending.title')}</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-2 font-body text-sm font-semibold tracking-widers text-foreground hover-neon transition-colors">
              {t('trending.view_all')} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 lg:gap-4">
            {trendingProducts.slice(0, 10).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-14 lg:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-neon font-body text-sm font-bold tracking-[0.1em] uppercase">{t('new.label')}</span>
              <h2 className="heading-display text-2xl md:text-2xl font-bold mt-1 text-foreground">{t('new.title')}</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-2 font-body text-sm font-semibold tracking-widers text-foreground hover-neon transition-colors">
              {t('trending.view_all')} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 lg:gap-4">
            {newProducts.slice(0, visibleNewCount).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {visibleNewCount < newProducts.length && (
            <div ref={loadMoreRef} className="mt-12 flex justify-center items-center gap-2 text-primary py-4">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-body text-sm font-medium tracking-wide">Loading more products...</span>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-neon font-body text-sm font-bold tracking-[0.2em] uppercase">{t('why.label')}</span>
            <h2 className="heading-display text-4xl md:text-2xl font-bold mt-2 text-foreground">{t('why.title')}</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: Shield, title: t('why.authentic'), desc: t('why.authentic_desc') },
              { icon: Zap, title: t('why.performance'), desc: t('why.performance_desc') },
              { icon: Truck, title: t('why.delivery'), desc: t('why.delivery_desc') },
              { icon: RefreshCw, title: t('why.returns'), desc: t('why.returns_desc') },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-background rounded-lg border border-border hover:border-neon/30 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 mx-auto mb-5 bg-neon/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-neon" />
                </div>
                <h3 className="font-heading text-md font-bold uppercase tracking-wide mb-2 text-foreground">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-neon font-body text-sm font-bold tracking-[0.2rem] uppercase">{t('reviews.label')}</span>
            <h2 className="heading-display text-4xl md:text-2xl font-bold mt-2 text-foreground">{t('reviews.title')}</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card p-8 border border-border rounded-lg hover:border-neon/20 hover:shadow-md transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-neon text-neon" />
                  ))}
                </div>
                <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">"{review.text}"</p>
                <p className="font-heading font-bold text-sm uppercase tracking-wider text-foreground">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto text-center">
            <span className="text-neon font-body text-sm font-bold tracking-[0.3em] uppercase">Stay In The Clothing</span>
            <h2 className="heading-display text-3xl md:text-4xl font-bold mt-2 mb-4">Get Exclusive Drops</h2>
            <p className="font-body text-primary-foreground/60 mb-8">{t('newsletter.subtitle')}</p>
            <form onSubmit={(e) => { e.preventDefault(); setEmail(''); }} className="flex flex-col sm:flex-row gap-0">
              <input type="email" placeholder={t('newsletter.placeholder')} value={email} onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 sm:py-4 border border-primary-foreground/20 bg-primary-foreground/5 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-neon transition-colors rounded-sm sm:rounded-l-sm sm:rounded-r-none"
                required
              />
              <button type="submit" className="bg-neon text-accent-foreground px-6 py-3 sm:px-8 sm:py-4 font-body text-sm font-bold tracking-wider uppercase hover:bg-neon-glow transition-colors duration-300 rounded-sm sm:rounded-r-sm sm:rounded-l-none">
                {t('newsletter.subscribe')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
