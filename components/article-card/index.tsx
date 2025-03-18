import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { IArticleCard } from './type'

export default function ArticleCard({ article }: IArticleCard) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl h-full'>
        <div className='relative h-48'>
          <Image
            src={article.thumbnail}
            alt={`${article.title} thumbnail`}
            fill
            className='object-cover'
          />
        </div>
        <div className='p-6'>
          <h3 className='font-semibold text-lg'>{article.title}</h3>
          <div className='flex items-center justify-between text-xs text-gray-500 mb-3'>
            <span className='mr-3'>{article.author.name}</span>
            <span>{format(article.createdAt, 'dd MMMM yyyy')}</span>
          </div>
          <p className='text-gray-600 mb-4 line-clamp-3'>{article.shortDescription}</p>
          <span className='text-emerald-600 font-semibold inline-flex items-center text-sm'>
            Baca Selengkapnya
            <svg
              className='w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
