import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import WhatsAppButton from "@/components/WhatsAppButton";
import FacebookPixelProvider from "@/components/FacebookPixelProvider";
import ProtectedAdminRoute from "@/components/ProtectedAdminRoute";
import ScrollToTop from "@/components/ScrollToTop";
import VisitorTracker from "@/components/VisitorTracker";
import { Loader2 } from "lucide-react";

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index.tsx"));
const ShopPage = lazy(() => import("./pages/ShopPage.tsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.tsx"));
const CartPage = lazy(() => import("./pages/CartPage.tsx"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage.tsx"));
const WishlistPage = lazy(() => import("./pages/WishlistPage.tsx"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.tsx"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage.tsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.tsx"));
const ProductsManager = lazy(() => import("./pages/admin/ProductsManager.tsx"));
const OrdersManager = lazy(() => import("./pages/admin/OrdersManager.tsx"));
const OrderDetailsPage = lazy(
  () => import("./pages/admin/OrderDetailsPage.tsx"),
);
const CouponsManager = lazy(() => import("./pages/admin/CouponsManager.tsx"));
const CheckoutLeadsManager = lazy(
  () => import("./pages/admin/CheckoutLeadsManager.tsx"),
);
const CategoriesManager = lazy(
  () => import("./pages/admin/CategoriesManager.tsx"),
);
const BannersManager = lazy(() => import("./pages/admin/BannersManager.tsx"));
const AnalyticsPage = lazy(() => import("./pages/admin/AnalyticsPage.tsx"));
const VisitorAnalyticsPage = lazy(
  () => import("./pages/admin/VisitorAnalyticsPage.tsx"),
);
const ShippingMethodsManager = lazy(
  () => import("./pages/admin/ShippingMethodsManager.tsx"),
);
const ReviewsManager = lazy(() => import("./pages/admin/ReviewsManager.tsx"));
const CustomersPage = lazy(() => import("./pages/admin/CustomersPage.tsx"));
const UsersManager = lazy(() => import("./pages/admin/UsersManager.tsx"));
const SettingsPage = lazy(() => import("./pages/admin/SettingsPage.tsx"));
const MarketingTrackingPage = lazy(
  () => import("./pages/admin/MarketingTrackingPage.tsx"),
);
const MessagesManager = lazy(() => import("./pages/admin/MessagesManager.tsx"));
const PagesManager = lazy(() => import("./pages/admin/PagesManager.tsx"));
const JobApplicationsManager = lazy(
  () => import("./pages/admin/JobApplicationsManager.tsx"),
);
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const CareersPage = lazy(() => import("./pages/CareersPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));

const queryClient = new QueryClient();

// Page loading fallback
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <Loader2 className="w-12 h-12 animate-spin text-neon" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <LanguageProvider>
                <ScrollToTop />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route
                      path="/admin"
                      element={
                        <ProtectedAdminRoute>
                          <AdminLayout />
                        </ProtectedAdminRoute>
                      }
                    >
                      <Route index element={<Dashboard />} />
                      <Route path="products" element={<ProductsManager />} />
                      <Route path="orders" element={<OrdersManager />} />
                      <Route path="orders/:id" element={<OrderDetailsPage />} />
                      <Route
                        path="categories"
                        element={<CategoriesManager />}
                      />
                      <Route path="coupons" element={<CouponsManager />} />
                      <Route
                        path="checkout-leads"
                        element={<CheckoutLeadsManager />}
                      />
                      <Route path="banners" element={<BannersManager />} />
                      <Route path="messages" element={<MessagesManager />} />
                      <Route path="analytics" element={<AnalyticsPage />} />
                      <Route
                        path="visitor-analytics"
                        element={<VisitorAnalyticsPage />}
                      />
                      <Route path="customers" element={<CustomersPage />} />
                      <Route path="users" element={<UsersManager />} />
                      <Route path="settings" element={<SettingsPage />} />
                      <Route
                        path="marketing"
                        element={<MarketingTrackingPage />}
                      />
                      <Route
                        path="shipping"
                        element={<ShippingMethodsManager />}
                      />
                      <Route path="reviews" element={<ReviewsManager />} />
                      <Route path="pages" element={<PagesManager />} />
                      <Route
                        path="job-applications"
                        element={<JobApplicationsManager />}
                      />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <VisitorTracker />
                {/* <WhatsAppButton /> */}
                <FacebookPixelProvider />
              </LanguageProvider>
            </BrowserRouter>
          </AdminAuthProvider>
        </AuthProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
