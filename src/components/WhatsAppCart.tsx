import React, { useState } from "react";
import { CartItem } from "../types";
import { ShoppingBag, X, Trash2, MessageSquare, User, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WhatsAppCartProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, amount: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function WhatsAppCart({
  cartItems,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: WhatsAppCartProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [userErrors, setUserErrors] = useState<{ name?: string; address?: string }>({});

  const totalBill = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset validation errors
    const errors: { name?: string; address?: string } = {};
    if (!customerName.trim()) {
      errors.name = "Aapka naam zaroori hai (Name is required)";
    }
    if (!customerAddress.trim()) {
      errors.address = "Delivery address zaroori hai (Address is required)";
    }

    if (Object.keys(errors).length > 0) {
      setUserErrors(errors);
      return;
    }

    setUserErrors({});

    // Create a beautifully formatted Pakistani Urdu/English WhatsApp text block
    const itemsHeader = `🍔 *TRY MY FRY - NEW ORDER* 🛵\n`;
    const divider = `-----------------------------------\n`;
    const customerBlock = `👤 *Customer Name:* ${customerName.trim()}\n📍 *Address:* ${customerAddress.trim()}\n`;
    
    let itemsBlock = `🛒 *ITEMS ORDERED:*\n`;
    cartItems.forEach((item) => {
      const sizeStr = item.sizeLabel ? ` [${item.sizeLabel}]` : "";
      itemsBlock += `• ${item.quantity}x ${item.name}${sizeStr} (Rs. ${item.price} each) = *Rs. ${item.price * item.quantity}*\n`;
    });

    const billBlock = `\n💵 *Total Bill:* Rs. ${totalBill}/-\n🛵 *Delivery:* FREE DELIVERY (Balke Muft!) 🎉\n`;
    const footerBlock = `\n_Placed via Try My Fry mobile site_`;

    const fullMessage = itemsHeader + divider + customerBlock + divider + itemsBlock + divider + billBlock + divider + footerBlock;
    
    // Clean target WhatsApp: 0305-9135544
    // Standard international: 923059135544
    const whatsappUrl = `https://wa.me/923059135544?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          ></motion.div>

          {/* Cart Sidebar Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-white border-l-3 border-red-700 z-50 shadow-[0_0_24px_rgba(0,0,0,0.3)] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-red-700 border-b-3 border-red-950 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-yellow-300 stroke-[2.5]" />
                <h3 className="font-extrabold text-white text-lg uppercase tracking-tight">Aapka Cart</h3>
                <span className="bg-yellow-400 text-red-950 text-[11px] font-black px-2 py-0.5 rounded border border-red-900 shadow-[1px_1px_0px_0px_rgba(185,28,28,1)]">
                  {cartItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="cursor-pointer p-1.5 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-white stroke-[3]" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto border border-red-200">
                    <ShoppingBag className="w-7 h-7 text-red-700" />
                  </div>
                  <div>
                    <p className="font-extrabold text-stone-800 uppercase">Aapka cart khali hai</p>
                    <p className="text-xs text-stone-500 mt-1 max-w-[200px] mx-auto font-bold">
                      Menu se behtareen burgers aur deals shamil karein!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                    <span className="text-xs font-black text-stone-500 uppercase tracking-widest">Selected Items</span>
                    <button
                      onClick={onClearCart}
                      className="cursor-pointer text-xs font-black text-red-700 hover:text-red-850 flex items-center gap-1 uppercase"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear All
                    </button>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#FFFDF4] border border-red-100 p-3 rounded-xl flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-sm text-stone-900 leading-tight uppercase">
                            {item.name}
                          </h4>
                          {item.sizeLabel && (
                            <span className="bg-yellow-400 text-red-900 text-[9px] font-black px-1.5 py-0.5 rounded border border-red-900 font-sans">
                              {item.sizeLabel.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-black text-red-700 mt-1">
                          Rs. {item.price}/-
                        </p>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-1 bg-white border border-stone-300 rounded-lg p-1 shadow-sm shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="cursor-pointer w-6 h-6 flex items-center justify-center font-black text-stone-500 hover:text-red-700 hover:bg-stone-100 rounded text-sm"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-black text-stone-800 text-wrap text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="cursor-pointer w-6 h-6 flex items-center justify-center font-black text-stone-500 hover:text-green-700 hover:bg-stone-100 rounded text-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="cursor-pointer p-1 text-stone-400 hover:text-red-700 transition-all shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Order form fields on slow lines, always keep it simplified */}
              {cartItems.length > 0 && (
                <div className="pt-4 border-t-2 border-dashed border-stone-200 mt-6 space-y-4">
                  <span className="text-xs font-black text-stone-500 uppercase tracking-widest block">Delivery Details</span>
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-red-700" /> AAPKA NAAM (CUSTOMER NAME)
                    </label>
                    <input
                      type="text"
                      className={`w-full text-xs font-bold p-2.5 rounded-lg border-2 border-stone-200 focus:outline-none ${
                        userErrors.name ? "border-red-500" : "focus:border-red-800"
                      }`}
                      placeholder="e.g. Akbar, Sohail"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    {userErrors.name && (
                      <p className="text-[10px] text-red-500 font-extrabold">{userErrors.name}</p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-700" /> MUKAMAL PATA (DELIVERY ADDRESS)
                    </label>
                    <textarea
                      rows={2}
                      className={`w-full text-xs font-bold p-2.5 rounded-lg border-2 border-stone-200 focus:outline-none ${
                        userErrors.address ? "border-red-500" : "focus:border-red-800"
                      }`}
                      placeholder="e.g. House No 42, Gali No 2, Peer Colony, Walton Road"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                    />
                    {userErrors.address && (
                      <p className="text-[10px] text-red-500 font-extrabold">{userErrors.address}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Panel containing Calculations & WhatsApp button */}
            <div className="bg-stone-50 border-t-2 border-red-700 p-4 space-y-4 shrink-0">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-stone-500 uppercase tracking-tight">
                  <span>Subtotal</span>
                  <span className="font-mono">Rs. {totalBill}/-</span>
                </div>
                <div className="flex justify-between items-center text-xs font-black text-green-700 uppercase tracking-tight">
                  <span>Delivery Charges</span>
                  <span>PREMIUM FREE (Muft)</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-stone-200">
                  <span className="font-extrabold text-sm text-stone-900 uppercase">Total payable</span>
                  <span className="font-black text-xl text-red-800 font-mono">Rs. {totalBill}/-</span>
                </div>
              </div>

              {cartItems.length > 0 ? (
                <button
                  onClick={handlePlaceOrder}
                  className="cursor-pointer w-full bg-[#25D366] hover:bg-[#20ba56] text-white py-3 px-4 border-2 border-red-900 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-[3px_3px_0px_0px_rgba(185,28,28,1)] active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" /> Send Order via WhatsApp
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-stone-200 text-stone-400 py-3 px-4 rounded-xl font-black text-xs border border-stone-300 cursor-not-allowed flex items-center justify-center gap-2 uppercase"
                >
                  Cart Is Empty (Add items to order!)
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
