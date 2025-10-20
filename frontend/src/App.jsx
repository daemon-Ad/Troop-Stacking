import React, { useState, createContext, useContext, useEffect } from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HowToUse from "./components/HowToUse";
import InputPanel from "./components/InputPanel";
import AvailabilityPanel from "./components/AvailabilityPanel";
import SummaryPanel from "./components/SummaryPanel";
import ResultsTable from "./components/ResultsTable";
import { calculate } from "./api/api";
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
        
        <div className={`mt-6 p-4 rounded-lg border ${isDark ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <a 
              href="https://github.com/daemon-Ad/Troop-Stacking" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-sm font-medium hover:underline ${isDark ? "text-blue-400" : "text-blue-600"}`}
            >
              View on GitHub
            </a>
          </div>
        </div>
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
    const data = await calculate(payload);
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
