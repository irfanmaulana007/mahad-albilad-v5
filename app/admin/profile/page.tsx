'use client'

import { Button } from 'components/common/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/common/card'
import { InputDescription, InputField, InputGroup } from 'components/common/input'
import { SkeletonCard } from 'components/common/skeleton'
import { Icons } from 'components/icons'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)

  // Simulate initial data loading
  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false)
    }, 1000)
  }, [])

  const handleBasicInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement profile update logic
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement password update logic
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  if (isPageLoading) {
    return (
      <div className='space-y-6'>
        <SkeletonCard rows={2} />
        <SkeletonCard rows={3} />
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Basic Information */}
      <Card className='shadow-none bg-white'>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBasicInfoSubmit} className='space-y-4'>
            <InputGroup>
              <InputField
                id='name'
                label='Full Name'
                defaultValue='Admin User'
                disabled={isLoading}
              />
              <InputDescription>Your full name</InputDescription>
            </InputGroup>

            <InputGroup>
              <InputField
                id='email'
                type='email'
                label='Email Address'
                disabled={isLoading}
              />
              <InputDescription>Your email address</InputDescription>
            </InputGroup>

            <Button variant='primary' type='submit' disabled={isLoading}>
              {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className='shadow-none bg-white'>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className='space-y-4'>
            <InputGroup>
              <InputField
                id='current-password'
                type='password'
                label='Current Password'
                disabled={isLoading}
              />
              <InputDescription>Enter your current password</InputDescription>
            </InputGroup>

            <InputGroup>
              <InputField
                id='new-password'
                type='password'
                label='New Password'
                disabled={isLoading}
              />
              <InputDescription>Enter your new password</InputDescription>
            </InputGroup>

            <InputGroup>
              <InputField
                id='confirm-password'
                type='password'
                label='Confirm New Password'
                disabled={isLoading}
              />
              <InputDescription>Confirm your new password</InputDescription>
            </InputGroup>

            <Button variant='primary' type='submit' disabled={isLoading}>
              {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
