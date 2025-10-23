import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { getDb } from "./lib/dbHelper";
import { Author } from "./lib/types";
import { WithId } from "mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile?.id) return false;

      const db = await getDb();
      const authors = db.collection("authors");

      const existingUser = await authors.findOne({
        githubId: String(profile.id),
      });

      if (!existingUser) {
        await authors.insertOne({
          githubId: String(profile.id),
          name: user?.name ?? null,
          username: profile?.login ?? null,
          email: user?.email ?? null,
          image: user?.image ?? null,
          bio: profile?.bio ?? null,
          createdAt: new Date(),
        });
      }
      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const db = await getDb();
        const authors = db.collection("authors");
        const user = await authors.findOne<WithId<Author>>({
          githubId: String(profile.id),
        });
        token.id = user?._id;
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
