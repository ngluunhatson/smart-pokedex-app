import { DynamicIcon, iconNames } from "lucide-react/dynamic";

export const IconNameArray = iconNames;

export function Icon(props: React.ComponentProps<typeof DynamicIcon>) {
  return <DynamicIcon {...props} />;
}
