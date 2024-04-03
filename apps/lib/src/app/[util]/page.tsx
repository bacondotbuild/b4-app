import { Main } from '@/components/ui'
import Utils from './utils'

export default function UtilPage({ params }: { params: { util: string } }) {
  return (
    <Main className='flex flex-col p-4'>
      <div className='flex flex-grow flex-col items-center justify-center space-y-4'>
        <Utils util={params.util} />
      </div>
    </Main>
  )
}
