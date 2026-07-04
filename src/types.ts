export interface MenuItem {
  id: string;
  name: string;
  price: number;
  halfPrice?: number; // Some starter/fries items have Half and Full options
  fullPrice?: number;
  category: "burger" | "starter" | "sandwich" | "shawarma";
  description?: string;
  quantityLabel?: string; // e.g. "12 Pcs"
}

export interface Deal {
  id: string;
  dealNumber: number;
  name: string;
  price: number;
  items: string[];
}

export interface CartItem {
  id: string; // Dynamic ID, e.g. "item-zinger-burger" or "deal-3" or "starter-loaded-half"
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  itemType: "individual" | "deal";
  sizeLabel?: "Half" | "Full" | "";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
