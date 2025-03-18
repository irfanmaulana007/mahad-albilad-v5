'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Breadcrumb } from 'components/common/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from 'components/common/card'
import { toast } from 'components/common/toast/toast'
import { PermissionView } from 'components/layout/admin/permission/view'
import { useRouter } from 'next/navigation'
import { ArticleService } from 'services/article.service'
import { MODULE_PERMISSIONS_ENUM, PERMISSIONS } from '../../../../constants/permission'
import { usePermission } from '../../../../hooks/usePermission'
import { ArticleForm } from '../components/article-form'

export default function CreateArticlePage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const permissions = usePermission(MODULE_PERMISSIONS_ENUM.ARTICLES)
  const hasCreatePermission = permissions.find(
    (permission) => permission.key === PERMISSIONS.CREATE_ARTICLES.key,
  )

  const { mutate: createArticle, isPending } = useMutation({
    mutationFn: ArticleService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      toast({
        title: 'Article created successfully',
      })
      router.push('/admin/articles')
    },
    onError: (error) => {
      toast({
        title: 'Failed to create article',
        description: error.message || 'Failed to create article',
        variant: 'danger',
      })
    },
  })

  const breadcrumbItems = [
    { label: 'Articles', href: '/admin/articles' },
    { label: 'Create Article' },
  ]

  if (!hasCreatePermission) {
    return <PermissionView />
  }

  return (
    <>
      <div className='mb-4'>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <Card className='shadow-none bg-white'>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
          <p className='text-sm text-gray-500'>Create a new article to share with your readers.</p>
        </CardHeader>
        <CardContent>
          <ArticleForm onSubmit={createArticle} isPending={isPending} />
        </CardContent>
      </Card>
    </>
  )
}
