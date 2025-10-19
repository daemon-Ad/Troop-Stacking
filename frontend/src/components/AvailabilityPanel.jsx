import React, { useState, useEffect } from "react";
import axios from "axios";
import StepperInput from "./StepperInput.jsx";
import { useTheme } from "../App";

export default function AvailabilityPanel({ config, onCalculate }) {
  const { isDark } = useTheme();
  const [availability, setAvailability] = useState({});
  const [bonuses, setBonuses] = useState({
    guardsman: { melee: 0, ranged: 0, mounted: 0, flying: 0 },
    specialist: { melee: 0, ranged: 0, mounted: 0, flying: 0 },
    monsters: {},
  });
  const [monsterData, setMonsterData] = useState({});
  const [leadershipCap, setLeadershipCap] = useState(18100);
  const [dominanceCap, setDominanceCap] = useState(10000);
  const [margin, setMargin] = useState("");

  // 🆕 Optional new fields
  const [trainingCost, setTrainingCost] = useState("");
  const [revivalReduction, setRevivalReduction] = useState("");

  // --- Fetch monster names ---
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/meta`)
      .then((res) => setMonsterData(res.data.monsters || {}))
      .catch(() =>
        setMonsterData({
          3: ["water_elemental", "battle_boar", "emerald_dragon", "stone_gargoyle"],
          4: ["gorgon_medusa", "many_armed_guardian", "magic_dragon", "ice_phoenix"],
          5: ["ettin", "flaming_cantaur", "desert_vanquisher", "fearsome_manticore"],
          6: ["jungle_destroyer", "ruby_golem", "crystal_dragon", "troll_rider"],
          7: ["ancient_terror", "destructive_colossus", "black_dragon", "wind_lord"],
          8: ["trickster_1", "kraken_1", "fire_phoenix_1", "devastator_1"],
          9: ["trickster_2", "kraken_2", "fire_phoenix_2", "devastator_2"],
        })
      );
  }, []);

  // --- Auto-default availability (fixed dynamic monster preselection) ---
  useEffect(() => {
    if (!config) return;

    const gTiers = Array.from({ length: config.gLayers }, (_, i) => config.highestG - i)
      .filter((t) => t >= 1)
      .reverse();
    const sTiers = Array.from({ length: config.sLayers }, (_, i) => config.highestS - i)
      .filter((t) => t >= 1)
      .reverse();
    const mTiers = Array.from({ length: config.mLayers }, (_, i) => config.highestM - i)
      .filter((t) => t >= 3)
      .reverse();

    const troopSubs = ["melee", "ranged", "mounted", "flying"];

    setAvailability((prev) => {
      const next = { ...prev };
      const ensure = (key, defaults) => {
        if (!Array.isArray(next[key])) next[key] = [...defaults];
      };

      gTiers.forEach((t) =>
        ensure(`g${t}`, t <= 4 ? ["melee", "ranged", "mounted"] : troopSubs)
      );
      sTiers.forEach((t) =>
        ensure(`s${t}`, t <= 4 ? ["melee"] : troopSubs)
      );

      // ✅ Refresh monsters dynamically after API load
      mTiers.forEach((t) => {
        const mons = monsterData[t] || [];
        next[`m${t}`] = [...mons];
      });

      return next;
    });
  }, [config, monsterData]);

  const toggleAvailability = (key, subtype) => {
    setAvailability((prev) => {
      const arr = prev[key] || [];
      const exists = arr.includes(subtype);
      return { ...prev, [key]: exists ? arr.filter((x) => x !== subtype) : [...arr, subtype] };
    });
  };

  const handleTroopBonusChange = (type, subtype, val) => {
    setBonuses((prev) => ({
      ...prev,
      [type]: { ...prev[type], [subtype]: parseFloat(val) || 0 },
    }));
  };

  const handleMonsterBonusChange = (name, val) => {
    setBonuses((prev) => ({
      ...prev,
      monsters: { ...prev.monsters, [name]: parseFloat(val) || 0 },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const flatBonus = {};
    Object.entries(bonuses.guardsman).forEach(([k, v]) => (flatBonus[`guardsman_${k}`] = v));
    Object.entries(bonuses.specialist).forEach(([k, v]) => (flatBonus[`specialist_${k}`] = v));
    Object.entries(bonuses.monsters).forEach(([k, v]) => (flatBonus[k] = v));

    const gTiers = Array.from({ length: config.gLayers }, (_, i) => config.highestG - i)
      .filter((t) => t >= 1)
      .reverse();
    const sTiers = Array.from({ length: config.sLayers }, (_, i) => config.highestS - i)
      .filter((t) => t >= 1)
      .reverse();
    const mTiers = Array.from({ length: config.mLayers }, (_, i) => config.highestM - i)
      .filter((t) => t >= 3)
      .reverse();

    const payload = {
      g_tiers: gTiers,
      s_tiers: sTiers,
      m_tiers: mTiers,
      availability,
      bonus_multiplier: flatBonus,
      leadership_cap: leadershipCap,
      dominance_cap: dominanceCap,
      margin: margin ? parseFloat(margin) / 100 : null,
      training_cost: trainingCost ? parseFloat(trainingCost) : 0,
      revival_cost_reduction: revivalReduction ? parseFloat(revivalReduction) : 0,
    };

    onCalculate(payload);
  };

  if (!config) return null;

  const gTiers = Array.from({ length: config.gLayers }, (_, i) => config.highestG - i)
    .filter((t) => t >= 1)
    .reverse();
  const sTiers = Array.from({ length: config.sLayers }, (_, i) => config.highestS - i)
    .filter((t) => t >= 1)
    .reverse();
  const mTiers = Array.from({ length: config.mLayers }, (_, i) => config.highestM - i)
    .filter((t) => t >= 3)
    .reverse();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --- Header --- */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🛡️</span>
        <h2 className={`text-2xl font-semibold ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
          Troop Masking Allocator
        </h2>
      </div>

      {/* --- Troop Availability --- */}
      <div className={`p-6 rounded-xl ${isDark ? "theme-card-dark" : "theme-card-light"}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
          Per-tier subtype availability (S1..S4 forced to melee only)
        </h3>
        <div className="space-y-3">
          {[...gTiers.map((t) => `g${t}`), ...sTiers.map((t) => `s${t}`)].map((key) => {
            const tier = parseInt(key.slice(1));
            const subtypes = key.startsWith("s")
              ? tier <= 4
                ? ["melee"]
                : ["melee", "ranged", "mounted", "flying"]
              : tier <= 4
              ? ["melee", "ranged", "mounted"]
              : ["melee", "ranged", "mounted", "flying"];
            return (
              <div key={key} className="flex items-center gap-4">
                <span className={`w-12 font-semibold uppercase ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
                  {key.toUpperCase()}
                </span>
                <div className="flex flex-wrap gap-4">
                  {subtypes.map((sub) => (
                    <label key={sub} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(availability[key] || []).includes(sub)}
                        onChange={() => toggleAvailability(key, sub)}
                        className={`w-4 h-4 cursor-pointer ${isDark ? "accent-white" : "accent-black"}`}
                      />
                      <span className={`capitalize text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {sub}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Monster Availability --- */}
      <div className={`p-6 rounded-xl ${isDark ? "theme-card-dark" : "theme-card-light"}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
          Monster availability (auto-detected from JSON)
        </h3>
        <div className="space-y-4">
          {mTiers.map((tier) => (
            <div key={tier}>
              <span className={`font-semibold ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>M{tier}</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {(monsterData[tier] || []).map((m) => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(availability[`m${tier}`] || []).includes(m)}
                      onChange={() => toggleAvailability(`m${tier}`, m)}
                      className={`w-4 h-4 cursor-pointer ${isDark ? "accent-white" : "accent-black"}`}
                    />
                    <span className={`capitalize text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {m.replaceAll("_", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Bonuses --- */}
      <div className={`p-6 rounded-xl ${isDark ? "theme-card-dark" : "theme-card-light"}`}>
        <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
          Health Bonuses (%)
        </h3>
        <p className={`text-sm mb-6 italic ${isDark ? "text-red-400" : "text-red-600"}`}>Note: Please write health bonuses only, and if you want them to be saved, use the "Download settings" option below. Reloading the page will cause them to disappear.</p>
        <p className={`text-sm mb-6 italic ${isDark ? "text-gray-400" : "text-gray-600"}`}>(If it is 213.8%, then write 213.8)</p>
        <div className="space-y-6">
          {/* Guardsman & Specialist */}
          {["guardsman", "specialist"].map((role) => (
            <div key={role}>
              <h4 className={`font-medium mb-3 flex items-center gap-2 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
                {role === "guardsman" ? "🛡️ Guardsman Bonuses" : "🎯 Specialist Bonuses"}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["melee", "ranged", "mounted", "flying"].map((sub) => (
                  <div key={sub}>
                    <label className={`text-xs block mb-1 capitalize ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {sub}
                    </label>
                    <input
                      type="number"
                      value={bonuses[role][sub]}
                      onChange={(e) => handleTroopBonusChange(role, sub, e.target.value)}
                      className={`w-full rounded px-3 py-2 text-sm border ${
                        isDark
                          ? "bg-[#0c0d0d] border-[#2d3030] text-[#f5f7fa]"
                          : "bg-white border-[#d1d5d5] text-[#1c1f1f]"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Monster Bonuses */}
          <div>
            <h4 className={`font-medium mb-3 flex items-center gap-2 ${
              isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"
            }`}>
              <span>🐉</span> Monster Bonuses
            </h4>
            <div className="space-y-3">
              {mTiers.map((tier) => {
                const mons = availability[`m${tier}`] || [];
                if (!mons.length) return null;
                return (
                  <div key={tier}>
                    <h5 className={`font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}>
                      M{tier}
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {mons.map((m) => {
                        const stackKey = `m${tier}_${m}`;
                        return (
                          <div key={stackKey}>
                            <label className={`text-xs block mb-1 capitalize ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {m.replaceAll("_", " ")}
                            </label>
                            <input
                              type="number"
                              value={bonuses.monsters[stackKey] || 0}
                              onChange={(e) => handleMonsterBonusChange(stackKey, e.target.value)}
                              className={`w-full rounded px-3 py-2 text-sm border ${
                                isDark
                                  ? "bg-[#0c0d0d] border-[#2d3030] text-[#f5f7fa]"
                                  : "bg-white border-[#d1d5d5] text-[#1c1f1f]"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Import / Export Bonuses --- */}
      <div className={`p-6 rounded-xl ${isDark ? "theme-card-dark" : "theme-card-light"}`}>
        <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
          💾 Save or Load Allocation Settings
        </h3>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Download full config */}
          <button
            type="button"
            className="btn-theme"
            onClick={() => {
              const data = {
                bonuses,
                leadershipCap,
                dominanceCap,
                margin,
              };
              const dataStr = JSON.stringify(data, null, 2);
              const blob = new Blob([dataStr], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "troop_allocation_settings.json";
              link.click();
              URL.revokeObjectURL(url);
            }}
          >
            ⬇️ Download Settings
          </button>

          {/* Upload and restore */}
          <div>
            <input
              type="file"
              accept="application/json"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  try {
                    const data = JSON.parse(ev.target.result);
                    if (data.bonuses) setBonuses(data.bonuses);
                    if (data.leadershipCap) setLeadershipCap(data.leadershipCap);
                    if (data.dominanceCap) setDominanceCap(data.dominanceCap);
                    if (data.margin) setMargin(data.margin);
                    alert("✅ Settings loaded successfully!");
                  } catch {
                    alert("❌ Invalid JSON file.");
                  }
                };
                reader.readAsText(file);
              }}
              className={`w-full text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
            />
          </div>
        </div>
      </div>



      {/* --- Caps + New Inputs --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Leadership Cap", value: leadershipCap, setter: setLeadershipCap },
          { label: "Dominance Cap", value: dominanceCap, setter: setDominanceCap },
        ].map((item) => (
          <div key={item.label}>
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {item.label}
            </label>
            <input
              type="number"
              value={item.value}
              onChange={(e) => item.setter(parseFloat(e.target.value))}
              className={`w-full rounded-lg px-4 py-2 border ${
                isDark
                  ? "bg-[#0c0d0d] border-[#2d3030] text-[#f5f7fa]"
                  : "bg-white border-[#d1d5d5] text-[#1c1f1f]"
              }`}
            />
          </div>
        ))}

        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Margin (%)
          </label>
          <StepperInput value={margin ? parseFloat(margin) : 1} onChange={(val) => setMargin(val)} min={1} max={20} />
        </div>

        {/* 🆕 Training Cost Field */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Training Cost (%)
          </label>
          <input
            type="number"
            value={trainingCost}
            onChange={(e) => setTrainingCost(e.target.value)}
            className={`w-full rounded-lg px-4 py-2 border ${
              isDark
                ? "bg-[#0c0d0d] border-[#2d3030] text-[#f5f7fa]"
                : "bg-white border-[#d1d5d5] text-[#1c1f1f]"
            }`}
          />
        </div>

        {/* 🆕 Revival Reduction Field */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Troop Revival Cost Reduced By (%)
          </label>
          <input
            type="number"
            value={revivalReduction}
            onChange={(e) => setRevivalReduction(e.target.value)}
            className={`w-full rounded-lg px-4 py-2 border ${
              isDark
                ? "bg-[#0c0d0d] border-[#2d3030] text-[#f5f7fa]"
                : "bg-white border-[#d1d5d5] text-[#1c1f1f]"
            }`}
          />
        </div>
      </div>

      <button type="submit" className="btn-theme w-full md:w-auto">
        Run Calculation
      </button>
    </form>
  );
}
