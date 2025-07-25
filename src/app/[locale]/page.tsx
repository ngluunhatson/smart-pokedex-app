import { Button, DarkModeToggle, ThemePicker } from "@/components";
import { PaginationProvider } from "@/contexts/pagination-context";
import {
  SidebarLayout,
  SidebarLayoutContent,
  SidebarLayoutPanel,
} from "@/layouts/sidebar-layout";
import { LocaleEnum } from "@/lib";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { LocalePicker } from "./_components/locale-picker";
import { PanelContent } from "./_components/panel-content";

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: LocaleEnum }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userId } = await auth();
  const t = await getTranslations("main-page");

  const isSignedIn = userId !== null;

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
          <div className="absolute top-2 right-2 flex gap-2">
            <ThemePicker dropdownLabel={t("theme-picker-title")} />
            <DarkModeToggle />
            <LocalePicker
              localeTitleMap={{
                [LocaleEnum.EN]: "English",
                [LocaleEnum.VI]: "Tiếng Việt",
              }}
              dropdownLabel={t("localization-picker-title")}
            />

            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            )}
          </div>
        </SidebarLayoutContent>
      </SidebarLayout>
    </PaginationProvider>
  );
}
