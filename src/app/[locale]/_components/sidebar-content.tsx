import { getTranslations } from "next-intl/server";

export async function SidebarContent() {
  const t = await getTranslations();
  return (
    <div className="flex h-full w-full flex-col">
      <div className="text-primary border-b-primary flex h-[60px] w-full items-center justify-center border-b-[1px] p-2 text-center">
        {t("app-name")}
      </div>
      <div className="flex-1 overflow-y-scroll">
        <div className="h-[2000px]">Sidebar Content</div>
      </div>
      <div className="border-t-primary w-full border-t-[1px] p-2 text-center">
        Footer
      </div>
    </div>
  );
}
