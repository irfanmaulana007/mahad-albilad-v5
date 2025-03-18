'use client'

import { useQuery } from '@tanstack/react-query'
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
import { PermissionView } from 'components/layout/admin/permission/view'
import { cn } from 'lib/utils'
import { ChevronDown, ChevronUp, MoreVertical, Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { userService } from 'services/users'
import type { SortConfig, SortKey, User } from 'types/user'
import { MODULE_PERMISSIONS_ENUM, PERMISSIONS } from '../../../constants/permission'
import { usePermission } from '../../../hooks/usePermission'

export default function UsersPage() {
  const permissions = usePermission(MODULE_PERMISSIONS_ENUM.USERS)
  const hasViewPermission = permissions.find(
    (permission) => permission.key === PERMISSIONS.VIEW_USERS.key,
  )

  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  })
  const itemsPerPage = 10

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<User[]>({
    enabled: !!hasViewPermission,
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  const router = useRouter()

  // Sorting function
  const sortData = (data: User[]) => {
    if (sortConfig.key === 'actions') return data
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof User] ?? ''
      const bValue = b[sortConfig.key as keyof User] ?? ''

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  // Filtering function
  const filterData = (data: User[]) => {
    return data.filter((user) =>
      Object.values(user).some((value) =>
        (value?.toString() ?? '').toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }

  // Handle sorting
  const handleSort = (key: SortKey) => {
    if (key === 'actions') return
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  // Process data
  const filteredData = filterData(users)
  const sortedData = sortData(filteredData)

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  // Column configuration
  const columns: { key: SortKey | 'actions'; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Created At' },
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
            <CardTitle>Users</CardTitle>

            <Link href='/admin/users/create'>
              <Button variant='primary'>Create User</Button>
            </Link>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-sm text-muted-foreground'>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)}{' '}
              of {sortedData.length} entries
            </div>
            <div className='relative'>
              <InputField
                placeholder='Search users...'
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
            Error loading users. Please try again later.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      key={column.key}
                      className={cn(
                        'cursor-pointer',
                        {
                          'text-primary-10': sortConfig.key === column.key,
                        },
                        { 'cursor-default': column.key === 'actions' },
                      )}
                      onClick={() => handleSort(column.key as SortKey)}>
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
                  paginatedData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className='font-medium'>{user.name || 'N/A'}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
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
                                onClick={() => router.push(`/admin/users/${user.id}`)}>
                                View details
                              </div>
                              <div
                                className='w-full p-2 hover:bg-primary/10 rounded-sm cursor-pointer'
                                onClick={() => router.push(`/admin/users/${user.id}/edit`)}>
                                Edit
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
