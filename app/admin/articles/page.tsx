'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IArticle } from 'components/article-card/type'
import { Button } from 'components/common/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/common/card'
import { InputField } from 'components/common/input'
import { Popover, PopoverContent, PopoverTrigger } from 'components/common/popover'
import { SkeletonTable } from 'components/common/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/common/table'
import { toast } from 'components/common/toast/toast'
import { PermissionView } from 'components/layout/admin/permission/view'
import { format } from 'date-fns'
import { cn } from 'lib/utils'
import { ChevronDown, ChevronUp, MoreVertical, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArticleService } from 'services/article.service'
import { MODULE_PERMISSIONS_ENUM, PERMISSIONS } from '../../../constants/permission'
import { usePermission } from '../../../hooks/usePermission'

export default function ArticlesPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const permissions = usePermission(MODULE_PERMISSIONS_ENUM.ARTICLES)
  const hasViewPermission = permissions.find(
    (permission) => permission.key === PERMISSIONS.VIEW_ARTICLES.key,
  )

  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof IArticle | null
    direction: 'asc' | 'desc'
  }>({
    key: null,
    direction: 'asc',
  })
  const itemsPerPage = 10

  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery<IArticle[]>({
    queryKey: ['articles'],
    queryFn: ArticleService.getAll,
    enabled: !!hasViewPermission,
  })

  const { mutate: deleteArticle } = useMutation({
    mutationFn: ArticleService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete article',
        variant: 'danger',
      })
    },
  })

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this article?')) {
      deleteArticle(id.toString())
    }
  }

  // Sorting function
  const sortData = (data: IArticle[]) => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof IArticle] ?? ''
      const bValue = b[sortConfig.key as keyof IArticle] ?? ''

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  // Handle sorting
  const handleSort = (key: keyof IArticle) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  // Filter articles based on search query
  const filteredArticles = articles.filter((article) =>
    Object.values(article).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  // Process data
  const sortedArticles = sortData(filteredArticles)

  // Pagination
  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedArticles = sortedArticles.slice(startIndex, startIndex + itemsPerPage)

  // Column configuration
  const columns: { key: keyof IArticle | 'actions'; label: string }[] = [
    { key: 'title', label: 'Title' },
    { key: 'authorId', label: 'Author' },
    { key: 'shortDescription', label: 'Short Description' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'totalViews', label: 'Views' },
    { key: 'totalLikes', label: 'Likes' },
    { key: 'totalShares', label: 'Shares' },
    { key: 'actions', label: '' },
  ]

  if (!hasViewPermission) {
    return <PermissionView />
  }

  return (
    <Card className='shadow-none bg-white'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <div className='flex flex-col gap-y-4 w-full'>
          <div className='flex justify-between items-center'>
            <CardTitle>Articles</CardTitle>
            <Button variant='primary' onClick={() => router.push('/admin/articles/create')}>
              Create Article
            </Button>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-sm text-muted-foreground'>
              Showing {startIndex + 1} to{' '}
              {Math.min(startIndex + itemsPerPage, sortedArticles.length)} of{' '}
              {sortedArticles.length} entries
            </div>
            <div className='relative'>
              <InputField
                placeholder='Search articles...'
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className='w-64'
              />
              <Search className='absolute right-2 top-2.5 h-4 w-4 text-muted-foreground' />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className='text-center text-red-500 py-4'>
            Error loading articles. Please try again later.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      key={column.key as string}
                      className={cn(
                        'cursor-pointer',
                        {
                          'text-primary-10': sortConfig.key === column.key,
                        },
                        { 'cursor-default': column.key === 'actions' },
                      )}
                      onClick={() =>
                        column.key !== 'actions' && handleSort(column.key as keyof IArticle)
                      }>
                      <div className='flex items-center space-x-1'>
                        <span>{column.label}</span>
                        {sortConfig.key === column.key &&
                          (sortConfig.direction === 'asc' ? (
                            <ChevronUp className='h-4 w-4' />
                          ) : (
                            <ChevronDown className='h-4 w-4' />
                          ))}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <SkeletonTable rows={5} columns={4} />
                ) : (
                  paginatedArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className='font-medium'>{article.title}</TableCell>
                      <TableCell className='max-w-md truncate'>{article.authorId}</TableCell>
                      <TableCell className='max-w-md truncate'>
                        {article.shortDescription}
                      </TableCell>
                      <TableCell className='whitespace-nowrap'>
                        {format(article.createdAt, 'dd-MM-yyyy')}
                      </TableCell>
                      <TableCell>{article.totalViews}</TableCell>
                      <TableCell>{article.totalLikes}</TableCell>
                      <TableCell>{article.totalShares}</TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                              <span className='sr-only'>Open menu</span>
                              <MoreVertical className='h-4 w-4' />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align='end' className='w-[160px]'>
                            <div className='grid gap-1'>
                              <div
                                className='w-full p-2 hover:bg-primary/10 rounded-sm cursor-pointer'
                                onClick={() => router.push(`/admin/articles/${article.id}`)}>
                                View details
                              </div>
                              <div
                                className='w-full p-2 hover:bg-primary/10 rounded-sm cursor-pointer'
                                onClick={() => router.push(`/admin/articles/${article.id}/edit`)}>
                                Edit
                              </div>
                              <div
                                className='w-full p-2 hover:bg-danger/10 rounded-sm cursor-pointer text-danger'
                                onClick={() => handleDelete(article.id)}>
                                Delete
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className='flex items-center justify-end space-x-2 py-4'>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='primaryOutline'
                  size='sm'
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}>
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'primary' : 'primaryOutline'}
                    size='sm'
                    onClick={() => setCurrentPage(page)}>
                    {page}
                  </Button>
                ))}
                <Button
                  variant='primaryOutline'
                  size='sm'
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
