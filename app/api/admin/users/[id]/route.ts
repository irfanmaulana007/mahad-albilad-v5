import { prisma } from 'lib/prisma'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../../auth/[...nextauth]/auth.config'

export async function GET(request: NextRequest, ...args: unknown[]) {
  const context = args[0] as { params: { id: string } }
  const params = context.params

  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('[USER_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(request: NextRequest, ...args: unknown[]) {
  try {
    const context = args[0] as { params: { id: string } }
    const params = context.params

    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { name, email, role } = body

    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        name,
        email,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('[USER_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
