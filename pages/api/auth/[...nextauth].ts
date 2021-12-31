import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            username: String(credentials?.username),
          },
          select: {
            username: true,
            nickname: true,
            email: true,
            password: true,
            image: true,
          },
        });

        if (!user) throw new Error('아이디 또는 비밀번호를 다시 확인해주세요.');

        const isValid = await verifyPassword(credentials?.password, user.password);

        if (!isValid) throw new Error('아이디 또는 비밀번호를 다시 확인해주세요.');
        return { name: user.username, image: user.image };
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, user, token }) {
      console.log(user);
      return session;
    },
  },
});
