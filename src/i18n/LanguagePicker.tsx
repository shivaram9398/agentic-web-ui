import { useId, useRef } from 'react'
import { useLocale } from './locale-context'
import { locales, type Locale } from './messages'
import './language-picker.css'

function LocaleLabel({ option }: { option: Locale }) {
  const country = new Intl.DisplayNames([option.id], { type: 'region' }).of(option.region)
  return (
    <span className="language-option" lang={option.id}>
      <img src={new URL(`./flags/${option.region}.svg`, import.meta.url).href} alt="" />
      <span>
        {option.label} <span className="language-country">· {country}</span>
      </span>
    </span>
  )
}

export default function LanguagePicker() {
  const { locale, selectLocale, t } = useLocale()
  const details = useRef<HTMLDetailsElement>(null)
  const trigger = useRef<HTMLElement>(null)
  const labelId = useId()

  function closeAndFocus() {
    if (details.current) details.current.open = false
    trigger.current?.focus()
  }

  return (
    <details
      ref={details}
      className="language-picker"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && event.currentTarget.open) {
          event.preventDefault()
          closeAndFocus()
        }
      }}
    >
      <summary ref={trigger} aria-labelledby={labelId}>
        <span id={labelId} className="language-trigger-label">
          {t('languagePicker.language')} <LocaleLabel option={locale} />
        </span>
      </summary>
      <ul>
        {locales.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              aria-pressed={locale.id === option.id}
              onClick={() => {
                selectLocale(option)
                closeAndFocus()
              }}
            >
              <LocaleLabel option={option} />
              {locale.id === option.id && <span aria-hidden="true">✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </details>
  )
}
