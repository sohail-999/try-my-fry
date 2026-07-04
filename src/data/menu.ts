import { MenuItem, Deal } from "../types";

export const MENU_ITEMS: MenuItem[] = [
  // burgers
  {
    id: "burger-shami",
    name: "Burger Shami Burger",
    price: 140,
    category: "burger",
    description: "Traditional beef & chickpea shami patty with special spices, layered with egg, mint chutney, and raw onions in a soft bun.",
  },
  {
    id: "burger-shami-gol",
    name: "Shami Gol Burger",
    price: 150,
    category: "burger",
    description: "Spiced circular beef shami kebab seared golden-brown, served with thick garlic-mayo and crunchy vegetable slaw.",
  },
  {
    id: "burger-chicken-lapeta",
    name: "Chicken Lapeta Burger",
    price: 180,
    category: "burger",
    description: "Pakistani street food classic! Deeply seasoned chicken patty cooked and rolled/wrapped in a fresh fried egg shell.",
  },
  {
    id: "burger-chicken",
    name: "Chicken Burger",
    price: 230,
    category: "burger",
    description: "Tender, seasoned seasoned minced chicken patty cooked on tawa, layered with custom garlic sauce and crisp ice lettuce.",
  },
  {
    id: "burger-chicken-grill-cheese",
    name: "Chicken Grill Cheese Burger",
    price: 350,
    category: "burger",
    description: "Flame-grilled succulent chicken breast piece, topped with a thick slice of hot melted cheese with signature BBQ mayo.",
  },
  {
    id: "burger-beef-smash",
    name: "Beef Smash Cheese Burger",
    price: 300,
    category: "burger",
    description: "High-grade seared smashed beef patty, customized house sauce, melted cheese slice, and caramelized onions on toasted sesame bun.",
  },
  {
    id: "burger-zinger",
    name: "Zinger Burger",
    price: 300,
    category: "burger",
    description: "Ultra-crispy double-dredged golden fried chicken thigh fillet, topped with cool shredded lettuce and zesty zinger cream.",
  },
  {
    id: "burger-patty",
    name: "Patty Burger",
    price: 200,
    category: "burger",
    description: "Crisp-fried seasoned chicken patty burger layered with rich garlic-chili fusion sauce and green pickles.",
  },

  // starters
  {
    id: "starter-loaded-fries",
    name: "Matka Loaded Fries",
    price: 250, // default half
    halfPrice: 250,
    fullPrice: 450,
    category: "starter",
    description: "Freshly cut crispy potato fries baked in a traditional clay pot (Matka), packed with chicken chunks, molten hot mozzarella, and chili-garlic mayo.",
  },
  {
    id: "starter-flavor-fries",
    name: "Flavor Fries",
    price: 150, // default half
    halfPrice: 150,
    fullPrice: 280,
    category: "starter",
    description: "Golden fries seasoned generously with your choice of flavor dustings (Chipotle Heat, Garlic Butter, or Chatpata Masala).",
  },
  {
    id: "starter-hot-wings",
    name: "Hot Wings",
    price: 600,
    category: "starter",
    quantityLabel: "12 Pcs",
    description: "Fiery crisped chicken wings tossed in a traditional spicy coating, served piping hot with custom tandoori dip.",
  },
  {
    id: "starter-nuggets",
    name: "Nuggets",
    price: 500,
    category: "starter",
    quantityLabel: "12 Pcs",
    description: "Delightfully crunchy, light gold snackable chicken nuggets made with 100% white breast meat, served with soft mayo.",
  },

  // sandwiches
  {
    id: "sandwich-grill-tikka",
    name: "Grill Tikka Sandwich",
    price: 350,
    category: "sandwich",
    description: "Spicy fire-grilled chicken tikka shreds, tightly packed into buttered breads with melted cheese and mint-mayo sauce.",
  },
  {
    id: "sandwich-club",
    name: "Club Sandwich",
    price: 300,
    category: "sandwich",
    description: "Triple-decker fresh sandwich filled with pulled chicken, fried egg layer, fresh sliced cucumber, and dynamic sauce layers.",
  },

  // shawarma
  {
    id: "shawarma-zinger",
    name: "Zinger Shawarma",
    price: 250,
    category: "shawarma",
    description: "Spiced crispy-fried zinger chicken strips, rolled inside toasted fluffy pita bread with cabbage slaw and heavy garlic sauce.",
  },
  {
    id: "shawarma-zinger-cheese",
    name: "Zinger with Cheese",
    price: 300,
    category: "shawarma",
    description: "Our signature crispy-fried zinger chicken shawarma wrap loaded with an extra premium slice of melted cheese.",
  },
  {
    id: "shawarma-small-chicken",
    name: "Small Chicken Shawarma",
    price: 170,
    category: "shawarma",
    description: "Classic light pita roll stuffed with tawa grill shredded chicken, tangy vinegar pickles, and white garlic mayo paste.",
  },
  {
    id: "shawarma-medium-chicken",
    name: "Medium Chicken Shawarma",
    price: 200,
    category: "shawarma",
    description: "Perfect standard size shawarma loaded with seasoned chicken, cucumber pickles, and a balanced dressing of classic garlic sauce.",
  },
  {
    id: "shawarma-large-chicken",
    name: "Large Chicken Shawarma",
    price: 250,
    category: "shawarma",
    description: "An extra-loaded heavy-portion chicken shawarma wrap filled to the brim with tawa-grilled chicken tikka boti chunks.",
  },
  {
    id: "shawarma-grill",
    name: "Grill Shawarma",
    price: 250,
    category: "shawarma",
    description: "Wood-smoke seasoned grilled chicken bits rolled in premium tortilla flatbread, topped with a special local hot chili paste.",
  },
  {
    id: "shawarma-grill-cheese",
    name: "Grill with Cheese",
    price: 350,
    category: "shawarma",
    description: "Char-smokey grilled chicken wrap bursting with melty cheese slices and rich local cream chutney.",
  },
  {
    id: "shawarma-paratha-roll",
    name: "Paratha Roll",
    price: 250,
    category: "shawarma",
    description: "A mouth-watering crisp, layered, butter-fried golden paratha wrapped around dry-spiced hot chicken pieces and sweet-sour tamarind chutney.",
  },
  {
    id: "shawarma-pango",
    name: "Pango Shawarma",
    price: 250,
    category: "shawarma",
    description: "Local specialty featuring sweet, tangy, and medium spattered sweet chili sauce blended with hot minced chicken.",
  },
];

export const SPECIAL_DEALS: Deal[] = [
  {
    id: "deal-1",
    dealNumber: 1,
    name: "DEAL 1",
    price: 400,
    items: ["1 Zinger Burger", "Small Fries", "1 345ml Drink"],
  },
  {
    id: "deal-2",
    dealNumber: 2,
    name: "DEAL 2",
    price: 620,
    items: ["1 Zinger Burger", "1 Patty Burger", "1 Medium Fries", "1 500ml Drink"],
  },
  {
    id: "deal-3",
    dealNumber: 3,
    name: "DEAL 3",
    price: 750,
    items: ["2 Zinger Burgers", "1 Medium Fries", "1 Ltr Drink"],
  },
  {
    id: "deal-4",
    dealNumber: 4,
    name: "DEAL 4",
    price: 1150,
    items: ["3 Zinger Burgers", "1 Regular Fries"],
  },
  {
    id: "deal-5",
    dealNumber: 5,
    name: "DEAL 5",
    price: 1450,
    items: ["4 Zinger Burgers", "Large Fries", "1.5 Ltr Drink"],
  },
  {
    id: "deal-6",
    dealNumber: 6,
    name: "DEAL 6",
    price: 520,
    items: ["2 Shawarma", "Regular Fries", "500ml Drink"],
  },
];
