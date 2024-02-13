import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const connection = await connectToDatabase();

  // LOGIN
  const body = await request.json();

  if (!body.login) {
    return NextResponse.json({ message: "Entre com o nome do usuário!" }, { status: 401 });
  }

  if (!connection?.mongoClient) {
    return NextResponse.json({ message: "erro ao conectar com o banco de dados" }, { status: 500 });
  }
  const collection = connection.mongoClient.db("users").collection("login");

  const res = await collection.findOne({ login: body.login });

  if (Object.keys(res || {}).length === 0) {
    return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
  }

  return NextResponse.json({ message: `Bem vindo(a) de volta, ${res?.name}`, user: res }, { status: 200 });
}

// Em um array de prioridades, você está sempre na posição 0 meu bem 🧡💜
