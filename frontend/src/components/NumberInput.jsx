import { useState, useEffect } from "react";

export default function NumberInput({ value, onChange, min = 0, max = 999, variant = "plusminus" }) {
  const [val, setVal] = useState(value || 0);

  useEffect(() => setVal(value), [value]);

  const clamp = (v) => Math.max(min, Math.min(max, v));

  const update = (v) => {
    const newVal = clamp(v);
    setVal(newVal);
    onChange?.(newVal);
  };

  const decrement = () => update(val - 1);
  const increment = () => update(val + 1);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={decrement}
        className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-100 font-bold rounded-l-lg transition-colors"
      >
        {variant === "plusminus" ? "−" : "<"}
      </button>

      <input
        type="number"
        value={val}
        onChange={(e) => update(parseInt(e.target.value) || 0)}
        className="w-full text-center border rounded-lg p-2 px-12 appearance-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        onClick={increment}
        className="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-100 font-bold rounded-r-lg transition-colors"
      >
        {variant === "plusminus" ? "+" : ">"}
      </button>
    </div>
  );
}
