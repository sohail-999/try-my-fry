import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, Bot, Sparkles, MessageSquare, Trash2, ChevronRight, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FryBuddyChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const QUICK_PROMPTS = [
    { text: "Rs. 500 me kya milega? 💵", prompt: "Mera budget Rs. 500 hai. Mujhe kya suggest kar saktay hain?" },
    { text: "Best Zinger deal kaunsi hai? 🍔", prompt: "Zinger Burger ki achi deal bataein jo sasti aur behtareen ho!" },
    { text: "Kya delivery free hai? 🛵", prompt: "Delivery details aur address confirm karein, kya delivery free hai?" },
    { text: "Shop timings kya hain? ⏰", prompt: "Try My Fry shop timings and directions bataein." },
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Welcome message trigger
  const startChatConversation = () => {
    setIsChatStarted(true);
    setMessages([
      {
        id: "msg-welcome",
        role: "assistant",
        content: "Assalam-o-Alaikum, Bhai! Main hoon aapka virtual host *FryBuddy*! 🍟\n\nMain aapki help kar sakta hoon humaray behtareen menu aur dhashu deals ko samajhnay me! Aapka kiya budget hai, ya kaunsa item pasand hai? Mujh se Roman Urdu ya English me kuch bhi poochain!",
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsLoading(true);

    try {
      // Build conversation history logs
      const historyLog = [...messages, userMsg].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyLog }),
      });

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: `buddy-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Sorry, I couldn't understand that. Please try again or WhatsApp us at 0305-9135544!",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      // Nice error-state recovery
      const errorMsg: ChatMessage = {
        id: `buddy-error-${Date.now()}`,
        role: "assistant",
        content: "Bhai lagta hai net thora slow chal raha hai! Lekin ghabrain mat, humari service bilkul ready hai. Aap direct humein WhatsApp call kar saktay hain: *0305-9135544* per! Mujh se koi aur sawal poochein, main connect honay ki koshish kar raha hoon.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
    setIsChatStarted(false);
  };

  if (!isChatStarted) {
    return (
      <div className="bg-white border-3 border-red-700 rounded-2xl p-6 text-center shadow-bold-red space-y-4">
        <div className="w-16 h-16 bg-yellow-400 border-2 border-red-900 rounded-full flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_rgba(185,28,28,1)] animate-bounce">
          <Bot className="w-8 h-8 text-red-950" />
        </div>
        <div>
          <h3 className="font-black text-stone-900 text-lg flex items-center justify-center gap-1.5 uppercase tracking-tight">
            FRYBUDDY CHATBOT <span className="bg-red-800 text-yellow-300 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-red-900">AI ASSISTANT</span>
          </h3>
          <p className="text-xs text-stone-500 font-bold max-w-sm mx-auto mt-1 leading-relaxed">
            Aapka khidmatgar haazir hai! Burgers, deals ke options, ya budget suggestions Roman Urdu me dhar-a-dhar poochain.
          </p>
        </div>
        <button
          onClick={startChatConversation}
          className="cursor-pointer bg-red-700 hover:bg-red-800 text-white px-5 py-3 border-2 border-red-900 rounded-xl font-black text-xs transition-all hover:scale-105 active:scale-95 shadow-[3px_3px_0px_0px_rgba(250,204,21,1)] flex items-center gap-2 mx-auto"
        >
          <MessageSquare className="w-4 h-4 fill-white" /> START AI CHAT ROOM
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border-3 border-red-700 rounded-2xl shadow-bold-red flex flex-col transition-all overflow-hidden ${
        isMinimized ? "h-16" : "h-[480px]"
      }`}
    >
      {/* Bot Chat Header */}
      <div className="bg-red-700 text-white border-b-3 border-red-950 p-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-red-900 flex items-center justify-center shadow-sm shrink-0">
            <Bot className="w-4 h-4 text-red-950" />
          </div>
          <div>
            <h3 className="font-black text-sm text-white leading-tight flex items-center gap-1.5 uppercase">
              FryBuddy AI Assistant
              <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></span>
            </h3>
            <p className="text-[9px] font-black tracking-wide text-yellow-300 uppercase">
              Free Delivery & Order Advisor
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="cursor-pointer p-1 text-yellow-100 hover:bg-white/10 rounded"
            title={isMinimized ? "Expand Chat" : "Collapse Chat"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={handleClearHistory}
            className="cursor-pointer p-1 text-yellow-100 hover:text-yellow-300 hover:bg-white/10 rounded"
            title="Reset Conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex-1 flex flex-col min-h-0 bg-[#FFFDF8]"
          >
            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
              {messages.map((msg) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isAssistant && (
                      <div className="w-7 h-7 bg-yellow-400 border border-red-900 rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-red-900" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs font-bold leading-relaxed border-2 ${
                        isAssistant
                          ? "bg-white text-stone-800 border-red-700 shadow-[1px_1px_0px_0px_rgba(185,28,28,1)] rounded-tl-none whitespace-pre-wrap"
                          : "bg-yellow-400 text-red-950 border-red-900 shadow-[1px_1px_0px_0px_rgba(185,28,28,1)] rounded-tr-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="w-7 h-7 bg-yellow-400 border border-red-900 rounded-lg flex items-center justify-center shrink-0 shadow-sm mt-0.5 animate-spin">
                    <Sparkles className="w-3.5 h-3.5 text-red-950" />
                  </div>
                  <div className="bg-white text-stone-500 border-2 border-dashed border-red-700 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs font-bold shadow-[1px_1px_0px_0px_rgba(185,28,28,1)] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-red-800 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-red-800 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-red-800 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    FryBuddy soch raha hai...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies block to assist slow connections */}
            {messages.length < 5 && (
              <div className="px-4 py-2 bg-white border-t border-stone-100 flex gap-2 overflow-x-auto shrink-0 scrollbar-none pb-3">
                {QUICK_PROMPTS.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(qp.prompt)}
                    className="cursor-pointer whitespace-nowrap bg-stone-50 hover:bg-yellow-400 text-stone-800 hover:text-red-950 hover:border-red-900 font-extrabold text-[10px] px-3 py-1.5 rounded-full border border-stone-300 transition-all shadow-sm flex items-center gap-1 shrink-0"
                  >
                    {qp.text}
                    <ChevronRight className="w-2.5 h-2.5 shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(userInput);
              }}
              className="p-3.5 bg-white border-t-2 border-red-700 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type here in Roman Urdu / English..."
                className="flex-1 text-xs font-bold rounded-xl border-2 border-stone-200 px-3.5 py-3 focus:outline-none focus:border-red-800"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`p-3 rounded-xl border-2 border-red-900 flex items-center justify-center transition-all shadow-[1.5px_1.5px_0px_0px_rgba(185,28,28,1)] ${
                  userInput.trim() && !isLoading
                    ? "bg-yellow-400 text-red-950 hover:scale-105 active:scale-95 cursor-pointer"
                    : "bg-stone-50 text-stone-400 cursor-not-allowed border-stone-300 shadow-none"
                }`}
                disabled={!userInput.trim() || isLoading}
              >
                <Send className="w-3.5 h-3.5 fill-current" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
