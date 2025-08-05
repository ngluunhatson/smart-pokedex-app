import { Button, DarkModeToggle, ThemePicker } from "@/components";
import { api } from "@/convex/_generated/api";
import { LocaleEnum } from "@/lib";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { getTranslations } from "next-intl/server";
import { LocalePicker } from "./locale-picker";
import { UpdateButton } from "./update-button";

export async function UserToolbar({
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children">) {
  const t = await getTranslations("main-page.user-toolbar");
  const { isAuthenticated, userId } = await auth();
  const userInfo = isAuthenticated
    ? await fetchMutation(api.user_info.createOrGetUserInfo, {
        clerkUserId: userId,
      })
    : null;

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

      {isAuthenticated && userInfo?.role === "admin" && <UpdateButton />}

      {isAuthenticated ? (
        <UserButton />
      ) : (
        <SignInButton>
          <Button variant="outline">{t("sign-in-button-text")}</Button>
        </SignInButton>
      )}
    </div>
  );
}
