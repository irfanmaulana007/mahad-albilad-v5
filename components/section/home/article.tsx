import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import ArticleCard from 'components/article-card'
import { IArticle } from 'components/article-card/type'
import { toast } from 'components/common/toast/toast'
import { ArticleService } from 'services/article.service'

export default function ArticleSection() {
  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery<IArticle[]>({
    queryKey: ['articles'],
    queryFn: ArticleService.getAll,
  })

  if (error) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'danger',
    })
  }
  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-semibold text-center mb-12'>Artikel Terbaru</h2>
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className='aspect-[5/4] w-full bg-gray-200 animate-pulse rounded-lg'></div>
              ))
            : articles
                .slice(0, 6)
                .map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
        <div className='text-center'>
          <Link
            href='/articles'
            className='inline-block border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-2 rounded-full transition-colors'>
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  )
}
