// import { NextResponse } from "next/server";
// import { pipeline } from "@xenova/transformers";

// // Declare the pipeline variable
// let embeddingPipeline: any = null;

// // Function to initialize the pipeline and return a Promise
// async function initializePipeline() {
//   if (!embeddingPipeline) {
//     embeddingPipeline = await pipeline(
//       "feature-extraction",
//       "Xenova/all-MiniLM-L6-v2"
//     );
//   }
// }

// export async function POST(req: Request) {
//   console.log("Inside the embedding API endpoint");

//   try {
//     // Initialize the embedding pipeline before processing the request
//     await initializePipeline();

//     // Parse the request body
//     const body = await req.json();
//     const { text } = body;

//     console.log("Text:", text);
//     if (!text) {
//       return NextResponse.json({ error: "No text provided" }, { status: 400 });
//     }

//     // Generate embeddings using the pre-loaded pipeline
//     const embeddings = await embeddingPipeline(text);

//     // Return success response with embeddings
//     return NextResponse.json(
//       { embedding: embeddings.data[0] },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error in embedding API:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
