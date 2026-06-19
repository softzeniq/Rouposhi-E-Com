import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  BarChart2,
  Calendar,
  Check,
  Coffee,
  Package,
  Play,
  TrendingDown,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("reliability");

  const tabContent = {
    reliability: {
      title: "Built for uptime",
      body: "A dinner rush is not the time for software failures. Kabar Dabar is engineered for 99.99% uptime with offline mode so orders keep flowing even when your internet doesn't. Every feature is stress-tested against peak-hour conditions before it ships.",
    },
    simplicity: {
      title: "Zero learning curve",
      body: "Staff turnover is a reality in hospitality. Kabar Dabar is designed so a new server can take their first order within five minutes of picking up a tablet — no training videos required. If it takes more than two taps, we rethink it.",
    },
    growth: {
      title: "Analytics that act",
      body: "We don't just show you charts — we surface insights you can act on today. Which menu items are dragging down kitchen speed? Which time slots are under-booked? Kabar Dabar answers these questions before you think to ask them.",
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      {/* =========================================
          SECTION 1: HERO
          ========================================= */}
      <div className="border-b border-gray-100 py-16 lg:pt-32 pt-24 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Phone Mockup */}
            <div className="relative flex-shrink-0 flex items-center justify-center">
              {/* Background circle */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-50 rounded-full z-0" />

              {/* Phone frame */}
              <div className="relative z-10 w-56 bg-white border-[6px] border-gray-900 rounded-[36px] overflow-hidden shadow-xl">
                {/* Notch */}
                <div className="w-[70px] h-[18px] bg-gray-900 rounded-full mx-auto mt-2" />

                {/* Screen content */}
                <div className="p-2.5 pb-3">
                  <div className="text-[11px] font-medium text-gray-900 mb-2 px-0.5">
                    Featured Menu
                  </div>

                  {/* Metric row */}
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    <div className="bg-emerald-50 rounded-lg p-2">
                      <div className="text-base font-medium text-emerald-800">
                        50+
                      </div>
                      <div className="text-[9px] text-emerald-700">
                        signature dishes
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-base font-medium text-gray-900">
                        4.9★
                      </div>
                      <div className="text-[9px] text-gray-500">
                        guest rating
                      </div>
                    </div>
                  </div>

                  {/* Orders list */}
                  {[
                    {
                      icon: <Coffee className="w-3.5 h-3.5 text-emerald-700" />,
                      bg: "bg-emerald-50",
                      title: "Grilled Chicken Bowl",
                      sub: "Fresh ingredients · Best seller",
                    },
                    {
                      icon: (
                        <UtensilsCrossed className="w-3.5 h-3.5 text-amber-700" />
                      ),
                      bg: "bg-amber-50",
                      title: "Signature Burger",
                      sub: "Chef's special recipe",
                    },
                    {
                      icon: <Check className="w-3.5 h-3.5 text-blue-700" />,
                      bg: "bg-blue-50",
                      title: "Seafood Pasta",
                      sub: "Customer favorite",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 mb-1.5"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[11px] font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-[9px] text-gray-500">
                          {item.sub}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Bottom nav */}
                  <div className="flex justify-around mt-2.5 pt-2 border-t border-gray-100">
                    <UtensilsCrossed className="w-4.5 h-4.5 text-emerald-600" />
                    <BarChart2 className="w-4.5 h-4.5 text-gray-300" />
                    <Calendar className="w-4.5 h-4.5 text-gray-300" />
                    <Users className="w-4.5 h-4.5 text-gray-300" />
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute bottom-5 -right-16 bg-white border border-gray-100 rounded-xl p-3 shadow-md min-w-[120px] z-20">
                <div className="text-[11px] text-gray-500 mb-1">
                  Avg. table turn
                </div>
                <div className="text-xl font-medium text-gray-900">38 min</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-0.5">
                  <TrendingDown className="w-3 h-3" />
                  −12%
                </div>
              </div>
            </div>

            {/* Right: text + stats */}
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 mb-5">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                Restaurant Startup
              </div>

              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 leading-tight mb-4">
                Crafting memorable dining experiences, one meal at a time
              </h1>
              <p className="text-gray-500 leading-relaxed text-lg mb-6">
                Kabar Dabar was created with a simple vision — serve exceptional
                food, create unforgettable moments, and bring people together
                around great dining experiences. From carefully selected
                ingredients to outstanding hospitality, every detail is designed
                to make every visit special.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  {
                    icon: <UtensilsCrossed className="w-5 h-5 text-gray-400" />,
                    num: "50+",
                    label: "Signature Dishes",
                  },
                  {
                    icon: <Users className="w-5 h-5 text-gray-400" />,
                    num: "10K+",
                    label: "Happy Guests",
                  },
                  {
                    icon: <Check className="w-5 h-5 text-gray-400" />,
                    num: "4.9★",
                    label: "Customer Rating",
                  },
                  {
                    icon: <Coffee className="w-5 h-5 text-gray-400" />,
                    num: "100%",
                    label: "Fresh Ingredients",
                  },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4">
                    <div className="mb-1.5">{stat.icon}</div>
                    <div className="text-2xl font-medium text-gray-900">
                      {stat.num}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-black transition-colors">
                  Start free trial <ArrowRight className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  <Play className="w-4 h-4" /> Watch demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 2: OUR STORY
          ========================================= */}
      <div className="border-b border-gray-100 py-16 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              Our story
            </div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              Smart <span className="text-gray-400">ordering.</span> Faster
              kitchens. <span className="text-gray-400">Happier guests.</span>
            </h2>
          </div>

          {/* Two small images */}
          <div className="grid grid-cols-2 gap-3 mb-3 h-44">
            {[
              {
                src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600",
                tag: "Kitchen ops",
                alt: "Restaurant kitchen",
              },
              {
                src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
                tag: "Front of house",
                alt: "Restaurant dining",
              },
            ].map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(30%)" }}
                />
                <span className="absolute top-3 right-3 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-gray-100 text-gray-600">
                  {img.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom: large image + text */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="h-60 lg:h-72 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800"
                alt="Restaurant team"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(30%)" }}
              />
            </div>
            <div>
              <p className="text-gray-500 leading-relaxed text-base mb-6">
                Kabar Dabar was founded by a chef and a software engineer who
                were tired of juggling six different tools to run a single
                restaurant. We built the platform we always wished existed — one
                that connects POS, kitchen display, inventory, reservations, and
                analytics in a single, intuitive system.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-100">
                {[
                  { num: "2026", label: "Founded" },
                  { num: "100%", label: "Uptime SLA" },
                  { num: "24/7", label: "Support" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-medium text-gray-900">
                      {s.num}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <Play className="w-4 h-4" /> Meet the founders
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 3: VALUES / TABS
          ========================================= */}
      <div className="border-b border-gray-100 py-16 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: tabs */}
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                Our values
              </div>
              <h2 className="text-3xl font-medium tracking-tight mb-4">
                What we stand for
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                We believe restaurant technology should get out of the way and
                let your team focus on the food and the guest.
              </p>

              {/* Tab buttons */}
              <div className="inline-flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-xl mb-6">
                {[
                  { key: "reliability", label: "Reliability" },
                  { key: "simplicity", label: "Simplicity" },
                  { key: "growth", label: "Growth" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.key
                        ? "bg-white text-gray-900 border border-gray-100 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="min-h-[120px]">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  {tabContent[activeTab].title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {tabContent[activeTab].body}
                </p>
              </div>
            </div>

            {/* Right: feature list card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="text-xs text-gray-400 mb-4">
                Platform highlights
              </div>

              {[
                {
                  icon: <UtensilsCrossed className="w-4 h-4" />,
                  title: "Kitchen display system",
                  desc: "Real-time ticket management with course routing",
                },
                {
                  icon: <Calendar className="w-4 h-4" />,
                  title: "Reservations & waitlist",
                  desc: "Online booking, SMS reminders, auto-waitlist",
                },
                {
                  icon: <BarChart2 className="w-4 h-4" />,
                  title: "Revenue analytics",
                  desc: "Sales by hour, menu mix, staff performance",
                },
                {
                  icon: <Package className="w-4 h-4" />,
                  title: "Inventory management",
                  desc: "Automatic deduction, low-stock alerts, ordering",
                },
                {
                  icon: <Users className="w-4 h-4" />,
                  title: "Staff scheduling",
                  desc: "Shift planning, clock-in/out, labor cost tracking",
                },
              ].map((feature, i, arr) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 py-3 ${
                    i < arr.length - 1 ? "border-b border-gray-50" : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center flex-shrink-0 text-gray-700">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-0.5">
                      {feature.title}
                    </div>
                    <div className="text-xs text-gray-500">{feature.desc}</div>
                  </div>
                </div>
              ))}

              {/* Founder strip */}
              {/* <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="/src/assets/ceo2.png"
                      alt="MD Sagor"
                      className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        MD Sagor
                      </div>
                      <div className="text-xs text-gray-400">Founder & CEO</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                    Active
                  </span>
                </div>
                <p className="text-xs text-gray-400 italic">
                  "We want every independent restaurant to have the same
                  technology edge as the big chains — without the enterprise
                  price tag."
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 4: FOUNDER / CEO
          ========================================= */}
      <div className="border-b border-gray-100 py-16 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Photo with floating badge */}
            <div className="relative">
              <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100">
                <img
                  src="/src/assets/ceo2.png"
                  alt="MD Sagor — Founder & CEO"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Floating name card bottom-left */}
              <div className="absolute -bottom-6 -left-4 lg:-left-10 bg-white border border-gray-100 rounded-2xl p-5 shadow-lg min-w-[220px]">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-50">
                  <span className="text-xs font-medium text-gray-400">
                    Founder & CEO
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse inline-block" />
                    Active
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/src/assets/ceo2.png"
                    alt="MD Sagor"
                    className="w-10 h-10 rounded-full object-cover border border-gray-100 flex-shrink-0"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      MD Sagor
                    </div>
                    <div className="text-xs text-gray-400">Kabar Dabar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text content */}
            <div className="pt-6 lg:pt-0">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                Meet the founder
              </div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 mb-2">
                MD Sagor
              </h2>
              <div className="inline-flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full mb-6">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                Founder & CEO, Kabar Dabar
              </div>

              {/* Quote block */}
              <div className="relative mb-8">
                <div className="absolute -left-1 top-0 bottom-0 w-0.5 bg-emerald-400 rounded-full" />
                <blockquote className="pl-5 text-xl font-medium text-gray-900 leading-relaxed italic">
                  "We want every independent restaurant to have the same
                  technology edge as the big chains — without the enterprise
                  price tag."
                </blockquote>
              </div>

              <p className="text-gray-500 leading-relaxed mb-8">
                MD Sagor founded Kabar Dabar after spending years running
                restaurants and experiencing first-hand how fragmented,
                expensive software was holding independent operators back. His
                mission: give every restaurateur — from a single café to a
                multi-location brand — the tools they need to compete, grow, and
                thrive.
              </p>

              {/* Divider stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                {[
                  { num: "1+", label: "Years in hospitality" },
                  { num: "3", label: "Restaurants founded" },
                  { num: "2026", label: "Kabar Dabar started" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-medium text-gray-900">
                      {s.num}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 4: CTA
          ========================================= */}
      <div className="py-20 px-4 lg:px-8 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900 mb-3">
            Ready to scale your restaurant startup?
          </h2>

          <p className="text-gray-500 leading-relaxed mb-8">
            Join 500+ growing restaurants using Kabar Dabar to simplify orders,
            manage operations, reduce waste, and increase daily revenue.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-black transition-colors"
            >
              Start your free trial <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Book a demo
            </Link>
          </div>

          {/* Trust pills */}
          {/* <div className="flex flex-wrap gap-3 justify-center">
            {["No setup cost", "14-day free trial", "Cancel anytime"].map(
              (text, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-600 border border-gray-100 rounded-full px-3 py-1.5 bg-white"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {text}
                </div>
              ),
            )}
          </div> */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
