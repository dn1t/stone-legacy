import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../../lib/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return;

  const prisma = new PrismaClient();
  const { username, nickname, email, password } = req.body;

  if (!username || username.trim() === '') return res.status(422).json({ message: '아이디가 입력되지 않았습니다.', error: true });
  if (!nickname || nickname.trim() === '') return res.status(422).json({ message: '이름이 입력되지 않았습니다.', error: true });
  if (!email || email.trim() === '') return res.status(422).json({ message: '이메일이 입력되지 않았습니다.', error: true });
  if (!password || password.trim() === '') return res.status(422).json({ message: '비밀번호가 입력되지 않았습니다.', error: true });
  if (username.length < 5 || username.length > 16 || !/^[a-zA-z0-9]{5,16}$/.test(username))
    return res.status(422).json({ message: '아이디는 5자 이상, 16자 이하의 영어 대소문자 또는 숫자로 이루어져야 합니다.', error: true });
  if (password.trim().length < 7 || password.trim().length > 64 || !/^[a-zA-z0-9]{7,64}$/.test(password))
    return res.status(422).json({ message: '비밀번호는 7자 이상, 64자 이하의 영어 대소문자 또는 숫자로 이루어져야 합니다.', error: true });
  if (!email.includes('@') || !/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(email))
    return res.status(422).json({ message: '이메일이 올바르지 않습니다.', error: true });

  const userExists = await prisma.user.findUnique({ where: { username }, select: { username: true } });

  if (userExists) return res.status(422).json({ message: '이미 존재하는 아이디입니다.', error: true });

  const hashedPassword = await hashPassword(password);
  const result = await prisma.user.create({ data: { username, nickname, email: email, password: hashedPassword } });

  if (result) {
    res.status(201).json({ error: false });
  } else {
    res.status(422).json({ message: '오류가 발생했습니다.', error: true });
  }
};

export default handler;
