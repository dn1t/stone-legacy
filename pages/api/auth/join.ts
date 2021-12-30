import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../../lib/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return;

  const prisma = new PrismaClient();

  const { name, email, password } = req.body;

  if (!name || name.trim() === '') return res.status(422).json({ message: '이름이 입력되지 않았습니다.', error: true });
  if (!email || email.trim() === '') return res.status(422).json({ message: '이메일이 입력되지 않았습니다.', error: true });
  if (!password || password.trim() === '') return res.status(422).json({ message: '비밀번호가 입력되지 않았습니다.', error: true });
  if (!email.includes('@')) return res.status(422).json({ message: '이메일 형식이 올바르지 않습니다.', error: true });
  if (password.trim().length < 7) return res.status(422).json({ message: '비밀번호는 7자 이상이어야 합니다.', error: true });

  const userExists = await prisma.user.findUnique({ where: { email }, select: { email: true, name: true } });

  if (userExists) return res.status(422).json({ message: '이미 가입된 이메일입니다.', error: true });

  const hashedPassword = await hashPassword(password);
  const result = await prisma.user.create({ data: { name: name, email: email, password: hashedPassword } });

  if (result) {
    res.status(201).json({ error: false });
  } else {
    res.status(422).json({ message: '오류가 발생했습니다.', error: true });
  }
};

export default handler;
