import React, { ReactNode } from 'react'


export default function ClerkLayout({ children }: { children: ReactNode }) {
  return (
    <div className='h-full flex items-center justify-center'>
      {children}
    </div>
  )
}
