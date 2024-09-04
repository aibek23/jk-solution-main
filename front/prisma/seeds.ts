import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const initialUsers = [
  {
    email: 'admin@mail.ru',
    name: 'admin',
    password: 'admin',
    role: Role.ADMIN,
  },
  {
    email: 'user@mail.ru',
    name: 'user',
    password: 'user',
    role: Role.USER,
  },
];

const seed = async () => {
  try {
    await prisma.$executeRaw`TRUNCATE TABLE "Baskets" RESTART IDENTITY CASCADE;`
    await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE;`

    for (const user of initialUsers) {
      const { password, ...userData } = user;
      const hashedPassword = await bcrypt.hash(password, 5);
      await prisma.users.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

seed().catch(e => {
  console.error(e);
  prisma.$disconnect();
}).finally(() => {
  prisma.$disconnect();
});
