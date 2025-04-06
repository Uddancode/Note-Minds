import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});


export  const savePdffile=mutation({
    args:{
        fileId: v.string(),
        storageId: v.string(),
        fileName: v.string(),           
        createdBy: v.string(),
        fileUrl: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert('pdfFiles', {
            fileId: args.fileId,
            storageId: args.storageId,
            fileName: args.fileName,
            createdBy: args.createdBy,
            fileUrl: args.fileUrl,
            })
        return "File uploaded succcessfully"
    }
})

export const  getPdfUrl=mutation({
    args:{
        fileId: v.string(),
        storageId: v.string(),
    },
    handler: async (ctx, args) => {
        const url = await ctx.storage.getUrl(args.storageId);
        return url;
    }
})

export const getPdfFile=query({
    args:{
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        const file = await ctx.db.query('pdfFiles').filter((q)=>q.eq(q.field('fileId'),args.fileId)).collect();
        console.log(file);
        return file[0];
    }
})

export const getUserFiles = query({
    args: {
        userEmail:v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        if(!args?.userEmail){
            return [];
        }
        const files = await ctx.db.query("pdfFiles")
        .filter((q) => q.eq(q.field("createdBy"), args?.userEmail)).collect();
        
        return  files;
    }
})
