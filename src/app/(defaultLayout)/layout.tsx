// app/layouts/DefaultLayout.tsx
import { MenuBar } from '@/components/shared/MenuBar'
import React, { ReactNode } from 'react'


export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container min-h-screen flex flex-col ">
      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Fixed Bottom Menu */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <MenuBar />
      </div>
    </div>
  )
}
