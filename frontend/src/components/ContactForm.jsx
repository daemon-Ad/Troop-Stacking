import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "../App";
import { sendContact} from "../api/api.js"

export default function ContactForm() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [kingdom, setKingdom] = useState("");
  const [xCoord, setXCoord] = useState("");
  const [yCoord, setYCoord] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await sendContact({
        email, 
        kingdom, 
        x_coord:xCoord,
        y_coord:yCoord,
        player_name:playerName,
        message,
      });

      if (res.data.status === "received") {
        setStatus("✅ Message sent successfully!");
        setEmail("");
        setKingdom("");
        setXCoord("");
        setYCoord("");
        setPlayerName("");
        setMessage("");
      } else {
        setStatus("❌ Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Could not send message (check backend).");
    }
  };

  return (
    <div className={`${isDark ? "theme-card-dark" : "theme-card-light"} rounded-xl p-8 shadow-lg`}>
      <h2 className={`text-2xl font-semibold mb-2 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
        Have any suggestions? Let's talk 👋
      </h2>
      <p className={`text-sm mb-6 italic ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        (I will be glad if you fill out these details, email and coordinates. If you don't like giving your personal email, then at least put your game coords, Don't worry, I am not going to attack you, I am not that strong.)
      </p>
      <p className={`text-sm mb-6 italic ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        (If you are a developer nerd and want to do other things to make the game easier, then also you can contact me, we will build something nice!!)
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Kingdom and Coordinates */}
        <div>
          <label className={`block font-medium mb-2 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
            Kingdom Number & Coordinates *
          </label>
          <div className="flex flex-wrap items-center gap-3">
            {/* Kingdom */}
            <div className="flex items-center gap-2">
              <span className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm`}>Kingdom:</span>
              <input
                type="text"
                value={kingdom}
                onChange={(e) => setKingdom(e.target.value)}
                required
                placeholder="K94 or 94"
                className={`w-24 p-2 rounded-lg transition-colors text-center ${
                  isDark
                    ? "bg-[#0c0d0d] border border-[#2d3030] text-[#f5f7fa] focus:border-[#d1d5d5]"
                    : "bg-[#f5f7fa] border border-[#d1d5d5] text-[#1c1f1f] focus:border-[#1c1f1f]"
                } focus:outline-none`}
              />
            </div>

            {/* X coord */}
            <div className="flex items-center gap-2">
              <span className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm`}>X:</span>
              <input
                type="number"
                value={xCoord}
                onChange={(e) => setXCoord(e.target.value)}
                required
                placeholder="123"
                className={`w-24 p-2 rounded-lg transition-colors text-center ${
                  isDark
                    ? "bg-[#0c0d0d] border border-[#2d3030] text-[#f5f7fa] focus:border-[#d1d5d5]"
                    : "bg-[#f5f7fa] border border-[#d1d5d5] text-[#1c1f1f] focus:border-[#1c1f1f]"
                } focus:outline-none`}
              />
            </div>

            {/* Y coord */}
            <div className="flex items-center gap-2">
              <span className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm`}>Y:</span>
              <input
                type="number"
                value={yCoord}
                onChange={(e) => setYCoord(e.target.value)}
                required
                placeholder="456"
                className={`w-24 p-2 rounded-lg transition-colors text-center ${
                  isDark
                    ? "bg-[#0c0d0d] border border-[#2d3030] text-[#f5f7fa] focus:border-[#d1d5d5]"
                    : "bg-[#f5f7fa] border border-[#d1d5d5] text-[#1c1f1f] focus:border-[#1c1f1f]"
                } focus:outline-none`}
              />
            </div>
          </div>
        </div>

        {/* Player Name */}
        <div>
          <label className={`block font-medium mb-2 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
            Player Name *
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
            placeholder="Your in-game name"
            className={`w-full p-3 rounded-lg transition-colors ${
              isDark
                ? "bg-[#0c0d0d] border border-[#2d3030] text-[#f5f7fa] focus:border-[#d1d5d5]"
                : "bg-[#f5f7fa] border border-[#d1d5d5] text-[#1c1f1f] focus:border-[#1c1f1f]"
            } focus:outline-none`}
          />
        </div>

        {/* Optional Email */}
        <div>
          <label className={`block font-medium mb-2 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
            Email (optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className={`w-full p-3 rounded-lg transition-colors ${
              isDark
                ? "bg-[#0c0d0d] border border-[#2d3030] text-[#f5f7fa] focus:border-[#d1d5d5]"
                : "bg-[#f5f7fa] border border-[#d1d5d5] text-[#1c1f1f] focus:border-[#1c1f1f]"
            } focus:outline-none`}
          />
        </div>

        {/* Message */}
        <div>
          <label className={`block font-medium mb-2 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
            Message *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="5"
            className={`w-full p-3 rounded-lg transition-colors resize-none ${
              isDark
                ? "bg-[#0c0d0d] border border-[#2d3030] text-[#f5f7fa] focus:border-[#d1d5d5]"
                : "bg-[#f5f7fa] border border-[#d1d5d5] text-[#1c1f1f] focus:border-[#1c1f1f]"
            } focus:outline-none`}
            placeholder="Share your thoughts, suggestions, or feedback..."
          />
        </div>

        <button type="submit" className="btn-theme w-full py-3">
          Send Message
        </button>
      </form>

      {status && (
        <p className={`mt-4 text-sm text-center ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {status}
        </p>
      )}
    </div>
  );
}

