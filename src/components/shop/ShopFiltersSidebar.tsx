
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";

type Category = { id: string; name: string; };

interface ShopFiltersSidebarProps {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  selectedStatuses: string[];
  toggleStatus: (status: string) => void;
}

const ShopFiltersSidebar: React.FC<ShopFiltersSidebarProps> = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  priceRange,
  onPriceChange,
  categories,
  selectedCategories,
  toggleCategory,
  selectedStatuses,
  toggleStatus
}) => (
  <div 
    className={`
      lg:w-1/4 space-y-6 bg-white p-6 rounded-lg
      ${mobileFiltersOpen ? 'block' : 'hidden'} lg:block
      ${mobileFiltersOpen ? 'fixed inset-0 z-40 overflow-auto' : ''}
    `}
  >
    {mobileFiltersOpen && (
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <h2 className="font-bold text-lg">Filters</h2>
        <button onClick={() => setMobileFiltersOpen(false)} className="text-primary">
          Close
        </button>
      </div>
    )}

    {/* Price Range */}
    <div>
      <h3 className="font-semibold mb-4">Price Range</h3>
      <Slider 
        defaultValue={[0, 200]} 
        max={500} 
        step={10} 
        value={priceRange}
        onValueChange={onPriceChange}
      />
      <div className="flex justify-between mt-2">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
    
    <Separator />
    
    {/* Categories */}
    <div>
      <h3 className="font-semibold mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map(category => (
          <div className="flex items-center space-x-2" key={category.id}>
            <Checkbox 
              id={`category-${category.id}`} 
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={() => toggleCategory(category.id)}
            />
            <label 
              htmlFor={`category-${category.id}`}
              className="text-sm font-medium leading-none cursor-pointer"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
    
    <Separator />
    
    {/* Status Filter */}
    <div>
      <h3 className="font-semibold mb-4">Availability</h3>
      <div className="space-y-2">
        {['Active', 'Low Stock'].map(status => (
          <div className="flex items-center space-x-2" key={status}>
            <Checkbox 
              id={`status-${status}`} 
              checked={selectedStatuses.includes(status)}
              onCheckedChange={() => toggleStatus(status)}
            />
            <label 
              htmlFor={`status-${status}`}
              className="text-sm font-medium leading-none cursor-pointer"
            >
              {status}
            </label>
          </div>
        ))}
      </div>
    </div>
    
    {mobileFiltersOpen && (
      <div className="mt-6 lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(false)}
          className="w-full btn-primary py-2"
        >
          Apply Filters
        </button>
      </div>
    )}
  </div>
);

export default ShopFiltersSidebar;
