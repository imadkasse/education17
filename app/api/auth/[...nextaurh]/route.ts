import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/connectDb";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { ObjectId } from "mongodb";

interface User {
  id: string;
  username: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();

        // البحث عن المستخدم في قاعدة البيانات
        const user = await db
          .collection("users")
          .findOne({ username: credentials?.username });

        // تحقق من صحة كلمة المرور
        if (
          user &&
          (await bcrypt.compare(credentials?.password || "", user.password))
        ) {
          // تحويل ObjectId إلى string
          const userId = (user._id as ObjectId).toString();
          return { id: userId, username: user.username } as User;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin", // الصفحة المخصصة لتسجيل الدخول
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
