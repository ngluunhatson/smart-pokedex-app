import { SearchParamProvider } from "@/contexts/search-param-context";
import {
  SidebarLayout,
  SidebarLayoutContent,
  SidebarLayoutPanel,
} from "@/layouts/sidebar-layout";
import { LocaleEnum } from "@/lib";
import { PanelContent } from "./_components/panel-content";
import { PokemonDetail } from "./_components/pokemon-detail";
import { UserToolbar } from "./_components/user-toolbar";

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: LocaleEnum }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentSearchParams = await searchParams;

  const { pokeId } = currentSearchParams;
  const currentId = typeof pokeId === "string" ? pokeId : undefined;

  return (
    <SearchParamProvider searchParams={currentSearchParams}>
      <SidebarLayout className="relative h-full">
        <SidebarLayoutPanel
          width={400}
          variableForAutoCloseOnMobile={currentId}
        >
          <PanelContent />
        </SidebarLayoutPanel>
        <SidebarLayoutContent>
          <PokemonDetail pokeId={currentId} />
          <UserToolbar className="absolute top-2 right-2" />
        </SidebarLayoutContent>
      </SidebarLayout>
    </SearchParamProvider>
  );
}
