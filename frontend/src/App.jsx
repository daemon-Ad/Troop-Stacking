import React, { useState, createContext, useContext, useEffect } from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HowToUse from "./components/HowToUse";
import InputPanel from "./components/InputPanel";
import AvailabilityPanel from "./components/AvailabilityPanel";
import SummaryPanel from "./components/SummaryPanel";
import ResultsTable from "./components/ResultsTable";
import { calculateTroops } from "./api/api";
import ContactForm from "./components/ContactForm";


const ThemeContext = createContext({ isDark: true, setIsDark: () => {} });
export function useTheme() { return useContext(ThemeContext); }

function Home() {
  const { isDark } = useTheme();
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
        Welcome to Troop Optimizer
      </h1>
      <p className={`text-lg md:text-xl mb-8 ${isDark ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto`}>
        Optimize your army composition with precision. Use the calculator to plan, analyze, and dominate the battlefield.
      </p>
      <a href="/calculator" className="btn-theme inline-block px-8 py-3">Get Started</a>
    </div>
  );
}

function Docs() {
  const { isDark } = useTheme();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
        📘 Documentation
      </h1>

      <div className={`${isDark ? "theme-card-dark" : "theme-card-light"} p-6 rounded-xl mb-8`}>
        <p className={isDark ? "text-gray-300" : "text-gray-700"}>
          Documentation content will go here soon.  
          <br /><br />
          You can share your thoughts or suggestions below!
        </p>
      </div>

      {/* ✅ Use the existing reusable form */}
      <ContactForm />
    </div>
  );
}

// REMOVED the HowToUse function here - using the imported one instead

function Calculator() {
  const { isDark } = useTheme();
  const [config, setConfig] = useState(null);
  const [result, setResult] = useState(null);

  const handleConfigChange = (newConfig) => setConfig(newConfig);
  const handleCalculate = async (payload) => {
    const data = await calculateTroops(payload);
    setResult(data);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Panel - Input */}
      <aside
        className={`w-full lg:w-[30%] p-6 border-b lg:border-r shadow-sm lg:fixed lg:left-0 lg:top-16 lg:bottom-0 lg:overflow-y-auto ${
          isDark ? "theme-card-dark" : "theme-card-light"
        }`}
        style={{
          borderColor: isDark ? "#2a2b2b" : "#d6d8d8",
          boxShadow: isDark
            ? "4px 0 6px rgba(0,0,0,0.25)"
            : "4px 0 6px rgba(0,0,0,0.08)",
        }}
      >
        <InputPanel onConfigChange={handleConfigChange} />
      </aside>

      {/* Right Panel - Availability + Results */}
      <main className="flex-1 lg:ml-[30%] p-6 lg:p-8 overflow-y-auto">
        <AvailabilityPanel config={config} onCalculate={handleCalculate} />
        {result && (
          <>
            <SummaryPanel result={result} />
            <ResultsTable result={result} />
          </>
        )}
      </main>
    </div>
  );
}

export default function App() {
  const getInitialTheme = () => {
    try {
      const cookies = document.cookie.split(";").find((c) => c.trim().startsWith("theme="));
      return cookies ? cookies.split("=")[1].trim() === "dark" : true;
    } catch {
      return true;
    }
  };

  const [isDark, setIsDark] = useState(getInitialTheme);
  useEffect(() => {
    document.cookie = `theme=${isDark ? "dark" : "light"}; path=/; max-age=31536000`;
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <div
        className={`min-h-screen transition-colors ${isDark ? "theme-surface-dark" : "theme-surface-light"}`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/how-to-use" element={<HowToUse />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}
