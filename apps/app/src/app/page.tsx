import Main from '@/app/_components/main'
import { Title } from '@/components/ui'
import CopyButton from './_components/copy-button'

export default function Home() {
  return (
    <Main className='flex flex-col p-4'>
      <div className='flex flex-grow flex-col items-center justify-center space-y-4'>
        <Title>home</Title>
        <CopyButton />
      </div>
    </Main>
  )
}
