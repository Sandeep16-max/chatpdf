import { Pinecone } from "@pinecone-database/pinecone";
import { convertToASCII } from "@/lib/utils";
import { getEmbeddings } from "@/lib/embeddings";
import { Metadata } from "@/types";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    const client = new Pinecone({
      apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
    });

    const pineconeIndex = await client.index("major");
    const namespace = pineconeIndex.namespace(convertToASCII(fileKey));

    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });

    return queryResult.matches || [];
  } catch (error: any) {
    console.log("error querying embeddings:", error.message);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {
  console.log("Getting context for query: ", query);
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );

  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);

  return docs.join("\n").substring(0, 3000);
}
