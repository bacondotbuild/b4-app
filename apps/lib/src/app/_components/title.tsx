'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Title } from 'ui'

export default function GlobalTitle({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  if (pathname === '/') {
    return <Title>{children}</Title>
  }
  return (
    <Link href='/' className='hover:text-cb-pink/75'>
      <Title>{children}</Title>
    </Link>
  )
}
