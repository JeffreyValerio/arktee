"use client";

import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

interface Props {
  quantity: number;
  maxStock: number;
  onQuantityChanged: (value: number) => void;
}
export const QuantitySelector = ({
  quantity,
  maxStock,
  onQuantityChanged,
}: Props) => {
  const onValueChanged = (value: number) => {
    const newQuantity = quantity + value;

    if (newQuantity < 1 || newQuantity > maxStock) return;

    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-1">
        <Button
          onClick={() => onValueChanged(-1)}
          variant={"ghost"}
          size={"icon"}
          disabled={quantity == 1}
        >
          <Minus />
        </Button>
        <span className="ring size-9 flex justify-center items-center rounded">
          {quantity}
        </span>
        <Button
          onClick={() => onValueChanged(+1)}
          variant={"ghost"}
          size={"icon"}
          disabled={quantity == maxStock}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};
