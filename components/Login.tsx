import { useCoinbaseWallet , useMetamask } from '@thirdweb-dev/react'
import React from 'react'

function Login() {
    const connectToCoinbaseWallet = useCoinbaseWallet ();
    const connectToMetamask = useMetamask ();

    return (
        <div className='bg-[#091B18] min-h-screen flex flex-col items-center justify-center text-center'>
            <div className='flex flex-col items-center mb-10'>
                <img className='rounded-full w-56 h-56 mb-10' src='./sample.jpg' alt='login-photo' />
                <h1 className='text-5xl text-white font-bold'>Lottery Draw</h1>
                <h2 className='text-white mt-3'>Get started by connecting your wallet.</h2>

                <button
                    className='bg-white px-5 py-3 mt-5 rounded-lg shadow-lg font-bold'
                    onClick={connectToCoinbaseWallet}>
                    Login with Coinbase Wallet
                </button>

                <button
                    className='bg-white px-5 py-3 mt-5 rounded-lg shadow-lg font-bold'
                    onClick={connectToMetamask}>
                    Login with MetaMask
                </button>
            </div>
        </div>
    )
}

export default Login