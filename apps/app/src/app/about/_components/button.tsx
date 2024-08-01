'use client'

import { copyToClipboard } from 'lib'

export default function Button({ name, hex }: { name: string; hex: string }) {
  return (
    <button
      className='flex-grow p-4'
      type='button'
      onClick={() => {
        copyToClipboard(hex)
      }}
    >
      <div className='leading-none'>{name}</div>
      <div className='text-sm md:text-2xl'>{hex}</div>
    </button>
  )
}
