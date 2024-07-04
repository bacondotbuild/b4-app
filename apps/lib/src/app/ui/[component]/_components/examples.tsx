'use client'

import { Title, Button } from 'ui'

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
