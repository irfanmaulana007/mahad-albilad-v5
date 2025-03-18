'use client'

import { useQuery } from '@tanstack/react-query'
import { Breadcrumb } from 'components/common/breadcrumb'
import { Button } from 'components/common/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/common/card'
import { TiptapContent } from 'components/common/editor/tiptap-content'
import { PermissionView } from 'components/layout/admin/permission/view'
import { format } from 'date-fns'
import { Pencil } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { ArticleService } from 'services/article.service'
import { MODULE_PERMISSIONS_ENUM, PERMISSIONS } from '../../../../constants/permission'
import { usePermission } from '../../../../hooks/usePermission'

interface ArticleDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ArticleDetailsPage({ params }: ArticleDetailsPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const permissions = usePermission(MODULE_PERMISSIONS_ENUM.ARTICLES)
  const hasViewPermission = permissions.find(
    (permission) => permission.key === PERMISSIONS.VIEW_ARTICLES.key,
  )
  const hasUpdatePermission = permissions.find(
    (permission) => permission.key === PERMISSIONS.UPDATE_ARTICLES.key,
  )

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => ArticleService.getById(id),
    enabled: !!hasViewPermission && !!id,
  })

  const breadcrumbItems = [
    { label: 'Articles', href: '/admin/articles' },
    { label: 'Article Details' },
  ]

  if (!hasViewPermission) {
    return <PermissionView />
  }

  return (
    <>
      <div className='mb-4'>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <Card className='shadow-none bg-white'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Article Details</CardTitle>
          {hasUpdatePermission && (
            <Button variant='primary' onClick={() => router.push(`/admin/articles/${id}/edit`)}>
              <Pencil className='mr-2 h-4 w-4' />
              Edit Article
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='space-y-4'>
              <div className='h-6 w-1/4 animate-pulse rounded-md bg-gray-200' />
              <div className='h-6 w-1/3 animate-pulse rounded-md bg-gray-200' />
              <div className='h-6 w-1/2 animate-pulse rounded-md bg-gray-200' />
            </div>
          ) : article ? (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Title</h3>
                  <p className='mt-1 text-sm'>{article.title || 'N/A'}</p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Author</h3>
                  <p className='mt-1 text-sm'>{article.author?.name || 'N/A'}</p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Short Description</h3>
                  <p className='mt-1 text-sm'>{article.shortDescription || 'N/A'}</p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Created At</h3>
                  <p className='mt-1 text-sm'>{format(article.createdAt, 'dd/MM/yyyy')}</p>
                </div>
              </div>

              <div className='bg-gray-50 rounded-lg p-6'>
                <h3 className='text-base font-semibold text-gray-900 mb-4'>Article Performance</h3>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
                    <h4 className='text-sm font-medium text-gray-500'>Views</h4>
                    <p className='text-2xl font-bold text-primary mt-1'>{article.totalViews}</p>
                  </div>
                  <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
                    <h4 className='text-sm font-medium text-gray-500'>Likes</h4>
                    <p className='text-2xl font-bold text-primary mt-1'>{article.totalLikes}</p>
                  </div>
                  <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
                    <h4 className='text-sm font-medium text-gray-500'>Shares</h4>
                    <p className='text-2xl font-bold text-primary mt-1'>{article.totalShares}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='text-sm font-medium text-gray-500'>Thumbnail</h3>
                <Image
                  src={article.thumbnail || ''}
                  alt='Article Thumbnail'
                  width={200}
                  height={200}
                />
              </div>

              <div>
                <h3 className='text-sm font-medium text-gray-500'>Content</h3>
                <div className='mt-1 border border-gray-200 rounded-md p-4'>
                  <TiptapContent content={article.content || ''} />
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center text-gray-500'>Article not found</div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
