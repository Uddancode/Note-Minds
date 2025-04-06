import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

// const userInput = "INSERT_INPUT_HERE"; // Replace with actual input
// const result = await chatSession.sendMessage(userInput);

// const candidates = result.response.candidates;

// // Process all candidate outputs
// candidates.forEach((candidate, candidateIndex) => {
//   candidate.content.parts.forEach((part, partIndex) => {
//     if (part.inlineData) {
//       try {
//         const fileExt = mime.extension(part.inlineData.mimeType) || "txt";
//         const filename = `output_${candidateIndex}_${partIndex}.${fileExt}`;
//         fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
//         console.log(`Output written to: ${filename}`);
//       } catch (err) {
//         console.error("Error writing file:", err);
//       }
//     }
//   });
// });

// // Print plain text response if available
// if (result.response.text) {
//   console.log("Text Response:", result.response.text());
// }

//run().catch(console.error);


