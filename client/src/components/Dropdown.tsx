import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export default function Dropdown({
  label,
  options,
  onSelect,
  ref,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const localRef = useRef<HTMLDivElement>(null);
  const dropdownRef = ref || localRef;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedLabel(option.label);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left text-text-primary"
      ref={dropdownRef}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex flex-row items-center justify-between gap-2 px-4 py-2.5 rounded-lg text-sm text-left cursor-pointer hover:bg-brand-active hover:text-white focus:outline-none focus:ring-1 focus:ring-[#640A10] transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-md">{selectedLabel || label}</span>
        <ChevronDown
          className={`w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <ul
          className="absolute z-50 mt-1.5 w-65 bg-bg-main border border-gray-200 rounded-lg shadow-lg max-w-100 max-h-100 overflow-y-auto py-1 focus:outline-none"
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = selectedLabel === option.label;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleOptionClick(option)}
                className={`px-4 py-2 text-md cursor-pointer transition-colors duration-150 select-none 
                  ${
                    isSelected
                      ? "bg-blue-50 text-blue-600"
                      : "text-text-primary hover:bg-brand-active hover:text-white"
                  }`}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
