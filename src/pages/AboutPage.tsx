import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shirt, ShoppingBag, Sofa, Shield, Users, Sparkles, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us | Legacy-29";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
      {/* Step 1: Header Section */}
      <div className="container mx-auto px-4 lg:px-8 text-center mb-20 mt-10">
        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-widest text-foreground mb-6">About Us</h1>
        <h2 className="font-body text-xl md:text-2xl font-semibold text-primary mb-6">
          Welcome to Legacy-29 – A New Chapter of Sophistication
        </h2>
        <p className="font-body text-base text-muted-foreground leading-relaxed">
          At Legacy-29, we believe that true style is more than just what you wear or how you decorate your space—it is a reflection of your identity, your ambitions, and the legacy you leave behind. Based in the vibrant international business hub of Dubai, UAE, Legacy-29 is a premium lifestyle and e-commerce brand dedicated to bringing modern elegance, top-tier quality, and exceptional value directly to your doorstep.
        </p>
      </div>

      {/* Step 2: Our Story */}
      <div className="bg-secondary/30 py-20 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h3 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">Our Story</h3>
              <div className="w-16 h-1 bg-primary"></div>
              <p className="font-body text-muted-foreground leading-relaxed text-sm md:text-base">
                Legacy-29 was born out of a passion for refined aesthetics and entrepreneurship. We set out with a clear vision: to bridge the gap between high-end sophistication and everyday accessibility. Today, our brand spans multiple carefully curated sectors, including premium fashion apparel, lifestyle retail through Legacy-29 Mart, and high-quality home furnishings under Legacy Furniture.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed text-sm md:text-base">
                Every single product that carries the Legacy-29 name undergoes rigorous quality curation, ensuring it meets the high standards our customers deserve.
              </p>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-[4/3] bg-background border border-border rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                <h2 className="font-heading text-4xl font-bold text-primary/30 uppercase tracking-widest transform -rotate-6 select-none">Legacy-29</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: What We Offer */}
      <div className="py-20 container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground">What We Offer</h3>
          <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border p-8 rounded-xl hover:border-primary/50 transition-all hover:-translate-y-1 group shadow-sm">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
              <Shirt className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h4 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-center text-foreground">Premium Apparel</h4>
            <p className="font-body text-sm text-muted-foreground leading-relaxed text-center">
              From our minimalist, high-grade signature t-shirts to versatile wardrobe essentials, we design clothing for individuals who value clean aesthetics, ultimate comfort, and timeless style.
            </p>
          </div>
          
          <div className="bg-card border border-border p-8 rounded-xl hover:border-primary/50 transition-all hover:-translate-y-1 group shadow-sm">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
              <ShoppingBag className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h4 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-center text-foreground">Legacy-29 Mart</h4>
            <p className="font-body text-sm text-muted-foreground leading-relaxed text-center">
              A seamless, modern shopping experience offering trending, high-utility lifestyle products carefully selected for the fast-paced Dubai market.
            </p>
          </div>

          <div className="bg-card border border-border p-8 rounded-xl hover:border-primary/50 transition-all hover:-translate-y-1 group shadow-sm">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
              <Sofa className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h4 className="font-heading text-lg font-bold uppercase tracking-wider mb-4 text-center text-foreground">Legacy Furniture</h4>
            <p className="font-body text-sm text-muted-foreground leading-relaxed text-center">
              Direct warehouse-to-customer delivery of stylish, durable, and functional furniture designed to elevate your living spaces effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Step 4: Our Core Values */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-heading text-3xl font-bold uppercase tracking-wider">Our Core Values</h3>
            <div className="w-16 h-1 bg-primary-foreground/30 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-5 text-center"><Shield className="w-12 h-12 mx-auto text-primary-foreground/90" /><h4 className="font-heading text-lg font-bold uppercase tracking-wider">Uncompromised Quality</h4><p className="font-body text-sm text-primary-foreground/80 leading-relaxed">We do not cut corners. From fabric selection to furniture craftsmanship, quality is our top priority.</p></div>
            <div className="space-y-5 text-center"><Users className="w-12 h-12 mx-auto text-primary-foreground/90" /><h4 className="font-heading text-lg font-bold uppercase tracking-wider">Customer-Centric</h4><p className="font-body text-sm text-primary-foreground/80 leading-relaxed">Operating a seamless dropshipping and e-commerce model means we focus entirely on making your shopping experience smooth, fast, and reliable.</p></div>
            <div className="space-y-5 text-center"><Sparkles className="w-12 h-12 mx-auto text-primary-foreground/90" /><h4 className="font-heading text-lg font-bold uppercase tracking-wider">Sophistication</h4><p className="font-body text-sm text-primary-foreground/80 leading-relaxed">We believe in the power of minimalist design. Our products are crafted to look effortless yet undeniably premium.</p></div>
          </div>
        </div>
      </div>

      {/* Step 5: Join the Legacy */}
      <div className="py-24 container mx-auto px-4 lg:px-8 max-w-7xl text-center">
        <h3 className="font-heading text-3xl font-bold uppercase tracking-wider text-foreground mb-6">Join the Legacy</h3>
        <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
          Whether you are redefining your personal style, upgrading your home, or shopping for everyday essentials, Legacy-29 is here to accompany you on that journey. Thank you for choosing us and being a part of our story.
        </p>
        <p className="font-body font-semibold text-foreground mb-10 uppercase tracking-widest text-sm">
          Experience the next level of lifestyle retail. Welcome to Legacy-29.
        </p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-md font-body text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
          Explore Store <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;