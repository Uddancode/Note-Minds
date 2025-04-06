import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        email: v.string(),
        imageUrl: v.string(),
        userName: v.string(),
        phoneNumber: v.string(),
    },
    handler: async (ctx, args) => {
      
        
        const existingUser = await ctx.db
            .query('users')
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();

       if(user?.length){
       await ctx.db.insert('users',{
        email:args.email,
        imageUrl:args.imageUrl,
        userName:args.userName,
        phoneNumber:args.phoneNumber,
        isPro:false
       })
       }

       return "Inserted new user successfully"

    },
});

export const updateUserToPro = mutation({
    args:{
        email:v.string()
    },
    handler:async(ctx,args)=>{
        const user = await ctx.db
            .query('users')
            .filter((q)=>q.eq(q.field('email'),args.email))
            .collect();

        if(user?.length){
            await ctx.db.patch(user[0]._id,{
                isPro:true
            })
            return "User upgraded to Pro"
        }
        return "User not found"
    }
})

export const getUserByEmail = query({
    args:{
        email:v.optional(v.string())
    },
    handler:async(ctx,args)=>{
        if(!args.email){
            return null;
        }
        const user = await ctx.db
            .query('users')
            .filter((q)=>q.eq(q.field('email'),args.email))
            .collect();

        return user[0];
    }
})  
