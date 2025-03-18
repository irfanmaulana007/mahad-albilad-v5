'use client'

import { Article } from '@prisma/client'
import { Button } from 'components/common/button'
import { TiptapEditor } from 'components/common/editor/tiptap-editor'
import { InputDescription, InputField, InputGroup } from 'components/common/input'
import { toast } from 'components/common/toast/toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ArticleFormProps {
  article?: Article
  onSubmit: (data: Partial<Article>) => void
  isPending?: boolean
}

export function ArticleForm({ article, onSubmit, isPending }: ArticleFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: article?.title || '',
    content: article?.content || '',
    slug: article?.slug || '',
    shortDescription: article?.shortDescription || '',
    thumbnail: article?.thumbnail || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit(formData)
  }

  const handleAddThumbnail = async () => {
    // Create file input element
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = async () => {
      if (!input.files?.length) return

      const file = input.files[0]
      const formDataImage = new FormData()
      formDataImage.append('file', file)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formDataImage,
        })

        const data = await response.json()
        const imageUrl = `${window.location.origin}/${data.url}`

        if (response.ok) {
          setFormData({ ...formData, thumbnail: imageUrl })
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
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-8 max-w-2xl mx-auto pt-6'>
      <div className='space-y-4'>
        <InputGroup>
          <InputField
            label='Title'
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder='Enter article title'
            disabled={isPending}
            required
          />
          <InputDescription>The title of your article</InputDescription>
        </InputGroup>

        <InputGroup>
          <InputField
            label='Short Description'
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            placeholder='Enter a brief description'
            disabled={isPending}
            maxLength={100}
            required
          />
          <InputDescription>A brief summary of your article</InputDescription>
        </InputGroup>

        <div className='flex flex-col w-full'>
          <InputGroup>
            <InputField
              label='Thumbnail'
              value={formData.thumbnail}
              onClick={handleAddThumbnail}
              placeholder='Enter thumbnail URL'
              disabled={isPending}
              className='cursor-pointer'
              readOnly
              required
            />
            <InputDescription>URL of the article thumbnail image</InputDescription>
          </InputGroup>
          {formData.thumbnail && (
            <div className='flex items-center justify-center'>
              <Image src={formData.thumbnail} alt='Article Thumbnail' width={200} height={200} />
            </div>
          )}
        </div>

        <InputGroup>
          <div className='space-y-2'>
            <TiptapEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
            />
          </div>
          <InputDescription>The main content of your article</InputDescription>
        </InputGroup>
      </div>

      <div className='flex items-center justify-end space-x-4 pt-6'>
        <Button
          type='button'
          variant='primaryOutline'
          onClick={() => router.push('/admin/articles')}
          disabled={isPending}>
          Cancel
        </Button>
        <Button type='submit' variant='primary' disabled={isPending}>
          {isPending ? 'Saving...' : article ? 'Save Changes' : 'Create Article'}
        </Button>
      </div>
    </form>
  )
}
