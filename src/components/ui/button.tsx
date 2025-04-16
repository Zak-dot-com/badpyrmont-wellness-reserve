
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-light ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-transparent border border-lanserhof-primary text-lanserhof-primary hover:bg-lanserhof-primary hover:text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-lanserhof-gray text-lanserhof-gray bg-transparent hover:border-lanserhof-primary hover:text-lanserhof-primary",
        secondary:
          "bg-lanserhof-light text-lanserhof-primary hover:bg-lanserhof-beige",
        ghost: "hover:bg-lanserhof-light hover:text-lanserhof-primary",
        link: "text-lanserhof-primary underline-offset-4 hover:underline",
        accent: "bg-lanserhof-accent text-white hover:bg-lanserhof-accent/90",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-none px-4",
        lg: "h-11 rounded-none px-8 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
