'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import {
  copyToClipboard,
  fetcher,
  useForm,
  useLocalStorage,
  useSearch,
} from 'lib'

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
  const [leagueName, setLeagueName] = useState('')
  const [itemsAsArray, setItemsAsArray] = useState([] as string[])
  const [teamsAsArray, setTeamsAsArray] = useState([] as string[])
  const initialDraft = {
    title: 'untitled',
    items: '',
    teams: '',
  }
  const { values, handleChange, handleSubmit, isSubmitting, dirty } = useForm({
    initialValues: {
      title: initialDraft.title,
      items: initialDraft.items,
      teams: initialDraft.teams,
    },
    onSubmit: (
      { title, items: newItems, teams: newTeams },
      { setSubmitting }
    ) => {
      setLeagueName(title as string)
      setItemsAsArray((newItems as string).split('\n'))
      setTeamsAsArray((newTeams as string).split('\n'))
      setSubmitting(false)
    },
  })

  const { title, items, teams } = values

  const teamsCount = teamsAsArray.length
  const league = itemsAsArray.reduce<string[][]>((finalItems, item, index) => {
    const round = Math.ceil((index + 1) / teamsCount)
    const teamIndex =
      round % 2 === 1
        ? index % teamsCount
        : teamsCount - 1 - (index % teamsCount)
    if (finalItems[teamIndex]) {
      finalItems[teamIndex]?.push(
        `${index + 1} ${item} (${round}-${(index % teamsCount) + 1})`
      )
    } else {
      finalItems[teamIndex] = [
        `${index + 1} ${item} (${round}-${(index % teamsCount) + 1})`,
      ]
    }
    return finalItems
  }, [])
  return (
    <div>
      <form className='space-y-2'>
        <h2>title</h2>
        <input
          className='w-full bg-cobalt'
          type='text'
          name='title'
          value={title as string}
          onChange={handleChange}
        />
        <h2>items</h2>
        <textarea
          className='w-full bg-cobalt'
          name='items'
          value={items as string}
          onChange={handleChange}
        />
        <h2>teams</h2>
        <textarea
          className='w-full bg-cobalt'
          name='teams'
          value={teams as string}
          onChange={handleChange}
        />
        <Button
          className='disabled:pointer-events-none disabled:opacity-25'
          type='submit'
          onClick={handleSubmit}
          disabled={!dirty || isSubmitting}
        >
          save
        </Button>
      </form>
      <h2>league{leagueName ? `: ${leagueName}` : ''}</h2>
      {leagueName && itemsAsArray.length > 0 && teamsAsArray.length > 0 && (
        <>
          <h2>drafted</h2>
          <ol className='list-decimal pl-8'>
            {itemsAsArray.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
          <ul className='grid grid-cols-2 gap-4 md:grid-cols-3'>
            {league.map((team, index) => (
              <li key={index}>
                <h2>{teamsAsArray[index]}</h2>
                <ul>
                  {team.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function UseLocalStorage() {
  const [text, setText] = useLocalStorage('lib-useLocalStorage-text', '')
  return (
    <textarea
      placeholder='this text is saved to localStorage'
      className='h-full w-full flex-grow bg-cobalt'
      value={text}
      onChange={e => {
        setText(e.target.value)
      }}
    />
  )
}

function UseSearch() {
  const list = [
    { id: '1', title: 'title 1', body: 'body 1' },
    { id: '2', title: 'title 2', body: 'body 2' },
  ]
  const { search, setSearch, results, searchRef } = useSearch({
    initialSearch: '',
    list,
    options: {
      keys: ['title', 'body'],
    },
  })
  return (
    <div className='space-y-4'>
      <input
        ref={searchRef}
        type='text'
        className='w-full bg-cb-blue'
        placeholder='search'
        value={search}
        onChange={e => {
          const { value } = e.target
          setSearch(value)
        }}
      />
      {results?.length && results?.length > 0 ? (
        <ul className='divide-y divide-cb-dusty-blue'>
          {results.map(result => (
            <li key={result.id} className='py-4 first:pt-0'>
              <p>{result.title}</p>
              <p>{result.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>no results</p>
      )}
    </div>
  )
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
