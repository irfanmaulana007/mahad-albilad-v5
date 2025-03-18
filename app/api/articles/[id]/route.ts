import { ActivityTypeEnum } from '@prisma/client'
import { prisma } from 'lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/auth.config'

export async function GET(request: NextRequest, ...args: unknown[]) {
  const context = args[0] as { params: { id: string } }
  const params = context.params

  const articleId = parseInt(params.id, 10)

  if (isNaN(articleId)) {
    return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 })
  }

  try {
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
      include: {
        author: true,
        activities: true,
      },
    })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const articleWithActivities = {
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

    return NextResponse.json(articleWithActivities)
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, ...args: unknown[]) {
  const context = args[0] as { params: { id: string } }
  const params = context.params

  const articleId = parseInt(params.id, 10)

  if (isNaN(articleId)) {
    return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 })
  }

  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const article = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title: body.title,
        content: body.content,
        slug: body.slug,
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
    console.error('Failed to update article:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, ...args: unknown[]) {
  const context = args[0] as { params: { id: string } }
  const params = context.params

  const articleId = parseInt(params.id, 10)

  if (isNaN(articleId)) {
    return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 })
  }

  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.article.delete({
      where: {
        id: articleId,
      },
    })
    return NextResponse.json({ message: 'Article deleted successfully' })
  } catch (error) {
    console.error('Failed to delete article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
