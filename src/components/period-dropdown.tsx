import { Option, PeriodDropdownProps, PeriodValue } from "@/interfaces";
import { Check, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const PeriodDropdown: React.FC<PeriodDropdownProps> = ({
  selectedPeriod,
  setSelectedPeriod,
  loading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: Option[] = [
    { value: "today", label: "Today" },
    { value: 7, label: "7 days" },
    { value: 30, label: "30 days" },
    { value: "all", label: "All time" },
  ];

  const selectedOption = options.find(
    (option) => option.value === selectedPeriod
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHoveredIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: PeriodValue) => {
    setSelectedPeriod(value);
    setIsOpen(false);
    setHoveredIndex(null);
  };

  const handleTriggerClick = () => {
    if (!loading) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setHoveredIndex(null);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={handleTriggerClick}
        className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
          loading
            ? "text-slate-500 cursor-not-allowed"
            : "text-slate-200 hover:text-slate-100 cursor-pointer"
        }`}
      >
        <span>{selectedOption?.label || "Select period"}</span>
        {loading ? (
          <div className="w-4 h-4 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
        ) : (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      <div
        className={`absolute top-full right-0 mt-1 bg-slate-800 rounded-lg shadow-2xl border border-slate-700/50 z-10 w-40 transform transition-all duration-300 ease-in-out origin-top backdrop-blur-sm ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
        }`}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {options.map((option, index) => (
          <div
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
              w-full text-left px-4 py-3 text-sm cursor-pointer
              transition-all duration-150 ease-in-out
              ${index === 0 ? "rounded-t-lg" : ""}
              ${index === options.length - 1 ? "rounded-b-lg" : ""}
              ${
                selectedPeriod === option.value
                  ? "bg-slate-700/50 text-blue-400 font-medium"
                  : "text-slate-200"
              }
              ${
                hoveredIndex === index && selectedPeriod !== option.value
                  ? "bg-slate-700/30 text-slate-100"
                  : ""
              }
              ${
                hoveredIndex === index && selectedPeriod === option.value
                  ? "bg-slate-700/70"
                  : ""
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span>{option.label}</span>
              {selectedPeriod === option.value && (
                <Check className="w-4 h-4 text-blue-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeriodDropdown;
