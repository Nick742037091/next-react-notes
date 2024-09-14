import React, { createContext, useContext, ReactNode } from 'react'

interface NoteContextType {
  refreshSidebar: () => void
}

const NoteContext = createContext<NoteContextType | undefined>(undefined)

export function NoteProvider({
  children,
  refreshSidebar
}: {
  children: ReactNode
  refreshSidebar: () => void
}) {
  return (
    <NoteContext.Provider value={{ refreshSidebar }}>
      {children}
    </NoteContext.Provider>
  )
}

export function useNote() {
  const context = useContext(NoteContext)
  if (context === undefined) {
    throw new Error('useNote must be used within a NoteProvider')
  }
  return context
}
