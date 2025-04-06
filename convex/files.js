import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const updateFile = mutation({
  args: {
    id: v.id("files"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;

    const existingFile = await ctx.db.get(args.id);

    if (!existingFile) {
      throw new Error("File not found");
    }

    if (existingFile.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.id, {
      content: args.content,
    });

    return existingFile;
  },
}); 