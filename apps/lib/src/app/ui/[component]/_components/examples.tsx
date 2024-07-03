'use client'

import { Title, Button } from 'ui'

export function TitleComponent() {
  return (
    <Title>
      <span>title</span>
    </Title>
  )
}

export function ButtonComponent() {
  return (
    <Button
      className='bg-cobalt'
      onClick={() => {
        alert('clicked')
      }}
    >
      click me
    </Button>
  )
}
