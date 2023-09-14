import { useState } from 'react'
import SignUp from './SignUp'
const HomePage = () => {
  const [page,setPage] = useState(false);

  return (
    <div className="flex w-full h-screen" >
      <div className='w-full flex items-center justify-center lg:w-full'>
        <SignUp page={page} setPage={setPage} /> 
      </div>

      <div className='relative hidden lg:flex h-full w-1/2 bg-gray-200 items-center justify-center'>
          <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full   hover:animate-spin'></div>
          <div className='absolute w-full h-1/2 bg-white/10 backdrop-blur-lg bottom-0'></div>
      </div>
    </div>
  )
}

export default HomePage