import { ref, computed, reactive } from 'vue'

const currentLocale = ref<string>('en')
const messages = reactive<Record<string, any>>({})

// Load language files dynamically
const loadLocaleMessages = async (locale: string) => {
  try {
    const msgs = await import(`../i18n/${locale}.json`)
    messages[locale] = msgs.default
  } catch (error) {
    console.error(`Failed to load locale ${locale}:`, error)
  }
}

// Initialize with default locale
loadLocaleMessages('en')
loadLocaleMessages('hi')

export const useI18n = () => {
  const setLocale = async (locale: string) => {
    if (!messages[locale]) {
      await loadLocaleMessages(locale)
    }
    currentLocale.value = locale
    document.documentElement.lang = locale
  }

  const t = (key: string): any => {
    const keys = key.split('.')
    let result: any = messages[currentLocale.value]
    
    for (const k of keys) {
      if (result && typeof result === 'object') {
        result = result[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    // Return the result as-is (could be string, array, or object)
    return result !== undefined ? result : key
  }

  const locale = computed(() => currentLocale.value)

  return {
    t,
    locale,
    setLocale
  }
}