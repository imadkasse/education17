// app/api/register/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectDb";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }
    const { db } = await connectToDatabase();

    // البحث عن المستخدم
    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }
    // التحقق من كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // // إنشاء توكن JWT
    // const token = jwt.sign(
    //   { username: user.username },
    //   process.env.JWT_SECRET!,
    //   { expiresIn: "1h" }
    // );

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
    
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
