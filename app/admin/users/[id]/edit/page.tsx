'use client'

import { Role } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Breadcrumb } from 'components/common/breadcrumb'
import { Button } from 'components/common/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/common/card'
import { InputField } from 'components/common/input'
import { toast } from 'components/common/toast/toast'
import { PermissionView } from 'components/layout/admin/permission/view'
import { MODULE_PERMISSIONS_ENUM, PERMISSIONS } from 'constants/permission'
import { usePermission } from 'hooks/usePermission'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { userService } from 'services/users'

interface EditUserPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditUserPage({ params }: EditUserPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const queryClient = useQueryClient()
  const permissions = usePermission(MODULE_PERMISSIONS_ENUM.USERS)
  const hasUpdatePermission = permissions.find(
    (permission) => permission.key === PERMISSIONS.UPDATE_USERS.key,
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  })

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getById(id),
    enabled: !!hasUpdatePermission && !!id,
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email,
        role: user.role,
      })
    }
  }, [user])

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (data: typeof formData) => userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', id] })
      toast({
        title: 'User updated successfully',
      })
      router.push('/admin/users')
    },
    onError: (error) => {
      toast({
        title: 'Failed to update user',
        description: error.message || 'Failed to update user',
        variant: 'danger',
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser(formData)
  }

  const breadcrumbItems = [
    { label: 'Users', href: '/admin/users' },
    { label: 'User Details', href: `/admin/users/${id}` },
    { label: 'Edit User' },
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
          <CardTitle>Edit User</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingUser ? (
            <div className='space-y-4'>
              <div className='h-12 w-full animate-pulse rounded-md bg-gray-200' />
              <div className='h-12 w-full animate-pulse rounded-md bg-gray-200' />
              <div className='h-12 w-full animate-pulse rounded-md bg-gray-200' />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                  disabled={isPending}
                  className='flex h-12 w-full rounded-md border border-light-20 bg-transparent px-4 pt-2 pb-2 text-md text-dark focus:border-primary-10 focus-visible:outline-none disabled:opacity-30'
                  required>
                  <option value=''>Select Role</option>
                  <option value='ADMIN'>Administrator</option>
                  <option value='USER'>Regular User</option>
                </select>
              </div>
              <div className='space-y-2'>
                <InputField
                  label='Name'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isPending}
                />
              </div>
              <div className='space-y-2'>
                <InputField
                  label='Email'
                  type='email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isPending}
                  required
                />
              </div>
              <div className='flex justify-end gap-4'>
                <Button type='button' variant='primaryOutline' onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type='submit' variant='primary' disabled={isPending}>
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </>
  )
}
