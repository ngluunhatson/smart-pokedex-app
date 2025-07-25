import { Button, DarkModeToggle, ThemePicker } from "@/components";
import { LocaleEnum } from "@/lib";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { LocalePicker } from "./locale-picker";

export async function UserToolbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = await getTranslations("main-page.user-toolbar");
  const { userId } = await auth();
  const isSignedIn = userId !== null;
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
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
          <Button variant="outline">{t("sign-in-button-text")}</Button>
        </SignInButton>
      )}
    </div>
  );
}
