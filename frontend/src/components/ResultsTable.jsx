import { useTheme } from "../App";

export default function ResultsTable({ result }) {
  const { isDark } = useTheme();
  if (!result?.raw_units) return null;
  const dieOrder = Object.entries(result.raw_totals || {}).sort((a, b) => b[1] - a[1]);

  return (
    <div className={`${isDark ? "theme-card-dark" : "theme-card-light"} p-6 rounded-2xl shadow-lg mt-8`}>
      <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
        <span>🧮</span> <span>Allocation — Die Order</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className={`${isDark ? "bg-[#1a1c1c]" : "bg-[#f5f7fa]"} border-b ${isDark ? "border-[#2d3030]" : "border-[#d1d5d5]"}`}>
            <tr>
              {["Stack", "Units", "Per-unit Eff Health", "Total Eff Health"].map((h) => (
                <th key={h} className={`p-3 text-left font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dieOrder.map(([stack, total]) => {
              const units = result.raw_units?.[stack] || 0;
              const perUnit = total / (units || 1);
              return (
                <tr key={stack} className={`border-b transition-colors ${isDark ? "border-[#2d3030] hover:bg-[#1a1c1c]" : "border-[#d1d5d5] hover:bg-gray-50"}`}>
                  <td className={`p-3 font-medium ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>
                    {stack
                      .split('_')
                      .map((part, i) =>
                        i === 0 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)
                      )
                      .join(' ')}
                  </td>
                  <td className={`p-3 text-right ${isDark ? "text-gray-300" : "text-gray-700"}`}>{units.toLocaleString()}</td>
                  <td className={`p-3 text-right ${isDark ? "text-gray-300" : "text-gray-700"}`}>{perUnit.toFixed(2)}</td>
                  <td className={`p-3 text-right font-semibold ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>{total.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

