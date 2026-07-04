import React, { useState, useEffect } from "react";
import { CartItem } from "./types";
import DealSection from "./components/DealSection";
import MenuSection from "./components/MenuSection";
import ContactSection from "./components/ContactSection";
import FryBuddyChat from "./components/FryBuddyChat";
import WhatsAppCart from "./components/WhatsAppCart";
import {
  ShoppingBag,
  MessageSquare,
  ChevronRight,
  UtensilsCrossed,
  Bot
} from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<"deals" | "menu" | "contact" | "chat">("deals");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load custom cart state from native browser storage (extremely robust for dropped mobile cells)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("try-my-fry-cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Local storage cart fetch error:", e);
    }
  }, []);

  // Sync cart to local storage whenever it changes
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem("try-my-fry-cart", JSON.stringify(updatedCart));
    } catch (e) {
      console.error("Local storage cart sync error:", e);
    }
  };

  const handleAddToBag = (newItem: CartItem) => {
    const existingIndex = cart.findIndex((i) => i.id === newItem.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCartToStorage(updated);
    } else {
      saveCartToStorage([...cart, newItem]);
    }
    // Automatically trigger cart preview to assist quick Checkout
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, amount: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCartToStorage(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCartToStorage(updated);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const tabs = [
    { id: "deals", label: "🔥 DHAMAKA DEALS", emoji: "⚡" },
    { id: "menu", label: "🍔 FULL MENU", emoji: "😋" },
    { id: "chat", label: "💬 CHAT ASSISTANT", emoji: "🤖" },
    { id: "contact", label: "📍 ADDRESS & CONTACT", emoji: "📞" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#FFF8EB] pb-28 font-sans text-stone-900 border-8 border-red-700 selection:bg-yellow-400 selection:text-red-900">
      
      {/* Dynamic top ticker block to showcase free delivery */}
      <div className="bg-red-800 text-yellow-300 py-2.5 px-4 text-center font-display font-black text-xs md:text-sm tracking-wider flex items-center justify-center gap-1.5 overflow-hidden md:justify-center border-b-2 border-red-950">
        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
        🛵 FREE DELIVERY (HUMEIN CHAHIYE AAPKI KHUSHHALI!) ACROSS PEER COLONY, WALTON ROAD & SURROUNDINGS!
        <span className="hidden md:inline"> | CRISPER, HOTTER, FASTER! 🍟</span>
      </div>

      {/* Main Branding Header Section */}
      <header className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <div className="bg-red-700 text-white border-4 border-red-900 p-6 rounded-2xl md:rounded-3xl shadow-bold-red relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

          {/* Left Block: Logo, tagline, and details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="bg-yellow-400 text-red-900 p-2.5 rounded-xl border-2 border-red-900 rotate-[-3deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black">
                <UtensilsCrossed className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white uppercase flex items-center leading-none">
                  TRY MY <span className="text-yellow-400 ml-1.5">FRY</span>
                </h1>
                <p className="text-[10px] font-black uppercase text-yellow-300 tracking-widest mt-1">
                  Taste the Real Street Crunch 🌟
                </p>
              </div>
            </div>

            <p className="text-sm font-bold text-red-50 max-w-md mt-4 leading-snug">
               Lahore's ultimate street joint for super-crisp Zinger Burgers, Loaded Fries, mouthwatering Shawarmas, and Paratha Rolls!
            </p>
          </div>

          {/* Right Block: Instant action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 w-full md:w-auto">
            <a
              href="https://wa.me/923059135544"
              target="_blank"
              rel="noreferrer referrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white px-5 py-3 border-2 border-black rounded-xl font-black text-sm transition-all text-center hover:scale-105 active:scale-95 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <MessageSquare className="w-4 h-4 fill-white" /> 0305-9135544
            </a>
            <button
              onClick={() => setActiveTab("chat")}
              className="cursor-pointer flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-red-950 px-5 py-3 border-2 border-red-900 rounded-xl font-black text-sm transition-all text-center hover:scale-105 active:scale-95 shadow-[3px_3px_0px_0px_rgba(185,28,28,1)]"
            >
              <Bot className="w-4 h-4 text-red-900 fill-red-900" /> AI CHAT ROOM
            </button>
          </div>
        </div>

        {/* Quick horizontal specifications strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-5">
          <div className="bg-white border-2 border-red-700 p-4 rounded-xl text-center shadow-bold-red space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-red-700 block tracking-wider">Address</span>
            <span className="text-[12px] font-black text-stone-900 line-clamp-1" title="Walton Road Peer Colony, Lahore">
              Walton Road, Peer Colony St#1
            </span>
          </div>
          <div className="bg-white border-2 border-red-700 p-4 rounded-xl text-center shadow-bold-red space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-red-700 block tracking-wider">Timings</span>
            <span className="text-[12px] font-black text-stone-900 line-clamp-1">
              3:00 PM to 2:30 AM Daily
            </span>
          </div>
          <div className="bg-white border-2 border-red-700 p-4 rounded-xl text-center shadow-bold-red space-y-0.5 col-span-1">
            <span className="text-[10px] uppercase font-bold text-red-700 block tracking-wider">Delivery Fees</span>
            <span className="text-[12px] font-black text-red-700 line-clamp-1">
              🎉 Absolutely FREE
            </span>
          </div>
          <div className="bg-white border-2 border-red-700 p-4 rounded-xl text-center shadow-bold-red col-span-1 flex items-center justify-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <span className="text-[11px] font-black text-red-700 uppercase tracking-tight">Active & Taking Orders</span>
          </div>
        </div>
      </header>

      {/* Navigation Tab Bar wrapper */}
      <nav className="max-w-6xl mx-auto px-4 mt-6">
        <div className="bg-white border-2 border-red-700 p-2.5 rounded-xl md:rounded-2xl shadow-bold-red flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer flex-1 py-3 px-4 rounded-xl font-display font-black text-xs md:text-sm tracking-wide transition-all uppercase whitespace-nowrap flex items-center justify-center gap-1 ${
                  isActive
                    ? "bg-red-700 text-white border-2 border-red-900 shadow-bold-red scale-[1.02]"
                    : "text-stone-600 hover:text-red-700 hover:bg-stone-50 border-2 border-transparent"
                }`}
              >
                <span className="text-sm md:text-base mr-1">{tab.emoji}</span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 mt-8 flex-1">
        <div className="min-h-[460px]">
          {activeTab === "deals" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <DealSection onAddToBag={handleAddToBag} />
            </motion.div>
          )}

          {activeTab === "menu" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MenuSection onAddToBag={handleAddToBag} />
            </motion.div>
          )}

          {activeTab === "chat" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-xl mx-auto"
            >
              <FryBuddyChat />
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ContactSection />
            </motion.div>
          )}
        </div>
      </main>

      {/* Floating Bottom Toolbar / Basket Tracker Badge */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t-4 border-red-700 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-400 text-red-900 border-2 border-red-900 rounded-full font-black text-[10px] flex items-center justify-center shadow-md animate-bounce">
                {totalItemsCount}
              </span>
              <button
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer bg-red-700 border-2 border-red-950 p-3 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-bold-red"
              >
                <ShoppingBag className="w-5 h-5 text-white stroke-[2.5]" />
              </button>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-tight">Total Bill</p>
              <p className="text-base font-black text-red-700 font-mono">
                Rs. {totalCartValue}/-
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="cursor-pointer bg-red-700 border-2 border-red-900 hover:bg-red-800 text-white px-5 py-3 rounded-xl font-black text-xs md:text-sm shadow-bold-red flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
            >
              CART DEKHEIN <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Shopping Bag slide out Sidebar overlay */}
      <WhatsAppCart
        cartItems={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
