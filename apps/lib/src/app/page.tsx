import Link from 'next/link'

import { Main, Title } from '@/components/ui'
import utils from '@/lib/lib'

export default function Home() {
  return (
    <Main className='flex flex-col p-4'>
      <div className='flex flex-grow flex-col items-center justify-center space-y-4'>
        <Title>lib</Title>
        <ul className='space-y-4'>
          {utils.map(util => (
            <li key={util}>
              <Link
                href={`/${util}`}
                className='text-cb-pink hover:text-cb-pink/75'
              >
                {util}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Main>
  )
}
