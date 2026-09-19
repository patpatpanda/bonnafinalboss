'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type Theme = 'dark' | 'light'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext =
  createContext<ThemeContextType | undefined>(
    undefined,
  )

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] =
    useState<Theme>('dark')

  useEffect(() => {
    const savedTheme =
      localStorage.getItem('bonnatosen-theme')

    const initialTheme: Theme =
      savedTheme === 'light'
        ? 'light'
        : 'dark'

    setTheme(initialTheme)

    document.documentElement.dataset.theme =
      initialTheme
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme =
      theme === 'dark'
        ? 'light'
        : 'dark'

    setTheme(nextTheme)

    document.documentElement.dataset.theme =
      nextTheme

    localStorage.setItem(
      'bonnatosen-theme',
      nextTheme,
    )
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      'useTheme måste användas inom ThemeProvider',
    )
  }

  return context
}