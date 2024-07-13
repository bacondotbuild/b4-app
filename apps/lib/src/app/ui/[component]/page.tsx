import Link from 'next/link'

import { Title } from 'ui'

import {
  TitleComponent,
  ButtonComponent,
  FooterComponent,
  DragDropListComponent,
} from './_components/examples'
import { Main } from '@/components/ui'
import { ui } from '@/lib/common'

const componentNameToComponents: Record<string, React.FC> = {
  button: ButtonComponent,
  title: TitleComponent,
  footer: FooterComponent,
  dragDropList: DragDropListComponent,
}

export default function Component({
  params,
}: {
  params: { component: string }
}) {
  const currentComponent = ui.find(component => component === params.component)
  if (!currentComponent) {
    return <p>loading</p>
  }
  const Component = componentNameToComponents[currentComponent]
  return (
    <Main className='flex flex-col p-4'>
      <div className='flex flex-grow flex-col space-y-4'>
        <Link href='/' className='hover:text-cb-pink/75'>
          <Title>lib</Title>
        </Link>
        <ul className='flex space-x-4 overflow-auto'>
          {ui.map(component => (
            <li key={component}>
              {component === currentComponent ? (
                <span>{component}</span>
              ) : (
                <Link
                  href={`/ui/${component}`}
                  className='text-cb-pink hover:text-cb-pink/75'
                >
                  {component}
                </Link>
              )}
            </li>
          ))}
        </ul>
        {Component ? <Component /> : <p>no {currentComponent} component yet</p>}
      </div>
    </Main>
  )
}