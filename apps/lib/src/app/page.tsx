import Link from 'next/link'

import { utils, ui } from '@/lib/common'

export default function Home() {
  return (
    <>
      <div className='w-full space-y-4'>
        <Link href='/utils' className='text-cb-pink hover:text-cb-pink/75'>
          utils
        </Link>
        <ul className='ms-4 space-y-4'>
          {utils.map(util => (
            <li key={util}>
              <Link
                href={`/utils/${util}`}
                className='text-cb-pink hover:text-cb-pink/75'
              >
                {util}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full space-y-4'>
        <Link href='/ui' className='text-cb-pink hover:text-cb-pink/75'>
          ui
        </Link>
        <ul className='ms-4 space-y-4'>
          {ui.map(component => (
            <li key={component}>
              <Link
                href={`/ui/${component}`}
                className='text-cb-pink hover:text-cb-pink/75'
              >
                {component}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
