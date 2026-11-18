import en from './locales/en-US'
import hi from './locales/hi-IN'
import es from './locales/es-ES'

type Catalog = typeof en

export type MessageKey = {
  [Section in keyof Catalog]: `${Section}.${Extract<keyof Catalog[Section], string>}`
}[keyof Catalog]

export function translate(messages: Catalog, key: MessageKey): string {
  const separator = key.indexOf('.')
  const section = key.slice(0, separator) as keyof Catalog
  const entries: Readonly<Record<string, string>> = messages[section]
  return entries[key.slice(separator + 1)] ?? key
}

export const locales = [
  { id: 'en-US', label: 'English', region: 'US', messages: en },
  { id: 'hi-IN', label: 'हिन्दी', region: 'IN', messages: hi },
  { id: 'es-ES', label: 'Español', region: 'ES', messages: es },
] as const satisfies readonly {
  id: string
  label: string
  region: string
  messages: Catalog
}[]

export type Locale = (typeof locales)[number]
