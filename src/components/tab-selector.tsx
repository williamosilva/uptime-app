import { TabSelectorProps } from "@/interfaces";
import React from "react";

export const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex gap-2 w-fit bg-slate-800/50 rounded-lg p-1 border border-slate-700/30">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-2 px-4  text-sm font-medium rounded-md transition-all duration-300 ease-in-out
            ${
              activeTab === tab
                ? "bg-slate-700/80  text-slate-100 shadow-[0_0_15px_-3px_rgba(59,130,246,0.4)] scale-[1.02]"
                : "text-slate-400 cursor-pointer hover:text-slate-200 hover:bg-slate-700/40 hover:scale-[1.01]"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
