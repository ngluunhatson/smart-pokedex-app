import { cn } from "@/lib";
import { LucideLoader } from "lucide-react";

export function Loader({
  className,
  ...props
}: React.ComponentProps<typeof LucideLoader>) {
  return <LucideLoader className={cn("animate-spin", className)} {...props} />;
}
