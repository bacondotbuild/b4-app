import Link from 'next/link'

import { Title } from 'ui'

import { Main } from '@/components/ui'
import { ui } from '@/lib/common'

export default function UI() {
  return (
    <Main className='container mx-auto flex max-w-screen-md flex-col p-4 md:px-0'>
      <div className='flex flex-grow flex-col space-y-4'>
        <Link href='/' className='hover:text-cb-pink/75'>
          <Title>lib</Title>
        </Link>
        <ul className='space-y-4'>
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
    </Main>
  )
}