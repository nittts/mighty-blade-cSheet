import { connectToDatabase } from "@/lib/mongodb";
import { v4 } from "uuid";
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

export async function POST(req: Request) {
  const connection = await connectToDatabase();

  const body = await req.json();
  const id = v4();

  if (!connection?.mongoClient) {
    return NextResponse.json({ message: "erro ao conectar com o banco de dados" }, { status: 500 });
  }
  const collection = connection.mongoClient.db("sheets").collection("characters");

  const res = await collection.insertOne({ ...body, id });

  return NextResponse.json({ message: "Ficha criada", newSheet: { ...body, id } }, { status: 200 });
}

export async function DELETE(req: Request) {
  const connection = await connectToDatabase();
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (!connection?.mongoClient) {
    return NextResponse.json({ message: "erro ao conectar com o banco de dados" }, { status: 500 });
  }
  const collection = connection.mongoClient.db("sheets").collection("characters");

  const res = await collection.deleteOne({ id });

  return NextResponse.json({ message: "Ficha criada", deleted: res }, { status: 200 });
}
