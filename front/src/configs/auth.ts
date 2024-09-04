import { getAllUser } from '@/services/users';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt' ;
import Credentials from 'next-auth/providers/credentials';
import { Role } from '@prisma/client';
import type { AuthOptions, User as NextAuthUser } from 'next-auth';


interface User extends NextAuthUser {
  role?: string;
}
interface SessionUser {
  name?: string | null;
  email?: string | null;
  role: Role;
}

export const authConfig:AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }), Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) return null;
        const users = await getAllUser();
        console.log(users,'users')

        const currentUser = users.find(user => user.email === credentials.email);

        if (!currentUser) return null;

        const passwordMatch = await bcrypt.compare(credentials.password, currentUser.password);
        if (passwordMatch) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPass } = currentUser;

          return userWithoutPass as User;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user) {
        token.role = (user as User).role;
      }
      return token;
    },
    session({ session, token }) {
      const sessionUser = session.user as SessionUser;
      sessionUser.role = token.role as Role;
      return session;
    },
  },
  pages: { signIn: '/signin' },
};
