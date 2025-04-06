import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

import { v } from "convex/values";

import { TaskType } from "@google/generative-ai";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    

    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: 'AIzaSyD2RUEWVHTLVyHHWIbDjhyEMpGxls47DAY',
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "Action completed successfully";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: 'AIzaSyD2RUEWVHTLVyHHWIbDjhyEMpGxls47DAY',
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }), { ctx });

    const results = await vectorStore.similaritySearch(args.query, 1);
    console.log("Raw results:", results);
    
    // Return only the content
    const contentOnly = results.map(result => result.pageContent);
    console.log("Content only:", contentOnly);
    
    return contentOnly;
  },
});