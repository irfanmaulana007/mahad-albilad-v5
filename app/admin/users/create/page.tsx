'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Breadcrumb } from 'components/common/breadcrumb'
import { Button } from 'components/common/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/common/card'
import { InputField } from 'components/common/input'
import { toast } from 'components/common/toast/toast'
import { PermissionView } from 'components/layout/admin/permission/view'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { userService } from 'services/users'
import { MODULE_PERMISSIONS_ENUM, PERMISSIONS } from '../../../../constants/permission'
import { usePermission } from '../../../../hooks/usePermission'

export default function CreateUserPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const permissions = usePermission(MODULE_PERMISSIONS_ENUM.USERS)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  })

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast({
        title: 'User created successfully',
        variant: 'default',
      })
      router.push('/admin/users')
    },
    onError: (error) => {
      toast({
        title: 'Failed to create user',
        description: error.message || 'Failed to create user',
        variant: 'danger',
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUser(formData)
  }

  const hasCreatePermission = permissions.some((p) => p.key === PERMISSIONS.CREATE_USERS.key)

  if (!hasCreatePermission) {
    return <PermissionView />
  }

  const breadcrumbItems = [{ label: 'Users', href: '/admin/users' }, { label: 'Create User' }]

  return (
    <div className=''>
      <div className='flex items-center justify-between'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <Card className='shadow-lg bg-white border border-gray-100'>
        <CardHeader className='border-b space-y-1 pb-6'>
          <CardTitle>Create New User</CardTitle>
          <p className='text-sm text-gray-500'>
            Add a new user to the system with specific role and permissions.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-8 max-w-2xl mx-auto pt-6'>
            <div className='space-y-4'>
              <div className='relative'>
                <select
                  className='w-full rounded-md border border-input bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-10 transition-colors'
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                  <option value='USER'>Regular User</option>
                  <option value='ADMIN'>Administrator</option>
                </select>
              </div>
              <div className='relative'>
                <InputField
                  label='Name'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter user's full name"
                  required
                />
              </div>
              <div className='relative'>
                <InputField
                  label='Email'
                  type='email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter user's email address"
                  required
                />
              </div>

              <div className='relative'>
                <InputField
                  label='Password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter user's password"
                  required
                />
              </div>
            </div>

            <div className='flex items-center justify-end space-x-4 pt-6'>
              <Button
                type='button'
                variant='primaryOutline'
                onClick={() => router.push('/admin/users')}
                className='flex items-center space-x-2'>
                <span>Cancel</span>
              </Button>
              <Button
                type='submit'
                variant='primary'
                disabled={isPending}
                className='flex items-center space-x-2'>
                <span>{isPending ? 'Creating...' : 'Create User'}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
