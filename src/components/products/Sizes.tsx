import { Size } from "@prisma/client";
import { Button } from "../ui/button";

interface SizesProps {
  size: Size;
  isAvailable: boolean;
  onSizeChanged: (size: Size) => void;
  selectedSize?: Size;
  adminView?: boolean;
}

export const Sizes = ({
  size,
  isAvailable,
  onSizeChanged,
  selectedSize,
  adminView
}: SizesProps) => {
  // En admin view, todos los disponibles se muestran como "seleccionados"
  const isSelected = adminView ? isAvailable : selectedSize === size;

  return (
    <Button
      disabled={!adminView && !isAvailable}
      onClick={() => onSizeChanged(size)}
      className={`text-sm font-medium rounded flex justify-center items-center py-2 px-4 border
        ${
          isSelected
            ? "bg-primary text-white"
            : "bg-gray-500 hover:bg-primary/100"
        }
      `}
    >
      <input 
        type="radio"
        name="size-choice"
        value={size}
        className="sr-only"
        disabled={!adminView && !isAvailable}
        checked={isSelected}
        readOnly
      />
      <span className="text-white">{size}</span>
    </Button>
  );
};
