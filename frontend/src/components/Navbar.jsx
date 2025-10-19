import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../App";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { pathname } = useLocation();
  const { isDark, setIsDark } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/calculator", label: "Calculator" },
    { path: "/docs", label: "Docs" },
    { path: "/how-to-use", label: "How To Use" },
  ];

  return (
    <nav className="border-b sticky top-0 z-50 transition-colors shadow-sm"
      style={{
        backgroundColor: isDark ? "#1a1c1c" : "#f5f7fa",
        borderColor: isDark ? "#2d3030" : "#d1d5d5",
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className={`text-xl font-bold flex items-center gap-3 hover:opacity-80 transition-opacity ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
            <img 
              src={logo}
              alt="Troop Optimizer Logo"
              className={`w-[64px] h-[64px] object-contain ${isDark ? "invert" : ""}`}
            />
            <span>Total Death</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"
                    : isDark ? "text-gray-400 hover:text-[#f5f7fa]" : "text-gray-600 hover:text-[#1c1f1f]"
                }`}>
                {item.label}
              </Link>
            ))}
            <button onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: isDark ? "#2d3030" : "#e5e7eb",
                color: isDark ? "#f5f7fa" : "#1c1f1f",
              }}
              aria-label="Toggle theme">
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646" />
                </svg>
              )}
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
            style={{ backgroundColor: isDark ? "#2d3030" : "#e5e7eb" }}
            aria-label="Toggle mobile menu">
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  pathname === item.path
                    ? isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"
                    : isDark ? "text-gray-400" : "text-gray-600"
                }`}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

