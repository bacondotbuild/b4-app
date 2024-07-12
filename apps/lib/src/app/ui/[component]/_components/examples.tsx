'use client'

import {
  DocumentDuplicateIcon,
  ListBulletIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'

import { Title, Button, Footer, FooterListItem } from 'ui'
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
