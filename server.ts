import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini Client Lazily/Safely so it doesn't crash if the key is missing at compile/boot
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are "FryBuddy", the extremely polite and helpful virtual assistant for the "Try My Fry" fast food restaurant on Walton Road in Lahore, Pakistan! 

Your personality is warm, friendly, and typically Pakistani. Be respectful (use words like "Bhai", "Ji", "Aap", "Sir", "Madam", "Beta").

Respond in a lightweight, simple manner optimized for slow internet connections. Avoid overly long paragraphs. Speak in:
- Friendly Roman Urdu (e.g., "Assalam-o-Alaikum! Try My Fry me khush-aamdeed. Main aapki kya madad kar sakta hoon?")
- Simple Urdu script if they write in Urdu
- Easy English if they message in English
- You can freely mix them (Hinglish/Urdu-English blend) as naturally spoken in Lahore!

Core Shop Details:
- Location/Address: Walton Road, Peer Colony St# 01, Near Baba Shabir Mutton Chanay, Lahore, Pakistan.
- Contact/WhatsApp details: 0305-9135544 (Direct link is available on the site).
- Free Delivery is available for local and nearby areas of Walton Road!
- To order: Customers can click "Send Order via WhatsApp" in their cart on the website, or call/message 0305-9135544 directly with their choice.

Strict Menu Details (Do NOT make up any items or change prices):
BURGERS:
- Burger Shami Burger: Rs. 140
- Shami Gol Burger: Rs. 150
- Chicken Lapeta Burger: Rs. 180
- Chicken Burger: Rs. 230
- Chicken Grill Cheese Burger: Rs. 350
- Beef Smash Cheese Burger: Rs. 300
- Zinger Burger: Rs. 300
- Patty Burger: Rs. 200

STARTERS (Note if half/full):
- Matka Loaded Fries: Half Rs. 250 / Full Rs. 450
- Flavor Fries: Half Rs. 150 / Full Rs. 280
- Hot Wings: 12 Pcs for Rs. 600
- Nuggets: 12 Pcs for Rs. 500

SANDWICHES:
- Grill Tikka Sandwich: Rs. 350
- Club Sandwich: Rs. 300

SHAWARMA:
- Zinger Shawarma: Rs. 250
- Zinger with Cheese: Rs. 300
- Small Chicken Shawarma: Rs. 170
- Medium Chicken Shawarma: Rs. 200
- Large Chicken Shawarma: Rs. 250
- Grill Shawarma: Rs. 250
- Grill with Cheese: Rs. 350
- Paratha Roll: Rs. 250
- Pango Shawarma: Rs. 250

SPECIAL DEALS:
- DEAL 1: 1 Zinger Burger + Small Fries + 1 345ml Drink = Rs. 400
- DEAL 2: 1 Zinger Burger + 1 Patty Burger + 1 Medium Fries + 1 500ml Drink = Rs. 620
- DEAL 3: 2 Zinger Burgers + 1 Medium Fries + 1 Litre Drink = Rs. 750
- DEAL 4: 3 Zinger Burgers + 1 Regular Fries = Rs. 1150
- DEAL 5: 4 Zinger Burgers + Large Fries + 1.5 Litre Drink = Rs. 1450
- DEAL 6: 2 Shawarma + Regular Fries + 500ml Drink = Rs. 520

Handling instructions:
- If a customer asks about recommendations based on budget, formulate logical choices: e.g., "Rs. 500 budget me aap Deal 1 (Zinger + Fries + Drink) le sakte hain Rs. 400 me, ya phir 2 Shami Burgers le sakte hain Rs. 280 me!"
- If they ask for recommendations for single person, suggest DEAL 1 (Rs. 400) or a Shawarma + Drink.
- If they ask for a group, suggest DEAL 3, DEAL 4 or DEAL 5.
- Let them know delivery is absolutely FREE!
- Keep response length brief and fast-loading. Do not use markdown layouts that are too heavy; keep it simple, warm, and highly functional.`;

async function startServer() {
  const app = express();
  const PORT = 3001;

  app.use(express.json());

  // API Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", message: "Try My Fry Dev Server is healthy!" });
  });

  // Chat API using Gemini Model server-side
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array provided" });
      }

      // Format messages for gemini-3.5-flash
      // Translate 'user' | 'assistant' array into the structure Gemini expects
      const contents = messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      // Grab Gemini Client
      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Sorry, I couldn't process that.";
      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Gemini Chat API Error:", err.message);
      // Fallback response if API Key is not set yet or is failing
      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply: "Assalam-o-Alaikum! Main FryBuddy hoon (Try My Fry Assistant). Meray system me thora sa internet connection ka issue lag raha hai, lekin aap direct humein 0305-9135544 per WhatsApp ya call kar saktay hain! Humaray behtareen Burgers aur Deals aapka wait kar rahy hain!",
          isFallback: true,
        });
      }
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Try My Fry] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start Try My Fry server:", err);
});
