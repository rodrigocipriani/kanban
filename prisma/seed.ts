import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      id: '82a3bc8f-c619-4028-85d8-dc32cbc78267',
      email: 'admin@admin.com',
      name: 'Admin',
      password: '$2a$12$lxb8Ywvg6iQI938W9ujwM.RXsvVozLP2HsaZfexK72PqCqKIx5tCO',
    },
  })

  console.log({ admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
