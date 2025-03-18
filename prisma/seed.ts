import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('asd123', 12)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@email.com',
      name: 'Admin User',
      password,
      role: 'ADMIN',
    },
  })

  // const seedArticle = async () => {
  //   await prisma.article.createMany({
  //     data: [
  //       {
  //         title: 'Article 1',
  //         content: 'Article 1',
  //         authorId: admin.id,
  //         slug: 'article-1',
  //         shortDescription:
  //           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  //         thumbnail: '1738226225578-923177362.webp',
  //         createdAt: new Date('2025-01-01'),
  //       },
  //       {
  //         title: 'Article 2',
  //         content: 'Article 2',
  //         authorId: admin.id,
  //         slug: 'article-2',
  //         shortDescription:
  //           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  //         thumbnail: '1738226225578-923177362.webp',
  //         createdAt: new Date('2025-01-02'),
  //       },
  //       {
  //         title: 'Article 3',
  //         content: 'Article 3',
  //         authorId: admin.id,
  //         slug: 'article-3',
  //         shortDescription:
  //           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  //         thumbnail: '1738226225578-923177362.webp',
  //         createdAt: new Date('2025-01-03'),
  //       },
  //       {
  //         title: 'Article 4',
  //         content: 'Article 4',
  //         authorId: admin.id,
  //         slug: 'article-4',
  //         shortDescription:
  //           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  //         thumbnail: '1738226225578-923177362.webp',
  //         createdAt: new Date('2025-01-04'),
  //       },
  //       {
  //         title: 'Article 5',
  //         content: 'Article 5',
  //         authorId: admin.id,
  //         slug: 'article-5',
  //         shortDescription:
  //           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  //         thumbnail: '1738226225578-923177362.webp',
  //         createdAt: new Date('2025-01-05'),
  //       },
  //     ],
  //   })

  //   const seedActivity = async () => {
  //     await prisma.activity.createMany({
  //       data: [
  //         {
  //           articleId: 1,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-01'),
  //         },
  //         {
  //           articleId: 1,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-01'),
  //         },
  //         {
  //           articleId: 1,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-01'),
  //         },
  //         {
  //           articleId: 2,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-02'),
  //         },
  //         {
  //           articleId: 3,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-03'),
  //         },
  //         {
  //           articleId: 4,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-03'),
  //         },
  //         {
  //           articleId: 4,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-03'),
  //         },
  //         {
  //           articleId: 4,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-04'),
  //         },
  //         {
  //           articleId: 4,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-04'),
  //         },
  //         {
  //           articleId: 4,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-05'),
  //         },
  //         {
  //           articleId: 4,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-06'),
  //         },
  //         {
  //           articleId: 5,
  //           action: 'VIEW_ARTICLE',
  //           createdAt: new Date('2025-01-07'),
  //         },
  //       ],
  //     })
  //   }
  // }

  // await seedArticle()
  // await seedActivity()
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
