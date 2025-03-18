import { Button } from 'components/common/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/common/card'
import { ShieldOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const PermissionView = () => {
  const router = useRouter()

  return (
    <div className='flex min-h-[calc(100vh-5rem)] items-center justify-center p-4'>
      <Card className='w-full max-w-md shadow-none bg-white'>
        <CardHeader className='text-center pb-2'>
          <div className='mx-auto mb-4 rounded-full bg-red-100 p-3 w-fit'>
            <ShieldOff className='h-6 w-6 text-red-600' />
          </div>
          <CardTitle className='text-xl text-red-600'>Access Denied</CardTitle>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-gray-600 mb-6'>
            You don&apos;t have the required permissions to access this page. Please contact your
            administrator if you believe this is a mistake.
          </p>
          <Button variant='primary' onClick={() => router.back()}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
