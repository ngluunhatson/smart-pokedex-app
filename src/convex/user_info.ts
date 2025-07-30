import { query } from "@/convex/_generated/server";
import { v } from "convex/values";

export const getUserInfo = query({
  args: {
    clerkUserId: v.optional(v.string()), // for server side
  },
  handler: async (ctx, args) => {
    const clerkUser = await ctx.auth.getUserIdentity();

    let id = args.clerkUserId;
    if (!id) {
      id = clerkUser?.subject;
    }

    if (!id) {
      return null;
    }

    return await ctx.db
      .query("user_info")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", id))
      .first();
  },
});
