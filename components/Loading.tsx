import { PropagateLoader } from 'react-spinners'

function Loading() {
    return (
        <div className='bg-[#091B18] min-h-screen flex flex-col items-center justify-center text-center'>
            <div className='flex items-center space-x-2 mb-10'>
                <img className='rounded-full w-20 h-20' src='./sample.jpg' alt='login-photo' />
                <h1 className='text-lg text-white font-bold'>Loading The Lottery Draw</h1>
            </div>
            <PropagateLoader color='white' size={20} />
        </div>
    )
}

export default Loading