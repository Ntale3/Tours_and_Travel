interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

const CategoryFilters = ({ categories, selected, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            selected === category.id
              ? "bg-white text-teal-600 shadow-lg"
              : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
          }`}
        >
          {category.name}          
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters;
