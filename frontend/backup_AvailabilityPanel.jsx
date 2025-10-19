import { useState, useEffect } from "react";
import axios from "axios";

export default function AvailabilityPanel({ config, onCalculate }) {
  const [availability, setAvailability] = useState({});
  const [bonuses, setBonuses] = useState({
    guardsman: { melee: 0, ranged: 0, mounted: 0, flying: 0 },
    specialist: { melee: 0, ranged: 0, mounted: 0, flying: 0 },
    monsters: {},
  });
  const [monsterData, setMonsterData] = useState({});
  const [leadershipCap, setLeadershipCap] = useState(18100);
  const [dominanceCap, setDominanceCap] = useState(10000);

  // --- Fetch monster names ---
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/meta")
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

  // --- Auto-default availability for troops and monsters ---
  useEffect(() => {
    if (!config) return;

    const gTiers = Array.from({ length: config.gLayers }, (_, i) => config.highestG - i).reverse();
    const sTiers = Array.from({ length: config.sLayers }, (_, i) => config.highestS - i).reverse();
    const mTiers = Array.from({ length: config.mLayers }, (_, i) => config.highestM - i).reverse();
    const troopSubs = ["melee", "ranged", "mounted", "flying"];

    setAvailability((prev) => {
      const next = { ...prev };
      const ensure = (key, defaults) => {
        if (!Array.isArray(next[key])) next[key] = [...defaults];
      };

      // Guardsmen defaults
      gTiers.forEach((t) => ensure(`g${t}`, troopSubs));

      // Specialists defaults
      sTiers.forEach((t) => ensure(`s${t}`, t <= 4 ? ["melee"] : troopSubs));

      // Monsters: only current tier range
      mTiers.forEach((t) => ensure(`m${t}`, monsterData[t] || []));

      // Remove monsters outside the current layer range
      Object.keys(next)
        .filter((k) => k.startsWith("m"))
        .forEach((k) => {
          const tier = parseInt(k.replace("m", ""));
          if (!mTiers.includes(tier)) delete next[k];
        });

      return next;
    });
  }, [config, monsterData]);

  // --- Toggle availability ---
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

    const gTiers = Array.from({ length: config.gLayers }, (_, i) => config.highestG - i).reverse();
    const sTiers = Array.from({ length: config.sLayers }, (_, i) => config.highestS - i).reverse();
    const mTiers = Array.from({ length: config.mLayers }, (_, i) => config.highestM - i).reverse();

    const payload = {
      g_tiers: gTiers,
      s_tiers: sTiers,
      m_tiers: mTiers,
      availability,
      bonus_multiplier: flatBonus,
      leadership_cap: leadershipCap,
      dominance_cap: dominanceCap,
    };
    onCalculate(payload);
  };

  if (!config) return null;

  const gTiers = Array.from({ length: config.gLayers }, (_, i) => config.highestG - i).reverse();
  const sTiers = Array.from({ length: config.sLayers }, (_, i) => config.highestS - i).reverse();
  const mTiers = Array.from({ length: config.mLayers }, (_, i) => config.highestM - i).reverse();

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">⚔️ Availability & Bonuses</h2>

      {/* ---- Troop Availability ---- */}
      <div className="space-y-3 mb-6">
        {[...gTiers.map((t) => `g${t}`), ...sTiers.map((t) => `s${t}`)].map((key) => (
          <div key={key} className="flex items-center gap-2">
            <span className="w-12 font-semibold uppercase">{key}</span>
            {["melee", "ranged", "mounted", "flying"].map((sub) => (
              <label key={sub} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={(availability[key] || []).includes(sub)}
                  onChange={() => toggleAvailability(key, sub)}
                />
                <span className="capitalize text-sm">{sub}</span>
              </label>
            ))}
          </div>
        ))}
      </div>

      {/* ---- Monster Availability (filtered) ---- */}
      <h3 className="text-lg font-semibold mb-2">🐉 Monster Availability</h3>
      <div className="space-y-2 mb-6">
        {mTiers.map((tier) => (
          <div key={tier}>
            <span className="font-semibold">M{tier}</span>
            <div className="flex flex-wrap gap-3 mt-1">
              {(monsterData[tier] || []).map((m) => (
                <label key={m} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={(availability[`m${tier}`] || []).includes(m)}
                    onChange={() => toggleAvailability(`m${tier}`, m)}
                  />
                  <span className="capitalize text-sm">{m.replaceAll("_", " ")}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---- Bonuses ---- */}
      <h3 className="text-lg font-semibold mb-2">📈 Bonuses (%)</h3>
      <div className="space-y-6 mb-6">
        {/* Guardsman */}
        <div>
          <h4 className="font-semibold text-blue-700 mb-2">🛡️ Guardsman Bonuses</h4>
          <div className="grid grid-cols-4 gap-3">
            {["melee", "ranged", "mounted", "flying"].map((sub) => (
              <div key={sub}>
                <label className="text-xs block mb-1 capitalize">{sub} (%)</label>
                <input
                  type="number"
                  value={bonuses.guardsman[sub]}
                  onChange={(e) => handleTroopBonusChange("guardsman", sub, e.target.value)}
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Specialist */}
        <div>
          <h4 className="font-semibold text-purple-700 mb-2">🎯 Specialist Bonuses</h4>
          <div className="grid grid-cols-4 gap-3">
            {["melee", "ranged", "mounted", "flying"].map((sub) => (
              <div key={sub}>
                <label className="text-xs block mb-1 capitalize">{sub} (%)</label>
                <input
                  type="number"
                  value={bonuses.specialist[sub]}
                  onChange={(e) => handleTroopBonusChange("specialist", sub, e.target.value)}
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Monster Bonuses (filtered by mTiers) */}
        <div>
          <h4 className="font-semibold text-green-700 mb-2">🐉 Monster Bonuses</h4>
          <div className="space-y-3">
            {mTiers.map((tier) => {
              const mons = availability[`m${tier}`] || [];
              if (!mons.length) return null;
              return (
                <div key={tier}>
                  <h5 className="font-medium mb-1">M{tier}</h5>
                  <div className="grid grid-cols-4 gap-3">
                    {mons.map((m) => {
                      const stackKey = `m${tier}_${m}`;
                      return (
                        <div key={stackKey}>
                          <label className="text-xs block mb-1 capitalize">
                            {m.replaceAll("_", " ")}
                          </label>
                          <input
                            type="number"
                            value={bonuses.monsters[stackKey] || 0}
                            onChange={(e) => handleMonsterBonusChange(stackKey, e.target.value)}
                            className="w-full border rounded p-2 text-sm"
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

      {/* ---- Caps ---- */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Leadership Cap</label>
          <input
            type="number"
            value={leadershipCap}
            onChange={(e) => setLeadershipCap(parseFloat(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dominance Cap</label>
          <input
            type="number"
            value={dominanceCap}
            onChange={(e) => setDominanceCap(parseFloat(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Run Calculation
      </button>
    </form>
  );
}

