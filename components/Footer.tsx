import React from 'react'

function Footer() {
    return (
        <footer className='border-t border-emerald-500/20 flex items-center justify-between text-white p-3'>
            <img className='h-10 w-10 filter hue-rotate-90 opacity-20 rounded-full' src='./sample.jpg' alt='footer' />
            <p className='text-xs text-emerald-900 pl-3'>Ⓒ2022 All right received!</p>
        </footer>
    )
}

export default Footer