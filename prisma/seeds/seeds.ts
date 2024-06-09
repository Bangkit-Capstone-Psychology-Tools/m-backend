import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  await prisma.role.create({
    data: {
      name: 'USER',
      id: 1,
      description: 'User',
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });