import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = Date.now() + '-' + file.name.replaceAll(' ', '_')

    // Save to public/uploads
    const publicDir = path.join(process.cwd(), 'public', 'uploads')
    await writeFile(path.join(publicDir, filename), buffer)

    return NextResponse.json({
      url: `/uploads/${filename}`,
      message: 'File uploaded successfully',
    })
  } catch (error) {
    console.error('Error uploading file: ', error)
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
}
