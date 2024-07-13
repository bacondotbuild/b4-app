import Link from 'next/link'

import { utils } from '@/lib/common'

export default function Utils() {
  return (
    <>
      <ul className='space-y-4'>
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
    </>
  )
}
