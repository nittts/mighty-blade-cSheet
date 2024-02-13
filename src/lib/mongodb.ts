import { Db, MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let mongoClient: MongoClient | null = null;

if (!process.env.NEXT_ATLAS_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export async function connectToDatabase() {
  try {
    if (mongoClient) {
      return { mongoClient };
    }

    mongoClient = await new MongoClient(uri as string, options as MongoClientOptions).connect();

    return { mongoClient };
  } catch (e) {
    console.error(e);
  }
}
