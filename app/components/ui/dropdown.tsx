import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface DropdownProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  placeholder?: string;
}

export function Dropdown<T extends string>({
  options,
  value,
  onChange,
  label,
  placeholder = "Selecione..."
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium block">{label}</label>}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-left flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 rounded-md border bg-background shadow-lg">
            <ul className="py-1 max-h-60 overflow-auto">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground ${option.value === value ? 'bg-accent text-accent-foreground' : ''
                    }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 