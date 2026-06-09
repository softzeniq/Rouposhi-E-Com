import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasMultipleImages = product.images && product.images.length > 1;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hasMultipleImages) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 2500); // Auto slide every 2.5 seconds
    }
    return () => clearInterval(interval);
  }, [hasMultipleImages, product.images]);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 hover:shadow-md transition-all"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-background">
          <AnimatePresence>
            <motion.img 
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              src={hasMultipleImages ? product.images[currentImageIndex] : product.image} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
              loading="lazy" 
            />
          </AnimatePresence>
          
          {/* Dynamic Pagination dots */}
          {hasMultipleImages && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {product.images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-neon' : 'bg-muted'}`}
                ></div>
              ))}
            </div>
          )}

          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            aria-label="Toggle wishlist"
            className="absolute bottom-2 right-2 w-7 h-7 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full transition-all hover:bg-background z-20 shadow-sm border border-border/50"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-neon text-neon' : 'text-muted-foreground hover:text-foreground'}`} />
          </button>
        </div>
        
        <div className="p-3">
          <h3 className="text-[15px] font-medium text-foreground truncate mb-1.5">{product.name}</h3>
          
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-neon text-[16px] leading-none">{product.price} AED</span>
            {product.originalPrice && (
              <>
                <span className="text-muted-foreground line-through text-[12px] leading-none">{product.originalPrice} AED</span>
                <span className="text-hot text-[12px] font-bold leading-none">
                  ({discountPercentage}% OFF)
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
