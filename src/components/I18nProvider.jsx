'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../lib/i18n'

const I18nContext = createContext({
  locale: 'en',
  t: (key) => key,
})

export function I18nProvider({ children, initialLocale = 'en' }) {
  const [locale, setLocale] = useState(initialLocale)

  useEffect(() => {
    // Read cookie on client side
    const match = document.cookie.match(/locale=([^;]+)/)
    if (match) {
      setLocale(match[1])
    }
  }, [])

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[locale] || translations.en
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English
        value = translations.en
        for (const fk of keys) {
          if (value && typeof value === 'object' && fk in value) {
            value = value[fk]
          } else {
            return key
          }
        }
        return value
      }
    }
    
    return value
  }

  return (
    <I18nContext.Provider value={{ locale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider')
  }
  return context
}
