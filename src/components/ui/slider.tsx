import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-0.5 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="
        block
        h-4 w-4
        rounded-full
        bg-red-500
        shadow-none
        transition-transform
        hover:scale-110
        active:scale-125
        focus:outline-none
        disabled:pointer-events-none
        disabled:opacity-50
      "
      />
    {/* improved support for range slider (2 values) */}
    {((props.defaultValue && props.defaultValue.length > 1) || (props.value && props.value.length > 1)) && (
       <SliderPrimitive.Thumb
        className="
        block
        h-4 w-4
        rounded-full
        bg-red-500
        shadow-none
        transition-transform
        hover:scale-110
        active:scale-125
        focus:outline-none
        disabled:pointer-events-none
        disabled:opacity-50
      "
      />

    )}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
