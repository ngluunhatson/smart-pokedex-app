import { GenericQueryCtx } from "convex/server";
import { DataModel } from "./_generated/dataModel";

export const getUserInfo = async (
  ctx: GenericQueryCtx<DataModel>,
  inputClerkUserId?: string,
) => {
  const clerkUser = await ctx.auth.getUserIdentity();

  let clerkUserId = inputClerkUserId;
  if (clerkUser) {
    clerkUserId = clerkUser.subject;
  }

  if (!clerkUserId) {
    return null;
  }

  const userInfo = await ctx.db
    .query("user_info")
    .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
    .unique()
    .catch((err) => {
      console.error(err);
      return null;
    });

  return userInfo;
};
