import { useTheme } from "../App";

export default function SummaryPanel({ result }) {
  const { isDark } = useTheme();
  const { lead_used, dom_used, food } = result;
  const training_cost_total = result.training_cost_total;
  const revival_cost_total = result.revival_cost_total;
  const formatNum = (n) => n?.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className={`${isDark ? "theme-card-dark" : "theme-card-light"} p-6 rounded-2xl shadow-lg mt-8`}>
      <h2 className={`text-2xl font-semibold mb-6 ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>📊 Summary Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Leadership Used", value: lead_used },
          { label: "Dominance Used", value: dom_used },
          { label: "Food / hr", value: food },
        ].map((item) => (
          <div key={item.label}
            className={`p-6 rounded-xl shadow-sm border ${isDark ? "border-[#2d3030]" : "border-[#d1d5d5]"}`}>
            <h3 className={`text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{item.label}</h3>
            <p className={`text-3xl font-bold ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>{formatNum(item.value)}</p>
          </div>
        ))}
      </div>
      
      {(training_cost_total !== undefined || revival_cost_total !== undefined) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {training_cost_total !== undefined && (
            <div className={`p-6 rounded-xl shadow-sm border ${isDark ? "border-[#2d3030]" : "border-[#d1d5d5]"}`}>
              <h3 className={`text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Troop Training Cost</h3>
              <p className={`text-3xl font-bold ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>{formatNum(training_cost_total)}</p>
            </div>
          )}
          
          {revival_cost_total !== undefined && (
            <div className={`p-6 rounded-xl shadow-sm border ${isDark ? "border-[#2d3030]" : "border-[#d1d5d5]"}`}>
              <h3 className={`text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Troop Revival Cost</h3>
              <p className={`text-3xl font-bold ${isDark ? "text-[#f5f7fa]" : "text-[#1c1f1f]"}`}>{formatNum(revival_cost_total)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
