import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const SaveNotes = mutation({
    args: {
        fileId: v.string(),
        notes: v.any(),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        const record = await ctx.db.query("notes").filter((q) => q.eq(q.field("fileId"), args.fileId)).collect();

        if(record?.length==0)
        {
            await ctx.db.insert("notes",{
                fileId: args.fileId,
                notes: args.notes,
                createdBy: args.createdBy,
            })
        }
        else{
            await ctx.db.patch(record[0]._id,{
                notes: args.notes,
            })
        }
    }
})


export const fetchNotes = query({
    args: {
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        const record = await ctx.db.query("notes").filter((q) => q.eq(q.field("fileId"), args.fileId)).collect();
        return record[0]?.notes;
    }
})
