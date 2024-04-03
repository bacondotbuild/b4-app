import React from 'react'
import classNames from 'classnames'

export default function Title({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h1 className={classNames('text-center text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10', className)}>
      {children}
    </h1>
  )
}
