import { DarkModeToggle } from "@/components";
import { ThemePicker } from "@/components/theme-picker";

export default function Home() {
  return (
    <div>
      <ThemePicker />
      <DarkModeToggle />
      <div className="text-primary">Hello World</div>
    </div>
  );
}
