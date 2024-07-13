import Link from 'next/link'

import { Title } from 'ui'

import { Main } from '@/components/ui'
import Utils from './utils'

export default function UtilPage({ params }: { params: { util: string } }) {
  return (
    <Main className='container mx-auto flex max-w-screen-md flex-col p-4 md:px-0'>
      <div className='flex flex-grow flex-col space-y-4'>
        <Link href='/' className='hover:text-cb-pink/75'>
          <Title>lib</Title>
        </Link>
        <Utils util={params.util} />
      </div>
    </Main>
  )
}
