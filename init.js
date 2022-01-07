/** @type {import('@prisma/client').PrismaClient}*/
const prisma = new (require('@prisma/client').PrismaClient)();
const { join } = require('path');
const { existsSync, mkdirSync } = require('fs');

prisma.category.upsert({ where: { name: 'main' }, update: {}, create: { name: 'main' } }).then(() => prisma.$disconnect());

const uploads = join(process.cwd(), './public/uploads/');
if (!existsSync(uploads)) mkdirSync(uploads);
