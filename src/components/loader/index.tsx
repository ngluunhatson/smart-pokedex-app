import { cn } from "@/lib";
import { LucideLoader } from "lucide-react";

export function Loader({
  className,
  color,
  ...props
}: React.ComponentProps<typeof LucideLoader>) {
  return (
    <LucideLoader
      className={cn("animate-spin", !color && "stroke-primary", className)}
      color={color}
      {...props}
    />
  );
}
