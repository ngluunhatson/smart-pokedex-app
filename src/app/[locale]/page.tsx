import { Id } from "@/convex/_generated/dataModel";
import {
  SidebarLayout,
  SidebarLayoutContent,
  SidebarLayoutPanel,
} from "@/layouts/sidebar-layout";
import { LocaleEnum, SearchParamsEnum } from "@/lib";
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

  const pokemonId = currentSearchParams[SearchParamsEnum.POKEMON_ID] as
    | Id<"pokemons">
    | undefined;

  return (
    <AppProvider searchParams={currentSearchParams}>
      <StoreProvider>
        <SidebarLayout className="relative h-full">
          <SidebarLayoutPanel
            width={400}
            variableForAutoCloseOnMobile={pokemonId}
          >
            <PanelContent />
          </SidebarLayoutPanel>
          <SidebarLayoutContent>
            <PokemonDetail pokemonId={pokemonId} />
            <UserToolbar className="absolute top-2 right-2" />
          </SidebarLayoutContent>
        </SidebarLayout>
      </StoreProvider>
    </AppProvider>
  );
}
