'use client'

import { copyToClipboard } from 'lib'

import Button from '@/components/ui/button'

export default function CopyButton() {
  return (
    <Button
      onClick={() => {
        copyToClipboard('www')
      }}
    >
      copy
    </Button>
  )
}
