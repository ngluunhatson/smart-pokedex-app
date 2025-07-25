import { PaginationProvider } from "@/contexts/pagination-context";
import {
  SidebarLayout,
  SidebarLayoutContent,
  SidebarLayoutPanel,
} from "@/layouts/sidebar-layout";
import { LocaleEnum } from "@/lib";
import { PanelContent } from "./_components/panel-content";
import { UserToolbar } from "./_components/user-toolbar";

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: LocaleEnum }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { offset, limit, pokeId } = await searchParams;

  const currentOffset =
    typeof offset === "string" && !isNaN(parseInt(offset))
      ? parseInt(offset)
      : 0;
  const currentLimit =
    typeof limit === "string" && !isNaN(parseInt(limit))
      ? parseInt(limit)
      : 100;

  const currentId = typeof pokeId === "string" ? pokeId : undefined;

  return (
    <PaginationProvider
      currentOffset={currentOffset}
      currentLimit={currentLimit}
    >
      <SidebarLayout className="relative h-full">
        <SidebarLayoutPanel
          width={400}
          variableForAutoCloseOnMobile={currentId}
        >
          <PanelContent />
        </SidebarLayoutPanel>
        <SidebarLayoutContent>
          Content
          <UserToolbar className="absolute top-2 right-2" />
        </SidebarLayoutContent>
      </SidebarLayout>
    </PaginationProvider>
  );
}
