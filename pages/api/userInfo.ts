import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return;

  const prisma = new PrismaClient();
  const { username } = req.query;
  if (typeof username !== 'string') return res.status(400).json({ message: 'username 인자가 제공되지 않았습니다.', error: true });

  const user = await prisma.user.findUnique({
    where: { username },
    select: { username: true, nickname: true, email: true, emailPublic: true, bio: true, image: true, banner: true, createdAt: true },
  });
  if (user === null) return res.status(404).json({ message: '존재하지 않는 유저입니다.', error: true });

  res.status(200).send({
    data: {
      username: user.username,
      nickname: user.nickname,
      email: user.emailPublic ? user.email : undefined,
      bio: user.bio,
      image: user.image,
      banner: user.banner,
      createdAt: user.createdAt,
    },
    error: false,
  });
};

export default handler;
