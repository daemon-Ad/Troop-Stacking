import React, { useState, useEffect } from "react";
import StepperInput from "./StepperInput";
import { useTheme } from "../App";

export default function InputPanel({ onConfigChange }) {
  const { isDark } = useTheme();
  const [highestG, setHighestG] = useState(5);
  const [gLayers, setGLayers] = useState(3);
  const [highestS, setHighestS] = useState(5);
  const [sLayers, setSLayers] = useState(1);
  const [highestM, setHighestM] = useState(4);
  const [mLayers, setMLayers] = useState(2);

  const clampValue = (value, min, max) => Math.max(min, Math.min(max, value));

  useEffect(() => {
    const config = { highestG, gLayers, highestS, sLayers, highestM, mLayers };
    onConfigChange(config);
  }, [highestG, gLayers, highestS, sLayers, highestM, mLayers]);

  return (
    <div className={`space-y-6 ${isDark ? "theme-card-dark" : "theme-card-light"} p-6 rounded-xl`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🏛️</span>
        <h2 className={`text-xl font-semibold ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
          Levels & Layers
        </h2>
      </div>

      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
        Adjust tiers and layer counts here:
      </p>

      <div className="space-y-5">
        {[
          {
            title: "Highest Guardsman Level (e.g. 5)",
            value: highestG,
            setter: setHighestG,
            min: 0,
            max: 9,
          },
          {
            title: "Guardsman Layers",
            value: gLayers,
            setter: setGLayers,
            min: 0,
            max: 9,
          },
          {
            title: "Highest Specialist Level (0 for none)",
            value: highestS,
            setter: setHighestS,
            min: 0,
            max: 9,
          },
          {
            title: "Specialist Layers",
            value: sLayers,
            setter: setSLayers,
            min: 0,
            max: 9,
          },
          {
            title: "Highest Monster Level (min 3, max 9)",
            value: highestM,
            setter: setHighestM,
            min: 3,
            max: 9,
          },
          {
            title: "Monster Layers",
            value: mLayers,
            setter: setMLayers,
            min: 0,
            max: 9,
          },
        ].map((item, i) => (
          <div key={i}>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"
              }`}
            >
              {item.title}
            </label>
            <StepperInput
              value={item.value}
              onChange={(val) => item.setter(clampValue(val, item.min, item.max))}
              min={item.min}
              max={item.max}
            />
          </div>
        ))}
      </div>

      <p
        className={`text-xs mt-6 pt-6 border-t ${
          isDark ? "text-gray-500 border-[#2d3030]" : "text-gray-500 border-[#d1d5d5]"
        }`}
      >
        These settings control which troop tiers are available.
      </p>
    </div>
  );
}

