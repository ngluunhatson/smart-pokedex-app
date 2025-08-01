import { mutation } from "@/convex/_generated/server";
import { v } from "convex/values";
import { getUserInfo } from "./utils";

export const createOrGetUserInfo = mutation({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const userInfo = await getUserInfo(ctx, args.clerkUserId);

    if (userInfo) {
      return userInfo;
    }
    const newUserInfoId = await ctx.db.insert("user_info", {
      clerkUserId: args.clerkUserId,
      role: "user",
    });

    return await ctx.db.get(newUserInfoId);
  },
});
