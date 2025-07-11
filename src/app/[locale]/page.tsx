import { DarkModeToggle, LocalePicker, ThemePicker } from "@/components";
import { SidebarLayout } from "@/layouts/sidebar-layout";
import { SidebarContent } from "./_components/sidebar-content";

export default async function Home() {
  return (
    <SidebarLayout
      className="relative h-full"
      sidebar={{
        children: <SidebarContent />,
      }}
    >
      Content
      <div className="absolute top-2 right-2 flex gap-2">
        <ThemePicker />
        <DarkModeToggle />
        <LocalePicker localeTitleMap={{ en: "English", vi: "Tiếng Việt" }} />
      </div>
    </SidebarLayout>
  );
}
