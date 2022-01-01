/** @type {import('@prisma/client').PrismaClient}*/
const prisma = new (require('@prisma/client').PrismaClient)();

prisma.category.upsert({ where: { name: 'main' }, update: {}, create: { name: 'main' } }).then(console.log);
