import { useState } from 'react'
import { type NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid'
import { Button, Main, Title } from '@bacondotbuild/ui'

import Layout from '@/components/layout'
import { api } from '@/utils/api'

function Messages() {
  const { data: session } = useSession()
  const [message, setMessage] = useState('')

  const utils = api.useContext()

  const { data: messages } = api.guestbook.getAll.useQuery()
  const postMessage = api.guestbook.postMessage.useMutation({
    // https://create.t3.gg/en/usage/trpc#optimistic-updates
    async onMutate(newPost) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.guestbook.getAll.cancel()

      // Get the data from the queryCache
      const prevData = utils.guestbook.getAll.getData()

      // Optimistically update the data with our new post
      utils.guestbook.getAll.setData(undefined, old => {
        return [newPost, ...(old || [])]
      })

      // Return the previous data so we can revert if something goes wrong
      return { prevData }
    },
    onError(err, newPost, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.guestbook.getAll.setData(undefined, ctx?.prevData)
    },
    async onSettled() {
      // Sync with server once mutation has settled
      await utils.guestbook.getAll.invalidate()
    },
  })
  return (
    <div>
      {session ? (
        <>
          <p>hi {session.user?.name}</p>

          <Button
            onClick={() => {
              signOut().catch(err => console.log(err))
            }}
          >
            logout
          </Button>
          <form
            className='space-y-4'
            onSubmit={e => {
              e.preventDefault()
              postMessage.mutate({
                name: session.user?.name ?? '',
                message,
              })

              setMessage('')
            }}
          >
            <input
              className='block w-full bg-cobalt'
              type='text'
              value={message}
              placeholder='Your message...'
              maxLength={100}
              onChange={event => setMessage(event.target.value)}
            />
            <Button type='submit'>submit</Button>
          </form>
        </>
      ) : (
        <Button
          onClick={() => {
            signIn('discord').catch(err => console.log(err))
          }}
        >
          login with discord
        </Button>
      )}
      <div className='bg-cobalt'>
        <h2>messages</h2>
        <ul className='space-y-4'>
          {messages?.map((msg, index) => {
            return (
              <li key={index}>
                <p>{msg.message}</p>
                <span>- {msg.name}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: 'from tRPC' })
  const { data: session } = useSession()

  return (
    <Layout>
      <Main className='flex flex-col p-4'>
        <div className='flex justify-end space-x-4'>
          {session ? (
            <button
              type='button'
              onClick={() => {
                signOut().catch(err => console.log(err))
              }}
            >
              <ArrowLeftOnRectangleIcon className='h-6 w-6' />
            </button>
          ) : (
            <button
              type='button'
              onClick={() => {
                signIn('discord').catch(err => console.log(err))
              }}
            >
              <ArrowRightOnRectangleIcon className='h-6 w-6' />
            </button>
          )}
        </div>
        <div className='flex flex-grow flex-col items-center justify-center space-y-4'>
          <Title>home</Title>
          <Button href='https://github.com/b4conjuice/baconponents'>
            external link
          </Button>
          <Button onClick={() => console.log('click')}>button</Button>
          {hello.data?.greeting}
        </div>
        <Messages />
      </Main>
    </Layout>
  )
}

export default Home
