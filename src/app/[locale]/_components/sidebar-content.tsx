import { Button } from "@/components";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export async function SidebarContent() {
  const { userId } = await auth();

  const isSignedIn = userId !== null;

  return (
    <div className="flex flex-col">
      <div className="p-2">
        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
