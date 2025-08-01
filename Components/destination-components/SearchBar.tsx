import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="max-w-md mx-auto relative mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search destinations..."
          className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                     focus:ring-2 focus:ring-white/30 focus:outline-none text-white placeholder-white/70"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
