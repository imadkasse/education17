import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "users";

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

if (!dbName) {
  throw new Error("Missing MONGODB_DB environment variable");
}

const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    // محاولة الاتصال بقاعدة البيانات
    await client.connect();
    const db = client.db(dbName);
    return { db, client };
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
