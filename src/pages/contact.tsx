import { type NextPage } from 'next'

import { Main, Title } from '@bacondotbuild/ui'

import Layout from '@/components/layout'
import { api } from '@/utils/api'

const Contact: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'from contact page' })

  return (
    <Layout title='contact'>
      <Main className='flex flex-col p-4'>
        <div className='flex flex-grow flex-col items-center justify-center space-y-4'>
          <Title>contact</Title>
          {hello.data?.greeting}
        </div>
      </Main>
    </Layout>
  )
}

export default Contact
