import {
  SidebarLayout,
  SidebarLayoutContent,
  SidebarLayoutPanel,
} from "@/layouts/sidebar-layout";
import { LocaleEnum, SearchParamEnum } from "@/lib";
import { AppProvider } from "@/providers";
import StoreProvider from "@/providers/store-provider";
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

  return (
    <AppProvider searchParams={currentSearchParams}>
      <StoreProvider>
        <SidebarLayout className="relative h-full">
          <SidebarLayoutPanel
            width={400}
            variableForAutoCloseOnMobile={
              currentSearchParams[SearchParamEnum.POKE_NAME]
            }
          >
            <PanelContent />
          </SidebarLayoutPanel>
          <SidebarLayoutContent>
            <PokemonDetail
              pokeName={currentSearchParams[SearchParamEnum.POKE_NAME]}
            />
            <UserToolbar className="absolute top-2 right-2" />
          </SidebarLayoutContent>
        </SidebarLayout>
      </StoreProvider>
    </AppProvider>
  );
}
