interface SlideIndicatorProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export default function SlideIndicator({ index, isActive, onClick }: SlideIndicatorProps) {
  return (
    <button
      aria-label={`Go to slide ${index + 1}`}
      onClick={onClick}
      className={`w-3 h-3 rounded-full transition-all duration-300 ${
        isActive ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
      }`}
    />
  );
}
