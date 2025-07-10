import { cn } from "@/lib";
import { DynamicIcon, iconNames } from "lucide-react/dynamic";

export const IconNameArray = iconNames;

export function Icon({
  className,
  color,
  ...props
}: React.ComponentProps<typeof DynamicIcon>) {
  return (
    <DynamicIcon
      className={cn(!color && "stroke-primary", className)}
      color={color}
      {...props}
    />
  );
}
