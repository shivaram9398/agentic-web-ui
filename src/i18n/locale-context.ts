import { createContext, useContext } from 'react'
import type { Locale, MessageKey } from './messages'

export const LocaleContext = createContext<{
  locale: Locale
  selectLocale: (locale: Locale) => void
  t: (key: MessageKey) => string
} | null>(null)

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('LocaleProvider is missing')
  return context
}
