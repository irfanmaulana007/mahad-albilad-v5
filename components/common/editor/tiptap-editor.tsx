import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
} from 'lucide-react'
import { useCallback } from 'react'
import { Button } from '../button'
import { toast } from '../toast/toast'

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
}

export const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }: { editor: Editor }) => {
      onChange(editor.getHTML())
    },
  })

  const setLink = () => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const addImage = useCallback(() => {
    if (!editor) return

    // Create file input element
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = async () => {
      if (!input.files?.length) return

      const file = input.files[0]
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()
        const imageUrl = `${window.location.origin}/${data.url}`

        if (response.ok) {
          console.log('editor.chain().focus(): ', editor.chain().focus())
          editor.chain().focus().setImage({ src: imageUrl }).run()
        } else {
          console.error('Upload failed:', data.error)
          toast({
            title: 'Failed to upload image',
            description: data.error,
            variant: 'danger',
          })
        }
      } catch (error) {
        console.error('Upload error:', error)
        toast({
          title: 'Failed to upload image',
          description: 'Please try again',
          variant: 'danger',
        })
      }
    }

    input.click()
  }, [editor])

  if (!editor) {
    return null
  }
  return (
    <div className='border rounded-lg overflow-hidden'>
      <div className='bg-slate-50 p-2 border-b flex flex-wrap gap-1'>
        <div className='flex items-center gap-1 pr-2 border-r'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 h-8 w-8 ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
            title='Bold'>
            <Bold className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 h-8 w-8 ${editor.isActive('italic') ? 'bg-slate-200' : ''}`}
            title='Italic'>
            <Italic className='h-4 w-4' />
          </Button>
        </div>

        <div className='flex items-center gap-1 px-2 border-r'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 h-8 w-8 ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : ''}`}
            title='Heading 1'>
            <Heading1 className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 h-8 w-8 ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}`}
            title='Heading 2'>
            <Heading2 className='h-4 w-4' />
          </Button>
        </div>

        <div className='flex items-center gap-1 px-2 border-r'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 h-8 w-8 ${editor.isActive('bulletList') ? 'bg-slate-200' : ''}`}
            title='Bullet List'>
            <List className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 h-8 w-8 ${editor.isActive('orderedList') ? 'bg-slate-200' : ''}`}
            title='Numbered List'>
            <ListOrdered className='h-4 w-4' />
          </Button>
        </div>

        <div className='flex items-center gap-1 px-2 border-r'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 h-8 w-8 ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200' : ''}`}
            title='Align Left'>
            <AlignLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 h-8 w-8 ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200' : ''}`}
            title='Align Center'>
            <AlignCenter className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 h-8 w-8 ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200' : ''}`}
            title='Align Right'>
            <AlignRight className='h-4 w-4' />
          </Button>
        </div>

        <div className='flex items-center gap-1 px-2 border-r'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 h-8 w-8 ${editor.isActive('blockquote') ? 'bg-slate-200' : ''}`}
            title='Quote'>
            <Quote className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={setLink}
            className={`p-2 h-8 w-8 ${editor.isActive('link') ? 'bg-slate-200' : ''}`}
            title='Add Link'>
            <LinkIcon className='h-4 w-4' />
          </Button>
        </div>
        <Button
          variant='ghost'
          size='sm'
          onClick={addImage}
          className={`p-2 h-8 w-8 ${editor.isActive('image') ? 'bg-slate-200' : ''}`}
          title='Add Image'>
          <ImageIcon className='h-4 w-4' />
        </Button>
      </div>

      <div className='px-4'>
        <EditorContent editor={editor} className='prose max-w-none focus:outline-none ' />
      </div>
    </div>
  )
}
