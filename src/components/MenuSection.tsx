import React, { useState, useMemo } from "react";
import { MenuItem, CartItem } from "../types";
import { MENU_ITEMS } from "../data/menu";
import { Search, Plus, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MenuSectionProps {
  onAddToBag: (item: CartItem) => void;
}

type FoodCategoryFilter = "all" | "burger" | "shawarma" | "sandwich" | "starter";

export default function MenuSection({ onAddToBag }: MenuSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FoodCategoryFilter>("all");

  // Keep track of user's size selections (Half or Full) for Fries/Starters
  const [friesSizes, setFriesSizes] = useState<Record<string, "Half" | "Full">>({
    "starter-loaded-fries": "Half",
    "starter-flavor-fries": "Half",
  });

  const handleSizeChange = (itemId: string, size: "Half" | "Full") => {
    setFriesSizes((prev) => ({
      ...prev,
      [itemId]: size,
    }));
  };

  // Perform highly-optimized client-side filtering (Zero network overhead, perfect for slow connections)
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleAddItem = (item: MenuItem) => {
    // Determine the price based on size selection if applicable
    let price = item.price;
    let sizeLabel: "Half" | "Full" | "" = "";

    if (item.halfPrice && item.fullPrice) {
      const sizeSelected = friesSizes[item.id] || "Half";
      price = sizeSelected === "Half" ? item.halfPrice : item.fullPrice;
      sizeLabel = sizeSelected;
    }

    onAddToBag({
      id: item.id + (sizeLabel ? `-${sizeLabel.toLowerCase()}` : ""),
      name: item.name,
      price: price,
      quantity: 1,
      itemType: "individual",
      sizeLabel: sizeLabel,
    });
  };

  const categories = [
    { value: "all", label: "📋 Sub Kuch" },
    { value: "burger", label: "🍔 Burgers" },
    { value: "shawarma", label: "🌯 Shawarma" },
    { value: "sandwich", label: "🥪 Sandwiches" },
    { value: "starter", label: "🍟 Fries & Bites" },
  ];

  return (
    <div id="menu-section" className="space-y-6">
      {/* Search and Filters Strip */}
      <div className="bg-white rounded-2xl border-3 border-red-700 p-4 md:p-6 shadow-bold-red space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="SEARCH ITEMS INSTANTLY..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs placeholder:text-stone-400 rounded-xl border-2 border-stone-200 pl-10 pr-4 py-3 focus:outline-none focus:border-red-700 font-black uppercase tracking-wider transition-all text-stone-800"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-red-700 hover:text-red-800 cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Quick suggestion indicator to help slow networks */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-red-700 font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            Fresh & cooked live to order!
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 pb-1 overflow-x-auto scrollbar-thin">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value as FoodCategoryFilter)}
                className={`cursor-pointer whitespace-nowrap px-4 py-2.5 rounded-xl font-black text-xs md:text-sm tracking-wide transition-all border-2 ${
                  isSelected
                    ? "bg-red-700 text-white border-red-900 shadow-bold-red"
                    : "bg-stone-50 text-stone-800 border-stone-200 hover:border-red-700"
                }`}
              >
                {cat.label.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Display */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-2xl border-4 border-dashed border-red-200">
          <p className="font-black text-red-900 text-lg uppercase">Koi item nahi mila (No items found)</p>
          <p className="text-sm text-stone-500 mt-1 font-bold">Kuch aur search karnay ki koshish karein!</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="cursor-pointer mt-4 bg-red-700 text-white hover:bg-red-800 px-4 py-2.5 rounded-lg border-2 border-red-900 font-black text-xs uppercase shadow-bold-red"
          >
            Show All Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const hasSizes = item.halfPrice !== undefined && item.fullPrice !== undefined;
              const selectedSize = friesSizes[item.id] || "Half";
              const displayPrice = hasSizes
                ? selectedSize === "Half"
                  ? item.halfPrice
                  : item.fullPrice
                : item.price;

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border-2 border-red-700 rounded-2xl shadow-bold-red p-5 flex flex-col justify-between hover:shadow-bold-black transition-all"
                >
                  <div>
                    {/* Header: Name and Quantity/Badge */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-extrabold text-base text-stone-900 tracking-tight uppercase">
                        {item.name}
                      </h3>
                      {item.quantityLabel && (
                        <span className="bg-yellow-400 text-red-950 border-2 border-red-900 font-black text-[10px] px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_rgba(185,28,28,1)] shrink-0">
                          {item.quantityLabel.toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-stone-500 font-bold mt-1.5 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Half/Full Segmented Control (Only for loaded/flavored fries) */}
                    {hasSizes && (
                      <div className="mt-3.5 flex items-center gap-2 bg-stone-50 p-1 rounded-lg border border-stone-200">
                        <button
                          onClick={() => handleSizeChange(item.id, "Half")}
                          className={`cursor-pointer flex-1 text-[11px] font-black py-1 rounded transition-all ${
                            selectedSize === "Half"
                              ? "bg-yellow-400 text-red-950 shadow-sm border border-red-700"
                              : "text-stone-500 hover:text-stone-800"
                          }`}
                        >
                          Half (Rs. {item.halfPrice})
                        </button>
                        <button
                          onClick={() => handleSizeChange(item.id, "Full")}
                          className={`cursor-pointer flex-1 text-[11px] font-black py-1 rounded transition-all ${
                            selectedSize === "Full"
                              ? "bg-yellow-400 text-red-950 shadow-sm border border-red-700"
                              : "text-stone-500 hover:text-stone-800"
                          }`}
                        >
                          Full (Rs. {item.fullPrice})
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action Row */}
                  <div className="mt-5 pt-3.5 border-t border-dashed border-stone-200 flex items-center justify-between gap-2">
                    <div className="text-xl font-black text-red-700 font-mono">
                      Rs. {displayPrice}/-
                    </div>

                    <button
                      onClick={() => handleAddItem(item)}
                      id={`add-item-${item.id}`}
                      className="cursor-pointer bg-red-700 text-white hover:bg-red-800 px-3.5 py-2 rounded-lg border-2 border-red-900 font-black text-xs flex items-center gap-1 transition-all hover:scale-105 active:scale-95 shadow-[2px_2px_0px_0px_rgba(250,204,21,1)]"
                    >
                      <Plus className="w-3.5 h-3.5" /> ADD TO BAG
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
