import { prisma } from 'lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, role } = body

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 })
  }
}
