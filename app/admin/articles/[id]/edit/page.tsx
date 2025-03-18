'use client'

import { Article } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Breadcrumb } from 'components/common/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from 'components/common/card'
import { toast } from 'components/common/toast/toast'
import { PermissionView } from 'components/layout/admin/permission/view'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { ArticleService } from 'services/article.service'
import { MODULE_PERMISSIONS_ENUM, PERMISSIONS } from '../../../../../constants/permission'
import { usePermission } from '../../../../../hooks/usePermission'
import { ArticleForm } from '../../components/article-form'

interface EditArticlePageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = use(params)
  const router = useRouter()
  const queryClient = useQueryClient()
  const permissions = usePermission(MODULE_PERMISSIONS_ENUM.ARTICLES)
  const hasUpdatePermission = permissions.find(
    (permission) => permission.key === PERMISSIONS.UPDATE_ARTICLES.key,
  )

  const { data: article, isLoading: isLoadingArticle } = useQuery({
    queryKey: ['article', id],
    queryFn: () => ArticleService.getById(id),
    enabled: !!hasUpdatePermission && !!id,
  })

  const { mutate: updateArticle, isPending } = useMutation({
    mutationFn: (data: Partial<Article>) => ArticleService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      queryClient.invalidateQueries({ queryKey: ['article', id] })
      toast({
        title: 'Article updated successfully',
      })
      router.push('/admin/articles')
    },
    onError: (error) => {
      toast({
        title: 'Failed to update article',
        description: error.message || 'Failed to update article',
        variant: 'danger',
      })
    },
  })

  const breadcrumbItems = [
    { label: 'Articles', href: '/admin/articles' },
    { label: 'Article Details', href: `/admin/articles/${id}` },
    { label: 'Edit Article' },
  ]

  if (!hasUpdatePermission) {
    return <PermissionView />
  }

  return (
    <>
      <div className='mb-4'>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <Card className='shadow-none bg-white'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Edit Article</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingArticle ? (
            <div className='space-y-4'>
              <div className='h-12 w-full animate-pulse rounded-md bg-gray-200' />
              <div className='h-12 w-full animate-pulse rounded-md bg-gray-200' />
              <div className='h-12 w-full animate-pulse rounded-md bg-gray-200' />
            </div>
          ) : article ? (
            <ArticleForm article={article} onSubmit={updateArticle} isPending={isPending} />
          ) : (
            <div className='text-center text-gray-500'>Article not found</div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
