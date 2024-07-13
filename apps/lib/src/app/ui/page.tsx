import Link from 'next/link'

import { ui } from '@/lib/common'

export default function UI() {
  return (
    <ul className='space-y-4'>
      {ui.map(component => (
        <li key={component}>
          <Link
            href={`/ui/${component}`}
            className='text-cb-pink hover:text-cb-pink/75'
          >
            {component}
          </Link>
        </li>
      ))}
    </ul>
  )
}
