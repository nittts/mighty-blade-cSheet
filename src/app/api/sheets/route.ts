import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const connection = await connectToDatabase();
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");

  if (!connection?.mongoClient) {
    return NextResponse.json({ message: "erro ao conectar com o banco de dados" }, { status: 500 });
  }
  const collection = connection.mongoClient.db("sheets").collection("characters");

  const res = await collection.find({ userId }).toArray();

  return NextResponse.json({ message: "fichas encontradas", list: res }, { status: 200 });
}
