import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="max-w-md mx-auto relative mb-8">
      <div className="relative">

        <input
          type="text"
          placeholder="Search destinations..."
          className="w-full pl-12 pr-4 py-4 rounded-full bg-input backdrop-blur-sm border border-border
                     focus:ring-2 focus:ring-primary focus:outline-none text-foreground placeholder-muted-foreground"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBar;
