import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useActiveProducts } from '@/hooks/useDatabase';
import { useActiveCategories } from '@/hooks/useCategories';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: dbProducts = [], isLoading } = useActiveProducts();
  const { data: dbCategories = [] } = useActiveCategories();
  const { t } = useLanguage();
  const categoryFilter = searchParams.get('category') || '';
  const [search, setSearch] = useState('');
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [showFilters, setShowFilters] = useState(false);

  const products = useMemo(() => {
    return dbProducts.map(p => ({
      id: p.id, name: p.name, brand: p.brand, price: Number(p.price),
      originalPrice: p.original_price ? Number(p.original_price) : undefined,
      category: p.category as any, image: p.image, images: p.images || [p.image],
      sizes: p.sizes || [], colors: p.colors || [], description: p.description || '',
      rating: Number(p.rating) || 4.5, reviews: p.reviews || 0,
      isTrending: p.is_trending || false, isNew: p.is_new || false,
    }));
  }, [dbProducts]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (categoryFilter && p.category !== categoryFilter) return false;
      
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      const maxPrice = priceRange[1] > 0 ? priceRange[1] : Infinity;
      if (p.price < priceRange[0] || p.price > maxPrice) return false;
      return true;
    });
  }, [products, categoryFilter, search, priceRange]);

  const setCategory = (cat: string) => {
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  const [visibleCount, setVisibleCount] = useState(12);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [categoryFilter, search, priceRange]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filtered.length) {
          setTimeout(() => {
            setVisibleCount((prev) => prev + 12);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filtered.length]);

  const activeCategoryName = dbCategories.find(c => c.slug === categoryFilter)?.name;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 lg:pt-24">
        <div className="bg-card border-b border-border py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-neon font-body text-sm font-bold tracking-[0.3em] uppercase">{t('shop.collection')}</span>
              <h1 className="heading-display text-4xl md:text-4xl font-bold mt-2 text-foreground">
                {activeCategoryName || (categoryFilter ? categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1) : t('shop.all_products'))}
              </h1>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder={t('shop.search')} value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full ps-11 pe-4 py-3 border border-border bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon transition-colors rounded-sm" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-border bg-background font-body text-sm text-foreground hover:border-neon transition-colors md:hidden rounded-sm">
              <SlidersHorizontal className="w-4 h-4" /> {t('shop.filters')}
            </button>
          </div>

          <div className="flex gap-8">
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0 sticky top-28 self-start`}>
              <div className="bg-card border border-border p-6 rounded-xl shadow-sm flex flex-col gap-8 h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div>
                  <h3 className="font-heading font-bold uppercase tracking-wider text-[15px] mb-4 text-foreground border-b border-border pb-3">{t('shop.categories')}</h3>
                  <div className="space-y-1.5">
                    <button onClick={() => setCategory('')}
                      className={`flex items-center w-full text-left font-body text-sm py-2 px-3 rounded-lg transition-all ${!categoryFilter ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                      <span className="w-6"></span>
                      {t('shop.all_products')}
                    </button>
                    {dbCategories.map(cat => (
                      <button key={cat.id} onClick={() => setCategory(cat.slug)}
                        className={`flex items-center w-full text-left font-body text-sm py-2 px-3 rounded-lg transition-all ${categoryFilter === cat.slug ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                        {cat.image_url ? (
                          <img src={cat.image_url} alt="" className="w-5 h-5 inline-block mr-2.5 rounded object-cover shadow-sm" />
                        ) : (
                          <span className="w-7"></span>
                        )}
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold uppercase tracking-wider text-[15px] mb-4 text-foreground border-b border-border pb-3">{t('shop.price')}</h3>
                  <div className="flex gap-3 items-center font-body text-sm">
                    <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary rounded-md transition-all" placeholder="Min" />
                    <span className="text-muted-foreground font-bold">–</span>
                    <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-full px-3 py-2 border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary rounded-md transition-all" placeholder="Max" />
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <p className="font-body text-sm text-muted-foreground mb-6">{filtered.length} {t('shop.products_found')}</p>
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-neon" />
                </div>
              ) : filtered.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-4">
                    {filtered.slice(0, visibleCount).map(product => <ProductCard key={product.id} product={product} />)}
                  </div>
                  
                  {visibleCount < filtered.length && (
                    <div ref={loadMoreRef} className="mt-12 flex justify-center items-center gap-2 text-primary py-4">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="font-body text-sm font-medium tracking-wide">Loading more products...</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="font-heading text-2xl uppercase font-bold mb-2 text-foreground">{t('shop.no_results')}</p>
                  <p className="font-body text-sm text-muted-foreground">{t('shop.adjust_filters')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
