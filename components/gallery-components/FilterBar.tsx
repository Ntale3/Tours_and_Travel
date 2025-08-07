'use client'
interface FilterOption {
  value: string;
  label: string;
}

interface Props {
  options: FilterOption[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterBar({ options, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
            active === option.value
              ? "bg-primary text-primary-foreground shadow-lg transform scale-105"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/0.5 backdrop-blur-sm"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
