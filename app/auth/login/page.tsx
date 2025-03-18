import { LoginForm } from 'components/auth/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | Dashboard',
  description: 'Login to access your dashboard',
}

export default function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950'>
      <div className='w-full max-w-lg px-4'>
        <LoginForm />
      </div>
    </div>
  )
}
