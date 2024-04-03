'use client'

import Link from 'next/link'

import { Title } from 'ui'
import { copyToClipboard } from 'lib'

import { Button } from '@/components/ui'
import utils from '@/lib/lib'

function CopyToClipboard() {
  return (
    <Button
      type='button'
      onClick={() => {
        copyToClipboard('hello world')
      }}
    >
      copy
    </Button>
  )
}

function Fetcher() {
  return <div>fetcher</div>
}

function UseForm() {
  return <div>useForm</div>
}

function UseLocalStorage() {
  return <div>useLocalStorage</div>
}

function UseSearch() {
  return <div>useSearch</div>
}

const utilsToComponents: Record<string, React.FC> = {
  copyToClipboard: CopyToClipboard,
  fetcher: Fetcher,
  useForm: UseForm,
  useLocalStorage: UseLocalStorage,
  useSearch: UseSearch,
}

export default function Utils({ util }: { util: string }) {
  const currentUtil = utils.find(u => u === util)
  if (!currentUtil) {
    return <p>loading</p>
  }
  const Component = utilsToComponents[currentUtil]
  return (
    <>
      <Title>{util}</Title>
      {Component && <Component />}
      <ul className='space-y-4'>
        {utils.map(u => (
          <li key={u}>
            {u === util ? (
              <span>{u}</span>
            ) : (
              <Link
                href={`/${u}`}
                className='text-cb-pink hover:text-cb-pink/75'
              >
                {u}
              </Link>
            )}
          </li>
        ))}
        <li>
          <Link href='/' className='text-cb-pink hover:text-cb-pink/75'>
            home
          </Link>
        </li>
      </ul>
    </>
  )
}
