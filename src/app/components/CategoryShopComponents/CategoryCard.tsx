import * as React from "react";

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  isActive?: boolean;
  onSelect?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  imageSrc, 
  isActive = false,
  onSelect 
}) => {
  const baseClasses = "flex-shrink-0 flex overflow-hidden flex-col items-center px-6 py-4 rounded border border-solid w-[140px] max-md:px-4 transition-all duration-300 hover:shadow-lg focus:shadow-lg";
  const activeClasses = "bg-red-500 shadow-sm text-neutral-50";
  const inactiveClasses = "border-black border-opacity-30 text-black";

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect?.();
    }
  };

  return (
    <div 
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onSelect}
      onKeyDown={handleKeyPress}
    >
      <img
        loading="lazy"
        src={imageSrc}
        alt={`${title} category icon`}
        className="object-contain w-10 aspect-square"
      />
      <div className="mt-3 text-sm font-medium">{title}</div>
    </div>
  );
};