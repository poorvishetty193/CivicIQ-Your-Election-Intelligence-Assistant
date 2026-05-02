import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    
    // Instead of CVA, just map variants and sizes
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-custom text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants: Record<string, string> = {
      default: "bg-primary text-white hover:bg-primary/90",
      destructive: "bg-red-500 text-white hover:bg-red-500/90",
      outline: "border border-primary bg-background hover:bg-primary hover:text-white text-primary",
      secondary: "bg-accent text-primary hover:bg-accent/80",
      ghost: "hover:bg-primary/10 text-primary",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes: Record<string, string> = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    const compClasses = cn(baseClasses, variants[variant], sizes[size], className);

    // If asChild is true, we assume the user wraps a child component and we just pass classes.
    // Since we don't have Radix Slot, we will just clone the child if asChild is true.
    if (asChild) {
      // Very basic slot implementation
      const child = React.Children.only(props.children) as React.ReactElement;
      return React.cloneElement(child, {
        className: cn(compClasses, child.props.className),
        ...props,
        children: child.props.children
      });
    }

    return (
      <button
        className={compClasses}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
