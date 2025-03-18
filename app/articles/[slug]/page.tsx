'use client'

import { useQuery } from '@tanstack/react-query'
import { IArticle } from 'components/article-card/type'
import { Button } from 'components/common/button'
import { TiptapContent } from 'components/common/editor/tiptap-content'
import { toast } from 'components/common/toast/toast'
import WhatsappFloating from 'components/common/whatsapp-floating'
import Footer from 'components/layout/footer'
import Navigation from 'components/layout/navigation'
import { format } from 'date-fns'
import { ChevronLeftIcon, HeartIcon, ShareIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { ActivityService } from 'services/activity.service'
import { ArticleService } from 'services/article.service'

export default function ArticlePage() {
  const params = useParams()
  const slug = params?.slug as string

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const {
    data: article,
    isLoading,
    error,
  } = useQuery<IArticle>({
    queryKey: ['article', slug],
    queryFn: () => ArticleService.getBySlug(slug),
  })

  const handleView = useCallback(() => {
    if (!article) return
    ActivityService.trackView(article.id.toString())
  }, [article])

  const handleLike = () => {
    if (!article) return
    ActivityService.trackLike(article.id.toString())
    setIsLiked(true)
  }

  const handleShare = async () => {
    if (!article) return
    ActivityService.trackShare(article.id.toString())
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: 'Link copied to clipboard!',
    })
  }

  if (error) {
    toast({
      title: error.message,
      variant: 'danger',
    })
  }

  useEffect(() => {
    if (!article) return
    handleView()
  }, [article, handleView])

  if (!article) return null
  return (
    <main className='min-h-screen'>
      <Navigation />
      <WhatsappFloating />

      <div className='container mx-auto px-4 py-8 pt-24 min-h-screen'>
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center gap-x-2 text-sm text-gray-500'>
            <Link href='/articles' className='hover:text-gray-700 flex items-center gap-x-1'>
              <ChevronLeftIcon className='w-4 h-4' />
              Artikel
            </Link>
            <span>/</span>
            {isLoading ? (
              <span className='animate-pulse w-32 h-4 bg-gray-200'></span>
            ) : (
              <span className='text-gray-700'>{article.title}</span>
            )}
          </div>

          <div className='flex flex-col gap-y-2'>
            <h1 className='text-2xl font-bold'>{article.title}</h1>
            <div className='flex items-center gap-x-2 text-sm text-gray-500'>
              <span>{article.author.name}</span>
              <span className='w-1 h-1 bg-gray-500 rounded-full' />
              <span>{format(article.createdAt, 'dd MMMM yyyy')}</span>
            </div>
          </div>
          <Image
            src={article.thumbnail || ''}
            alt={article.title}
            width={1000}
            height={1000}
            className='w-full h-96 object-cover rounded-lg'
          />
          <div className='prose max-w-none'>
            <TiptapContent content={article.content || ''} />
          </div>

          <div className='flex items-center justify-center gap-x-4 py-4 border-gray-200 text-sm'>
            <Button
              onClick={handleLike}
              disabled={isLiked}
              variant='ghost'
              className='flex items-center gap-x-2 px-4 py-2 rounded-lg bg-white hover:bg-red-50 disabled:bg-red-50 disabled:cursor-not-allowed group'>
              {isLiked ? (
                <HeartIcon className='w-5 h-5 fill-red-500 stroke-red-500' />
              ) : (
                <HeartIcon className='w-5 h-5 group-hover:stroke-red-500' />
              )}
              <span
                className={`font-medium ${isLiked ? 'text-red-500' : 'group-hover:text-red-500'}`}>
                {isLiked ? 'Liked' : 'Like'}
              </span>
            </Button>

            <Button
              onClick={handleShare}
              variant='ghost'
              className='flex items-center gap-x-2 px-4 py-2 rounded-lg bg-white hover:bg-blue-50 active:bg-blue-100 group'>
              <ShareIcon className='w-5 h-5 group-hover:stroke-blue-500' />
              <span className='font-medium group-hover:text-blue-500'>Share</span>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
