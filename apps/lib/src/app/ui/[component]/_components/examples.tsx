'use client'

import {
  DocumentDuplicateIcon,
  ListBulletIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'

import {
  Title,
  Button,
  Footer,
  FooterListItem,
  DragDropList,
  Markdown,
} from 'ui'
import { copyToClipboard, useLocalStorage } from 'lib'

export function TitleComponent() {
  return (
    <>
      <Title>
        <span>default title</span>
      </Title>
      <Title className='text-cb-mint'>
        <span>title with className</span>
      </Title>
    </>
  )
}

export function ButtonComponent() {
  return (
    <>
      <Button
        onClick={() => {
          alert('clicked')
        }}
      >
        default
      </Button>
      <Button
        backgroundColorClassName='bg-cobalt'
        onClick={() => {
          alert('clicked')
        }}
      >
        with <code>backgroundColorClassName</code>
      </Button>
    </>
  )
}

export function FooterComponent() {
  const [mode, setMode] = useLocalStorage<'text' | 'list'>('mode', 'text')
  return (
    <Footer>
      {mode === 'list' ? (
        <FooterListItem onClick={() => setMode('text')}>
          <PencilSquareIcon className='h-6 w-6' />
        </FooterListItem>
      ) : (
        <FooterListItem onClick={() => setMode('list')}>
          <ListBulletIcon className='h-6 w-6' />
        </FooterListItem>
      )}
      <FooterListItem
        onClick={() => {
          copyToClipboard('copy to clipboard in footer test')
        }}
      >
        <DocumentDuplicateIcon className='h-6 w-6' />
      </FooterListItem>
    </Footer>
  )
}

export function DragDropListComponent() {
  const [body, setBody] = useLocalStorage<string>(
    'dragDropList',
    'popeyes\njack in the box\ntaco bell\nwing stop\nraising canes'
  )
  const textAsList = (body ?? '').split('\n')
  return (
    <DragDropList
      items={textAsList
        // .filter(item => item)
        .map((item, index) => ({ id: `${item}-${index}`, item }))}
      renderItem={({ item }: { item: string }, index: number) => (
        <div key={index} className='rounded-lg bg-cobalt p-3'>
          {index + 1}. {item}
        </div>
      )}
      setItems={(newItems: Array<{ item: string }>) => {
        setBody(newItems.map(({ item }) => item).join('\n'))
      }}
      listContainerClassName='space-y-3'
    />
  )
}

export function MarkdownComponent() {
  return <Markdown content='<h1>hello world</h1>' />
}
