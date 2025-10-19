import React, { useEffect, useState } from "react";
import { useTheme } from "../App";

export default function StepperInput({ value, onChange, min = 0, max = 9 }) {
  const { isDark } = useTheme();
  const [temp, setTemp] = useState(String(value ?? ""));

  useEffect(() => {
    setTemp(String(value ?? ""));
  }, [value]);

  const clamp = (n) => (Number.isNaN(n) ? min : Math.max(min, Math.min(max, n)));

  const commit = (str) => {
    const n = parseFloat(str);
    const clamped = clamp(Number.isFinite(n) ? n : min);
    onChange(clamped);
  };

  const inc = () => {
    const next = clamp(Number(value ?? 0) + 1);
    setTemp(String(next));
    onChange(next);
  };

  const dec = () => {
    const next = clamp(Number(value ?? 0) - 1);
    setTemp(String(next));
    onChange(next);
  };

  return (
    <div
      className={`flex items-center rounded-lg overflow-hidden w-full max-w-[160px] border ${
        isDark
          ? "bg-[#0c0d0d] border-[#2d3030]"
          : "bg-white border-[#d1d5d5]"
      }`}
    >
      {/* Decrement */}
      <button
        type="button"
        onClick={dec}
        aria-label="decrement"
        className={`px-3 py-2 text-lg font-bold transition-colors ${
          isDark
            ? "text-[#f5f7fa] hover:bg-[#f5f7fa] hover:text-[#0c0d0d]"
            : "text-[#1c1f1f] hover:bg-[#1c1f1f] hover:text-white"
        }`}
      >
        -
      </button>

      {/* Input Field */}
      <input
        inputMode="numeric"
        type="text"
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        onBlur={() => commit(temp)}
        className={`w-full px-2 py-2 text-center outline-none border-x ${
          isDark
            ? "bg-[#0c0d0d] border-[#2d3030] text-[#f5f7fa]"
            : "bg-white border-[#d1d5d5] text-[#1c1f1f]"
        }`}
        aria-label="number input"
      />

      {/* Increment */}
      <button
        type="button"
        onClick={inc}
        aria-label="increment"
        className={`px-3 py-2 text-lg font-bold transition-colors ${
          isDark
            ? "text-[#f5f7fa] hover:bg-[#f5f7fa] hover:text-[#0c0d0d]"
            : "text-[#1c1f1f] hover:bg-[#1c1f1f] hover:text-white"
        }`}
      >
        +
      </button>
    </div>
  );
}

