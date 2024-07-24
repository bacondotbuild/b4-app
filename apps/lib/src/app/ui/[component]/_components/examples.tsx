'use client'

import { useState } from 'react'
import {
  DocumentDuplicateIcon,
  ListBulletIcon,
  PencilSquareIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/solid'

import {
  Title,
  Button,
  Footer,
  FooterListItem,
  DragDropList,
  Markdown,
  Modal,
  CommandPalette,
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

export function ModalComponent() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  return (
    <>
      <Button
        backgroundColorClassName='bg-red-700'
        onClick={() => {
          setIsConfirmModalOpen(true)
        }}
      >
        delete
      </Button>
      <Modal
        isOpen={isConfirmModalOpen}
        setIsOpen={setIsConfirmModalOpen}
        title='are you sure you want to delete?'
      >
        <div className='flex space-x-4'>
          <Button
            onClick={() => {
              console.log('delete')
              setIsConfirmModalOpen(false)
            }}
          >
            yes
          </Button>
          <Button
            onClick={() => {
              setIsConfirmModalOpen(false)
            }}
          >
            no
          </Button>
        </div>
      </Modal>
    </>
  )
}

export function CommandPaletteComponent() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const commands = [
    {
      id: 'console.log',
      title: 'console.log',
      action: () => {
        console.log('hello world')
      },
    },
    {
      id: 'alert',
      title: 'alert',
      action: () => {
        alert('hello world')
      },
    },
  ]
  return (
    <>
      <Button
        onClick={() => {
          setIsCommandPaletteOpen(true)
        }}
      >
        <RocketLaunchIcon className='mx-auto h-6 w-6 text-cb-yellow hover:text-cb-yellow/75' />
      </Button>
      <CommandPalette
        commands={commands}
        isOpen={isCommandPaletteOpen}
        setIsOpen={setIsCommandPaletteOpen}
      />
    </>
  )
}
