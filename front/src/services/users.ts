import { prisma } from '@/lib/prisma';


export function getUserById(id: number) {
  return prisma.users.findUnique({ where: { id } });
}

export function getAllUser() {
  return prisma.users.findMany();
}
