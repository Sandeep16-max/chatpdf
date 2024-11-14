import { getPineconeClient } from "@/lib/pinecone";

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    text.replace(/\n/g, " ");
    const client = getPineconeClient();
    const embeddings = await client.inference.embed(
      "multilingual-e5-large",
      [text],
      { inputType: "passage", truncate: "END" }
    );
    return embeddings.data[0].values as number[];
  } catch (error: any) {
    console.log("Error getting embeddings:", error.message);

    throw error;
  }
}
