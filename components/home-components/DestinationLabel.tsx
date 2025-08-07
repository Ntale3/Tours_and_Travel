// components/Slider/DestinationLabel.tsx

interface DestinationLabelProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default function DestinationLabel({ name, isActive, onClick }: DestinationLabelProps) {
  return (
    <button
      onClick={onClick}
      className={`block text-right transition-all duration-300 ${
        isActive ? 'text-primary text-xl font-bold' : 'text-primary hover:text-orange-600 text-lg'
      }`}
    >
      {name}
      <div
        className={`w-12 h-0.5 ml-auto mt-1 transition-all duration-300 ${
          isActive ? 'bg-orange-800' : 'bg-primary'
        }`}
      />
    </button>
  );
}
