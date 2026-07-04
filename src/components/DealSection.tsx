import React from "react";
import { Deal, CartItem } from "../types";
import { SPECIAL_DEALS } from "../data/menu";
import { Plus, Flame, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface DealSectionProps {
  onAddToBag: (item: CartItem) => void;
}

export default function DealSection({ onAddToBag }: DealSectionProps) {
  const handleAddDeal = (deal: Deal) => {
    onAddToBag({
      id: `deal-${deal.id}`,
      name: `${deal.name} (${deal.items[0]} + More)`,
      price: deal.price,
      quantity: 1,
      itemType: "deal",
      sizeLabel: "",
    });
  };

  return (
    <div id="deals-section" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b-4 border-dashed border-red-200 pb-5">
        <div>
          <h2 className="text-3xl font-black text-stone-950 uppercase tracking-tighter flex items-center gap-2">
            <span className="bg-red-700 text-yellow-300 text-xs uppercase px-2.5 py-1 rounded font-black tracking-wider animate-pulse flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" /> SPECIAL SAVINGS
            </span>
            Try My Fry Dhamaka Deals!
          </h2>
          <p className="text-sm text-stone-600 mt-1.5 font-bold">
            Super savings on your favorite Zinger Burgers, Shawarmas, Fries and Chilled Drinks!
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-red-700 bg-red-50 px-3.5 py-1.5 rounded-full border-2 border-red-200 self-start md:self-auto uppercase tracking-wide">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
          FREE HOME DELIVERY (BILKUL MUFT)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPECIAL_DEALS.map((deal, idx) => {
          return (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative bg-white border-3 border-red-700 rounded-2xl shadow-bold-red hover:shadow-bold-black transition-all flex flex-col overflow-hidden group"
            >
              {/* Header Tab with Deal Number */}
              <div className="bg-red-700 text-yellow-300 px-4 py-2.5 font-black text-center tracking-wider text-base uppercase flex items-center justify-center gap-1.5 border-b-2 border-red-900">
                <Sparkles className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                {deal.name}
              </div>

              {/* Deal Items Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <ul className="space-y-2">
                    {deal.items.map((item, idy) => (
                      <li
                        key={idy}
                        className="flex items-center gap-2.5 text-stone-800 font-bold text-sm bg-stone-50 px-3 py-1.5 rounded-md border border-stone-200"
                      >
                        <span className="w-2 h-2 rounded-full bg-red-700"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Ribbon and Add-to-Bag Button */}
                <div className="mt-5 pt-4 border-t-2 border-dashed border-stone-100 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black text-stone-500 tracking-wider">
                      Special Rate
                    </span>
                    <div className="bg-yellow-400 text-red-950 px-3 py-1 text-xl font-black rounded-lg border-2 border-red-700 inline-block shadow-[2px_2px_0px_0px_rgba(185,28,28,1)] tracking-wide mt-0.5">
                      Rs. {deal.price}/-
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddDeal(deal)}
                    id={`add-deal-${deal.dealNumber}`}
                    className="cursor-pointer bg-red-700 text-white hover:bg-red-800 font-extrabold px-4 py-3 rounded-xl border-2 border-red-900 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all text-sm shadow-[2px_2px_0px_0px_rgba(250,204,21,1)]"
                  >
                    <Plus className="w-4 h-4" /> ADD DEAL
                  </button>
                </div>
              </div>

              {/* Scooter/Delivery Indicator badge in corner */}
              <div className="absolute top-1.5 right-2 bg-yellow-400 text-red-950 border-2 border-red-900 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-[1.5px_1.5px_0px_0px_rgba(185,28,28,1)]">
                FREE DELIVERY
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
