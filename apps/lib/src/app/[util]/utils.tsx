'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { copyToClipboard, fetcher } from 'lib'

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

type Repo = {
  id: number
  name: string
  html_url: string
  homepage: string
}

function Fetcher() {
  const [repos, setRepos] = useState([] as Repo[])

  useEffect(() => {
    async function fetchRepos() {
      const res: Repo[] = await fetcher<Repo[]>(
        'https://api.github.com/users/bacondotbuild/repos?sort=updated'
      )
      const newRepos = res.map(repo => ({
        id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        homepage: repo.homepage,
      }))
      setRepos(newRepos)
    }
    void fetchRepos()
  }, [])

  if (!repos || repos.length === 0) {
    return <p>fetching...</p>
  }
  return (
    <ul className='divide-y divide-cb-dusty-blue'>
      <li className='flex items-center py-4 first:pt-0'>
        <span className='grow text-lg'>repo</span>
        <span className='text-lg'>link</span>
      </li>
      {repos.map(repo => (
        <li key={repo.id} className='flex items-center py-4 first:pt-0'>
          <a
            className='grow text-xl text-cb-pink hover:text-cb-pink/75'
            href={repo.html_url}
            target='_blank'
            rel='noopener noreferrer'
          >
            {repo.name}
          </a>
          <a
            className='text-cb-pink hover:text-cb-pink/75'
            href={repo.homepage}
            target='_blank'
            rel='noopener noreferrer'
          >
            {repo.homepage}
          </a>
        </li>
      ))}
    </ul>
  )
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
      <ul className='flex space-x-4'>
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
      </ul>
      {Component && <Component />}
    </>
  )
}
