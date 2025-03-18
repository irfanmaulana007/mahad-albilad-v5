'use client'

import { useQuery } from '@tanstack/react-query'
import { Breadcrumb } from 'components/common/breadcrumb'
import { Button } from 'components/common/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/common/card'
import { PermissionView } from 'components/layout/admin/permission/view'
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { userService } from 'services/users'
import { MODULE_PERMISSIONS_ENUM, PERMISSIONS } from '../../../../constants/permission'
import { usePermission } from '../../../../hooks/usePermission'

interface UserDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const permissions = usePermission(MODULE_PERMISSIONS_ENUM.USERS)
  const hasViewPermission = permissions.find(
    (permission) => permission.key === PERMISSIONS.VIEW_USERS.key,
  )

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getById(id),
    enabled: !!hasViewPermission && !!id,
  })

  const breadcrumbItems = [{ label: 'Users', href: '/admin/users' }, { label: 'User Details' }]

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
          <CardTitle>User Details</CardTitle>
          <Button variant='primary' onClick={() => router.push(`/admin/users/${id}/edit`)}>
            <Pencil className='mr-2 h-4 w-4' />
            Edit User
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='space-y-4'>
              <div className='h-6 w-1/4 animate-pulse rounded-md bg-gray-200' />
              <div className='h-6 w-1/3 animate-pulse rounded-md bg-gray-200' />
              <div className='h-6 w-1/2 animate-pulse rounded-md bg-gray-200' />
            </div>
          ) : user ? (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Name</h3>
                  <p className='mt-1 text-sm'>{user.name || 'N/A'}</p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Email</h3>
                  <p className='mt-1 text-sm'>{user.email}</p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Role</h3>
                  <p className='mt-1 text-sm'>{user.role}</p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-500'>Created At</h3>
                  <p className='mt-1 text-sm'>{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center text-gray-500'>User not found</div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
