import Link from 'next/link'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

import { Main, Title } from '@/components/ui'

export default function Home() {
  return (
    <Main className='flex flex-col p-4'>
      <div className='flex flex-grow flex-col items-center justify-center space-y-4'>
        <Title>
          <a
            href='https://github.com/bacondotbuild/b4-app/blob/develop/apps/app/README.md#create-b4-app'
            target='_blank'
            className='hover:text-cb-pink'
          >
            b4
          </a>
        </Title>
        <Link
          href='/about'
          className='absolute bottom-4 right-4 hover:text-cb-pink'
        >
          <QuestionMarkCircleIcon className='h-6 w-6 text-cb-pink' />
        </Link>
      </div>
    </Main>
  )
}
