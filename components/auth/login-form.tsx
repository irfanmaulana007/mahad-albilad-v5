'use client'

import { Role } from '@prisma/client'
import { Button } from 'components/common/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/common/card'
import { InputDescription, InputField, InputGroup } from 'components/common/input'
import { Icons } from 'components/icons'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useAuthStore from '../../stores/useAuthStore'

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const { data: session } = useSession()
  const { setUser } = useAuthStore()

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name || null,
        email: session.user.email || '',
        role: (session.user.role as Role) || 'USER',
        createdAt: new Date().toISOString(), // This is a fallback, ideally should come from the session
      })
    }
  }, [session, setUser])

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    const form = event.target as HTMLFormElement
    const email = form.email.value
    const password = form.password.value

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/admin/articles',
      })

      if (!result) {
        setError('An unexpected error occurred')
        setIsLoading(false)
        return
      }

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      if (result.url) {
        router.push(result.url)
      } else {
        router.push('/admin/articles')
      }
      router.refresh()
    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <Card className='border-zinc-200 shadow-sm dark:border-zinc-800'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-center text-xl font-semibold text-zinc-900 dark:text-zinc-50'>
          Sign in to your account
        </CardTitle>
        <CardDescription className='text-center text-zinc-500 dark:text-zinc-400'>
          Enter your email and password to access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className='space-y-4'>
          {error && (
            <div className='rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/10'>
              {error}
            </div>
          )}
          <div className='space-y-2'>
            <InputGroup>
              <InputField id='email' type='email' label='Email' disabled={isLoading} required />
              <InputDescription>Enter your email to sign in</InputDescription>
            </InputGroup>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center justify-end'>
              <Button variant='text' size='compact' tabIndex={-1}>
                Forgot password?
              </Button>
            </div>
            <InputGroup>
              <InputField
                id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                required
              />
              <InputDescription>Enter your password to sign in</InputDescription>
            </InputGroup>
          </div>
          <Button variant='primary' block disabled={isLoading}>
            {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Sign In
          </Button>
          <div className='text-center text-sm text-zinc-500 dark:text-zinc-400'>
            Don&apos;t have an account?{' '}
            <Button variant='text' size='compact'>
              Sign up
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
