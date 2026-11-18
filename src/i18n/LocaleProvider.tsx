import { useEffect, useState, type ReactNode } from 'react'
import { LocaleContext } from './locale-context'
import { locales, translate, type Locale } from './messages'

const storageKey = 'agentic-meetings.locale'

function initialLocale() {
  try {
    const saved = localStorage.getItem(storageKey)
    return locales.find(({ id }) => id === saved) ?? locales[0]
  } catch {
    return locales[0]
  }
}

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState(initialLocale)

  useEffect(() => {
    document.documentElement.lang = locale.id
    document.title = 'Agentic Meetings Manager'
  }, [locale])

  function selectLocale(next: Locale) {
    setLocale(next)
    try {
      localStorage.setItem(storageKey, next.id)
    } catch {
      // The choice still applies to the current session if storage is unavailable.
    }
  }

  return (
    <LocaleContext.Provider
      value={{ locale, selectLocale, t: (key) => translate(locale.messages, key) }}
    >
      {children}
    </LocaleContext.Provider>
  )
}
