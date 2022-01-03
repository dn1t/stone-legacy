import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { extname, join } from 'path';

const uploads = join(process.cwd(), './public/uploads/');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploads),
  filename: (_req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise((resolve) => {
    const mw: any = multer({
      storage,
      fileFilter: (_req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExts = ['.png', '.jpg', '.jpeg', '.webp'];
        if (!allowedExts.includes(ext)) {
          return cb(new Error(`업로드 가능한 파일 형식: ${allowedExts.join(', ')}`));
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1048576, // 1024KiB
      },
    }).any();

    mw(req, res, resolve);
  });

  res.status(200).json({
    body: req.body,
    // @ts-ignore
    files: req.files,
  });
};

export const config = { api: { bodyParser: false } };

export default handler;
