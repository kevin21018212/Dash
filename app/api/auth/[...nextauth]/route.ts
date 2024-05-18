// @ts-ignore: NextAuth type error
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// @ts-ignore: NextAuth type error
const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});

// @ts-ignore: NextAuth type error
export { handler as GET, handler as POST };
