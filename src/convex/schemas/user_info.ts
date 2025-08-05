import { defineTable } from "convex/server";
import { v } from "convex/values";

export const userInfoValidator = v.object({
  clerkUserId: v.string(),
  role: v.union(v.literal("admin"), v.literal("user")),
});

export const userInfoTable = defineTable(userInfoValidator).index(
  "by_clerk_user_id",
  ["clerkUserId"],
);
