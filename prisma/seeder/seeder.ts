import fs from 'fs/promises';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto, RegisterToolDto } from '../../src/dtos';

const prisma = new PrismaClient();

async function seedPsikologiTools() {
  const data = await fs.readFile('prisma/seeder/tools.json', 'utf-8');
  const jsonData: RegisterToolDto[] = JSON.parse(data); // Type the parsed data

  for (const item of jsonData) {
    await prisma.psikologiTools.create({ data: item }); // Replace `user` with your model name
  }

  console.log('Database seeded successfully!');
}

seedPsikologiTools().catch((error) => {
  console.error('Error seeding database:', error);
});
