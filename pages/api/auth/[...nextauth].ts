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
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials?.email),
          },
          select: {
            name: true,
            email: true,
            password: true,
          },
        });

        if (!user) throw new Error('이메일 또는 비밀번호를 다시 확인해주세요.');

        const isValid = await verifyPassword(credentials?.password, user.password);

        if (!isValid) throw new Error('이메일 또는 비밀번호를 다시 확인해주세요.');
        return { name: user.name, email: user.email };
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
        console.log(account);
        token.accessToken = account.access_token;
      }
      console.log(token);
      return token;
    },
  },
});
