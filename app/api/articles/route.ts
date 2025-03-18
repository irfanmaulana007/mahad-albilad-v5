import { ActivityTypeEnum } from '@prisma/client'
import { prisma } from 'lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/auth.config'

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: true,
        activities: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const articlesWithActivities = articles.map((article) => {
      return {
        ...article,
        totalViews: article.activities.filter(
          (activity) => activity.action === ActivityTypeEnum.VIEW_ARTICLE,
        ).length,
        totalLikes: article.activities.filter(
          (activity) => activity.action === ActivityTypeEnum.LIKE_ARTICLE,
        ).length,
        totalShares: article.activities.filter(
          (activity) => activity.action === ActivityTypeEnum.SHARE_ARTICLE,
        ).length,
      }
    })

    return NextResponse.json(articlesWithActivities)
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    let slug = body.title.toLowerCase().replace(/ /g, '-')

    const isArticleSlugUnique = await prisma.article.findFirst({
      where: {
        slug: body.slug,
      },
    })

    if (isArticleSlugUnique) {
      slug = slug + '-' + Date.now()
    }

    const article = await prisma.article.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: session.user.id,
        slug: slug,
        shortDescription: body.shortDescription,
        thumbnail: body.thumbnail,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    return NextResponse.json(article)
  } catch (error) {
    console.error('Failed to create article:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
