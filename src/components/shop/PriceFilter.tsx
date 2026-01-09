
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface PriceFilterProps {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  onPriceChange: (values: number[]) => void;
  onFilter: () => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  min,
  max,
  currentMin,
  currentMax,
  onPriceChange,
  onFilter
}) => {
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div className="w-full max-w-xs space-y-4">
      <h3 className="text-lg font-medium text-black font-inter">Filter by price</h3>
      
      <div className="pt-2 pb-6">
        <Slider
          defaultValue={[currentMin, currentMax]}
          value={[currentMin, currentMax]}
          max={max}
          min={min}
          step={100}
          onValueChange={onPriceChange}
          className="[&>.relative>.bg-primary]:bg-red-500 [&>.block]:border-red-500"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <span className="font-medium text-black">Price: </span> 
          {formatPrice(currentMin)} — {formatPrice(currentMax)}
        </div>
        
        <Button 
          variant="secondary" 
          size="sm"
          onClick={onFilter}
          className="bg-gray-100 hover:bg-gray-200 text-black text-xs font-bold tracking-widest px-4 h-8 uppercase"
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default PriceFilter;
