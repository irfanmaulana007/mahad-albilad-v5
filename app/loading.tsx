export default function Loading() {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin'></div>
        <p className='text-gray-500'>Loading...</p>
      </div>
    </div>
  )
}
