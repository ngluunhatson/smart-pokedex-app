import { DarkModeToggle, ThemePicker } from "@/components";
import { SidebarLayout } from "@/layouts/sidebar-layout";

export default function Home() {
  return (
    <SidebarLayout
      className="relative h-full"
      sidebar={{ children: "Sidebar Content" }}
    >
      Content
      <div className="absolute top-2 right-2 flex gap-2">
        <ThemePicker />
        <DarkModeToggle />
      </div>
    </SidebarLayout>
  );
}
