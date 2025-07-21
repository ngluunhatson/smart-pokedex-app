import {
  Button,
  DarkModeToggle,
  LocalePicker,
  ThemePicker,
} from "@/components";
import { SidebarLayout } from "@/layouts/sidebar-layout";
import { LocaleEnum } from "@/lib";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { SidebarContent } from "./_components/sidebar-content";

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

  const { offset, limit, pokeFormId } = await searchParams;

  const currentOffSet =
    typeof offset === "string" && !isNaN(parseInt(offset))
      ? parseInt(offset)
      : 0;
  const currentLimit =
    typeof limit === "string" && !isNaN(parseInt(limit))
      ? parseInt(limit)
      : 100;

  const currentId = typeof pokeFormId === "string" ? pokeFormId : undefined;

  return (
    <SidebarLayout
      className="relative h-full"
      sidebar={{
        variableForAutoCloseOnMobile: currentId,
        children: (
          <SidebarContent
            currentOffSet={currentOffSet}
            currentLimit={currentLimit}
          />
        ),
      }}
    >
      Content
      <div className="absolute top-2 right-2 flex gap-2">
        <ThemePicker dropdownLabel={t("theme-picker-title")} />
        <DarkModeToggle />
        <LocalePicker
          localeTitleMap={{
            [LocaleEnum.EN]: "English",
            [LocaleEnum.VI]: "Tiếng Việt",
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
    </SidebarLayout>
  );
}
