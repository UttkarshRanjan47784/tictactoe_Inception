import React from 'react'

export default function Header() {
  return (
    <div className='bg-slate-700 text-gray-300 flex justify-between'>
        <div className='p-3'>Tic Tac Toe Inception</div>
        <button className='hover:bg-gray-900 p-3'>Dark Mode</button>
    </div>
  )
}
