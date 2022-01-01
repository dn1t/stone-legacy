import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const prisma = new PrismaClient();
    let { category, display, offset } = req.query as { category: string | string[]; display: string | string[] | number; offset: string | string[] | number };
    if (typeof category !== 'string') return res.status(400).json({ message: 'category 인자가 제공되지 않았습니다.', error: true });
    if (typeof display !== 'string') return res.status(400).json({ message: 'display 인자가 제공되지 않았습니다.', error: true });
    if (typeof offset !== 'string') return res.status(400).json({ message: 'offset 인자가 제공되지 않았습니다.', error: true });

    display = Number(display);
    offset = Number(offset);
    if (Number.isNaN(display)) return res.status(400).json({ message: 'display 인자가 올바르지 않습니다.', error: true });
    if (Number.isNaN(offset)) return res.status(400).json({ message: 'offset 인자가 올바르지 않습니다.', error: true });

    const posts = (await prisma.post.findMany({ where: { category }, include: { author: true } })).map((post) => ({
      id: post.id,
      content: post.content,
      image: post.image,
      category: post.category,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: { username: post.author.username, nickname: post.author.nickname, image: post.author.image },
    }));

    res.json({ data: posts, error: false });
  } else if (req.method === 'POST') {
    const prisma = new PrismaClient();
    const session = await getSession({ req });
    if (!session || !session.user || !session.user.name) return res.status(401).json({ message: '인증되지 않았습니다.', error: true });

    let { content, image, category } = req.body;
    if (typeof content !== 'string') return res.status(400).json({ message: 'content 인자가 제공되지 않았습니다.', error: true });
    if (typeof image !== 'string') return res.status(400).json({ message: 'image 인자가 제공되지 않았습니다.', error: true });
    if (typeof category !== 'string') return res.status(400).json({ message: 'category 인자가 제공되지 않았습니다.', error: true });
    if (content.length > 25565) return res.status(400).json({ message: 'content 인자의 길이는 25565자를 넘을 수 없습니다.', error: true });
    if (image.length > 1024) return res.status(400).json({ message: 'content 인자의 길이는 1024자를 넘을 수 없습니다.', error: true });
    if (category.length > 128) return res.status(400).json({ message: 'category 인자의 길이는 128자를 넘을 수 없습니다.', error: true });

    const createPostRes = await prisma.post.create({
      data: { author: { connect: { username: session.user.name } }, category, content, image },
      include: { author: true },
    });

    const data = {
      id: createPostRes.id,
      content: createPostRes.content,
      image: createPostRes.image,
      category: createPostRes.category,
      createdAt: createPostRes.createdAt,
      updatedAt: createPostRes.updatedAt,
      author: { username: createPostRes.author.username, nickname: createPostRes.author.nickname, image: createPostRes.author.image },
    };

    console.log(data);

    res.json({ zz: 'zz' });
  } else return res.status(400).send('Bad Request');
};

export default handler;