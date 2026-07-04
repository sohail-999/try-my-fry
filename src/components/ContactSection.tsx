import React from "react";
import { Phone, MapPin, Navigation, Clock, MessageSquare, ShieldCheck } from "lucide-react";

export default function ContactSection() {
  const CLEAN_PHONE = "923059135544";

  return (
    <div id="contact-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Informative / Details Card */}
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-white border-3 border-red-700 rounded-2xl p-6 shadow-bold-red">
          <h2 className="text-2xl font-black text-stone-950 uppercase tracking-tighter flex items-center gap-2">
            <span className="p-1 bg-yellow-400 border-2 border-red-900 rounded-lg">
              <MapPin className="w-5 h-5 text-red-900" />
            </span>
            Humara Pata (Location)
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-bold">
            Try My Fry is hot and ready on the bustling streets of Lahore! Visit us for fresh Zingers or order right to your doorstep.
          </p>

          <div className="mt-6 space-y-4">
            {/* Address Line */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center border border-red-200 shrink-0">
                <MapPin className="w-4 h-4 text-red-700" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-stone-900 leading-tight uppercase tracking-tight">Address</h4>
                <p className="text-sm font-bold text-stone-800 mt-0.5 leading-snug">
                  Walton Road Peer Colony St# 01, Near Baba Shabir Mutton Chanay, Lahore, Pakistan.
                </p>
                <p className="text-xs text-stone-500 mt-0.5 font-bold">
                  (Famous landmark: Near Baba Shabir Mutton Chanay)
                </p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center border border-yellow-200 shrink-0">
                <Clock className="w-4 h-4 text-red-800" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-stone-900 leading-tight uppercase tracking-tight">Opening Hours</h4>
                <p className="text-sm text-stone-800 mt-0.5 font-bold uppercase">Daily 12:00 PM to 2:00 AM</p>
                <p className="text-xs text-stone-500 font-bold">Late-night cravings sorted!</p>
              </div>
            </div>

            {/* Delivery Guarantee */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center border border-red-200 shrink-0">
                <ShieldCheck className="w-4 h-4 text-red-700" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-stone-900 leading-tight uppercase tracking-tight">Delivery Zone</h4>
                <p className="text-sm text-stone-800 mt-0.5 font-bold">Free Home Delivery Area</p>
                <p className="text-xs text-stone-500 font-bold">
                  Free delivery for Peer Colony, Walton Road, and surrounding local areas on any order value.
                </p>
              </div>
            </div>
          </div>

          {/* Call / WhatsApp quick triggers */}
          <div className="mt-8 grid grid-cols-2 gap-3.5">
            <a
              href={`tel:+${CLEAN_PHONE}`}
              className="cursor-pointer flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-3 border-2 border-red-900 rounded-xl font-black text-sm transition-all text-center hover:scale-105 active:scale-95 shadow-[2px_2px_0px_0px_rgba(250,204,21,1)]"
            >
              <Phone className="w-4 h-4 fill-white" /> CALL NOW
            </a>
            <a
              href={`https://wa.me/${CLEAN_PHONE}?text=${encodeURIComponent(
                "Hi Try My Fry! I want to place an order."
              )}`}
              target="_blank"
              rel="noreferrer referrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-white px-4 py-3 border-2 border-black rounded-xl font-black text-sm transition-all text-center hover:scale-105 active:scale-95 shadow-[2px_2px_0px_0px_rgba(185,28,28,1)]"
            >
              <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" /> WHATSAPP
            </a>
          </div>
        </div>
      </div>

      {/* Lightweight Custom Interactive CSS Map (Col 6) */}
      <div className="lg:col-span-6">
        <div className="bg-[#FFFDF4] border-3 border-red-700 rounded-2xl p-6 shadow-bold-red h-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-extrabold text-lg text-stone-900 flex items-center gap-2 uppercase tracking-tight">
                  🗺️ MAP GUIDE
                </h3>
                <p className="text-xs text-stone-500 font-bold uppercase mt-0.5 tracking-wider">
                  Lahore Fast-Loading Diagram
                </p>
              </div>
              <span className="bg-yellow-400 text-red-950 text-[10px] font-black uppercase px-2 py-1 rounded border border-red-900">
                Data Saver Mode
              </span>
            </div>

            {/* Custom Schematic Layout map in purely pure CSS */}
            <div className="p-4 mt-4 bg-[#FFFDF0] rounded-xl border border-red-100 relative aspect-video overflow-hidden font-mono text-[10px]">
              {/* Roads grid representation */}
              <div className="absolute left-[35%] top-0 bottom-0 w-8 bg-stone-200 border-l border-r border-dashed border-stone-300 flex items-center justify-center rotate-12 origin-center">
                <span className="text-[8px] text-stone-500 font-bold select-none rotate-90 whitespace-nowrap uppercase tracking-widest">
                  Walton Road
                </span>
              </div>

              <div className="absolute left-0 right-0 top-[45%] h-8 bg-stone-200 border-t border-b border-dashed border-stone-300 flex items-center justify-start pl-4 uppercase">
                <span className="text-[8px] text-stone-500 font-bold select-none whitespace-nowrap uppercase tracking-wider">
                  Peer Colony St# 01
                </span>
              </div>

              {/* Baba Shabir Mutton Chanay Landmark */}
              <div className="absolute left-[15%] top-[15%] bg-yellow-400 border border-red-900 p-1.5 rounded-lg text-center shadow-[1px_1px_0px_0px_rgba(185,28,28,1)]">
                <p className="font-black text-[8px] text-red-900">🍖 Baba Shabir</p>
                <p className="text-[6px] text-red-800 font-black">Mutton Chanay</p>
              </div>

              {/* Peer Colony gate/sign representation */}
              <div className="absolute left-[45%] top-[45%] -translate-y-[20%] font-black uppercase text-stone-500 text-[7px] border border-stone-300 px-1 py-0.5 rounded bg-white bg-opacity-85">
                St# 01 Entrance
              </div>

              {/* Try My Fry Spot (Highlighted) */}
              <div className="absolute left-[58%] top-[55%] bg-red-700 border-2 border-red-950 p-2 rounded-xl text-center shadow-bold-red animate-bounce">
                <p className="font-black text-[9px] text-white uppercase tracking-tighter">
                  🍟 TRY MY FRY
                </p>
                <p className="text-[6px] text-yellow-300 font-black uppercase tracking-wider">
                  You are here!
                </p>
                {/* Red pin dot */}
                <span className="absolute -bottom-1 left-1.2 w-1.5 h-1.5 bg-black rounded-full"></span>
              </div>

              {/* Compass representation */}
              <div className="absolute bottom-2 right-2 flex flex-col items-center bg-white p-1 rounded font-bold border border-stone-200 text-stone-500">
                <span className="text-[8px]">N ↑</span>
              </div>

              {/* Direction prompt indicators wrapper */}
              <div className="absolute top-[75%] left-[8%] bg-white/75 px-1.5 py-1 rounded font-sans text-[7px] font-semibold text-stone-600 border border-stone-200">
                ★ 1 Min walk from Walton Main Road
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-stone-200">
            <p className="text-xs text-stone-600 font-bold leading-relaxed">
              We know external maps can take a long time to load and drain your mobile package limit. Click below to instantly launch Google Maps at our exact location:
            </p>
            <a
              href="https://maps.google.com/?q=Walton+Road+Peer+Colony+St+01+Near+Baba+Shabir+Mutton+Chanay+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer mt-4 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-red-950 px-4 py-3 border-2 border-red-900 rounded-xl font-black text-sm shadow-bold-red hover:scale-105 active:scale-95 transition-all w-full"
            >
              <Navigation className="w-4 h-4 text-red-950 fill-red-900" /> OPEN IN GOOGLE MAPS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
