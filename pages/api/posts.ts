import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(400).send('Bad Request');

  const prisma = new PrismaClient();
  let { category, display, offset } = req.query as { category: string | string[]; display: string | string[] | number; offset: string | string[] | number };
  if (typeof category !== 'string') return res.status(400).json({ message: 'category 인자가 제공되지 않았습니다.', error: true });
  if (typeof display !== 'string') return res.status(400).json({ message: 'display 인자가 제공되지 않았습니다.', error: true });
  if (typeof offset !== 'string') return res.status(400).json({ message: 'offset 인자가 제공되지 않았습니다.', error: true });

  display = Number(display);
  offset = Number(offset);
  if (Number.isNaN(display)) return res.status(400).json({ message: 'display 인자가 올바르지 않습니다.', error: true });
  if (Number.isNaN(offset)) return res.status(400).json({ message: 'offset 인자가 올바르지 않습니다.', error: true });

  const posts = await prisma.post.findMany({ where: { category } });

  console.log(posts);

  res.send('zz');
};

export default handler;
