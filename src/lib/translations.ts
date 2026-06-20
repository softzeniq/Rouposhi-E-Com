export type Language = "en";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.shop": "Shop",

    // Hero
    "hero.fuel": "FUEL YOUR",
    "hero.game": "GAME",
    "hero.subtitle":
      "Authentic T-Sshirt, Pant & more. Delivered to your door in arob.",
    "hero.shop_now": "Shop Now",

    // Categories
    "categories.browse": "Browse",
    "categories.title": "Shop by Category",
    "categories.all": "All Categories",
    "categories.products": "Products",

    // Trending
    "trending.label": "Hot Right Now",
    "trending.title": "Trending",
    "trending.view_all": "View All",

    // New Arrivals
    "new.label": "Just Dropped",
    "new.title": "New Arrivals",

    // Why Choose Us
    "why.label": "সেরা স্বাদ ও গুণগত মান",
    "why.title": "কেন আমাদের খাবারদাবার সেরা?",
    "why.authentic": "১০০% ফ্রেশ ও হাইজেনিক",
    "why.authentic_desc":
      "আমরা সম্পূর্ণ স্বাস্থ্যকর ও পরিষ্কার-পরিচ্ছন্ন পরিবেশে সম্পূর্ণ ফ্রেশ উপাদান দিয়ে খাবার তৈরি করি।",
    "why.performance": "সেরা স্বাদ ও গুণগত মান",
    "why.performance_desc":
      "খাবারের আসল স্বাদ আর সঠিক গুণগত মান বজায় রাখাই আমাদের প্রথম লক্ষ্য।",
    "why.delivery": "ঝিনাইদহ ও কালীগঞ্জে ডেলিভারি",
    "why.delivery_desc":
      "আমরা ঝিনাইদহ সদর এবং কালীগঞ্জ উপজেলার ভেতরে দ্রুততম সময়ের মধ্যে খাবার খাবার ডেলিভারি দিয়ে থাকি।",
    "why.returns": "ডেলিভারি ও রিটার্ন শর্ত",
    "why.returns_desc":
      "নির্দিষ্ট সময়ে খাবার ডেলিভারি দিতে না পারলে বা ডেলিভারি ম্যান ভেতরে স ভেতরে যেতে না পারলে রিটার্ন প্রযোজ্য। সঠিক সময়ে পৌঁছালে কোনো রিটার্ন হবে না।",

    // Reviews
    "reviews.label": "গ্রাহকদের মতামত",
    "reviews.title": "আমাদের সম্পর্কে গ্রাহকরা যা বলছেন",

    // Newsletter
    "newsletter.label": "বিশেষ অফার",
    "newsletter.title": "খাবারদাবারের সাথে থাকুন",
    "newsletter.subtitle":
      "নতুন খাবার, বিশেষ ডিসকাউন্ট এবং এক্সক্লুসিভ অফারের আপডেট পেতে আজই সাবস্ক্রাইব করুন।",
    "newsletter.placeholder": "আপনার ইমেইল ঠিকানা",
    "newsletter.subscribe": "যোগ দিন",

    // Shop Page
    "shop.collection": "Collection",
    "shop.all_products": "All Products",
    "shop.search": "Search shoes, brands...",
    "shop.filters": "Filters",
    "shop.categories": "Categories",
    "shop.brands": "Brands",
    "shop.all_brands": "All Brands",
    "shop.price": "Price (৳)",
    "shop.products_found": "products found",
    "shop.loading": "Loading products...",
    "shop.no_results": "No Results",
    "shop.adjust_filters": "Try adjusting your filters",

    // Product Page
    "product.reviews": "reviews",
    "product.in_stock": "in stock",
    "product.out_of_stock": "Out of stock",
    "product.select_size": "Select Size",
    "product.color": "Color",
    "product.add_to_cart": "Add to Cart",
    "product.buy_now": "Buy Now",
    "product.authentic": "100% Authentic - Verified by Lagecy-19 Collection",
    "product.free_delivery": "Free delivery across Dubai on orders over ৳ 30",
    "product.return_policy": "30-day easy return policy",
    "product.cod": "Cash on Delivery available",
    "product.related": "You May Also Like",
    "product.not_found": "Product Not Found",
    "product.back_to_shop": "Back to Shop",
    "product.select_size_error": "Please select a size",
    "product.select_color_error": "Please select a color",
    "product.out_of_stock_error": "This variation is out of stock",
    "product.added_to_cart": "added to cart!",

    // Cart Page
    "cart.title": "Your Cart",
    "cart.empty": "Cart is Empty",
    "cart.empty_subtitle": "Time to gear up",
    "cart.order_summary": "Order Summary",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.free": "Free",
    "cart.total": "Total",
    "cart.checkout": "Proceed to Checkout",
    "cart.cod_available": "Cash on Delivery available 🇪",

    // Checkout Page
    "checkout.title": "Checkout",
    "checkout.back_to_cart": "Back to Cart",
    "checkout.contact_info": "Contact Information",
    "checkout.full_name": "Full Name",
    "checkout.phone": "Phone",
    "checkout.email": "Email",
    "checkout.shipping_address": "Shipping Address",
    "checkout.area": "Area",
    "checkout.block": "Block",
    "checkout.street": "Street & Building",
    "checkout.notes": "Notes",
    "checkout.delivery_instructions": "Delivery instructions...",
    "checkout.shipping_method": "Shipping Method",
    "checkout.no_shipping": "No shipping methods available",
    "checkout.payment_method": "Payment Method",
    "checkout.cod": "Cash on Delivery (COD)",
    "checkout.cod_desc": "Pay when you receive your order",
    "checkout.place_order": "Place Order",
    "checkout.placing": "Placing Order...",
    "checkout.order_confirmed": "Order Confirmed! 🎉",
    "checkout.order_placed": "has been placed",
    "checkout.payment_cod": "Payment: Cash on Delivery",
    "checkout.continue_shopping": "Continue Shopping",
    "checkout.go_home": "Go Home",
    "checkout.fill_required": "Please fill in all required fields",
    "checkout.order_success": "Order placed successfully!",
    "checkout.order_failed": "Failed to place order. Please try again.",
    "checkout.step_info": "Your Info",
    "checkout.step_shipping": "Shipping",
    "checkout.step_review": "Review",
    "checkout.next": "Continue",
    "checkout.back": "Back",
    "checkout.name_required": "Name is required",
    "checkout.phone_required": "Phone number is required",
    "checkout.phone_invalid": "Enter a valid phone number (8+ digits)",
    "checkout.address_required": "Address is required",
    "checkout.review_title": "Review Your Order",
    "checkout.edit": "Edit",
    "checkout.items_count": "items",
    "checkout.secure_checkout": "Secure Checkout",

    // Wishlist
    "wishlist.title": "Wishlist",
    "wishlist.empty": "No Saved Items",
    "wishlist.empty_subtitle": "Save your favorite kicks here",
    "wishlist.browse": "Browse Collection",

    // Footer
    "footer.shop": "Shop",
    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.contact": "Contact Us",
    "footer.contact_title": "Contact",
    "footer.whatsapp": "WhatsApp",
    "footer.all_products": "All Products",

    // Product Card
    "card.new": "New",
    "card.sale": "Sale",

    // General
    loading: "Loading...",
    size: "Size",
  },
};
