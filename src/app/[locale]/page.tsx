import {
  Button,
  DarkModeToggle,
  LocalePicker,
  ThemePicker,
} from "@/components";
import { SidebarLayout } from "@/layouts/sidebar-layout";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { SidebarContent } from "./_components/sidebar-content";

export default async function Home() {
  const { userId } = await auth();

  const isSignedIn = userId !== null;

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
