import { ref, onMounted, onUnmounted } from 'vue'

interface TurnstileWidget {
  render: (element: HTMLElement, options: {
    sitekey: string
    callback?: (token: string) => void
    'error-callback'?: () => void
    'expired-callback'?: () => void
    theme?: 'light' | 'dark' | 'auto'
    size?: 'normal' | 'compact'
  }) => string
  reset: (widgetId?: string) => void
  remove: (widgetId?: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileWidget
    onTurnstileLoad?: () => void
  }
}

export function useTurnstile() {
  const isLoaded = ref(false)
  const isLoading = ref(false)
  const token = ref<string | null>(null)
  const widgetId = ref<string | null>(null)
  const error = ref<string | null>(null)

  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  const loadScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.turnstile) {
        isLoaded.value = true
        resolve()
        return
      }

      if (isLoading.value) {
        // Wait for existing load
        const checkLoaded = () => {
          if (isLoaded.value) {
            resolve()
          } else {
            setTimeout(checkLoaded, 100)
          }
        }
        checkLoaded()
        return
      }

      isLoading.value = true

      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true

      script.onload = () => {
        isLoaded.value = true
        isLoading.value = false
        resolve()
      }

      script.onerror = () => {
        isLoading.value = false
        error.value = 'Failed to load Turnstile script'
        reject(new Error('Failed to load Turnstile script'))
      }

      document.head.appendChild(script)
    })
  }

  const render = async (element: HTMLElement): Promise<void> => {
    if (!siteKey) {
      error.value = 'Turnstile site key not configured'
      return
    }

    try {
      // Set loading state for widget rendering
      isLoading.value = true
      await loadScript()

      if (!window.turnstile) {
        throw new Error('Turnstile not available')
      }

      // Clear previous state
      token.value = null
      error.value = null

      // Detect mobile for responsive sizing
      const isMobile = window.innerWidth < 640 // sm breakpoint

      widgetId.value = window.turnstile.render(element, {
        sitekey: siteKey,
        callback: (receivedToken: string) => {
          token.value = receivedToken
          error.value = null
          isLoading.value = false // Widget is ready
        },
        'error-callback': () => {
          error.value = 'Turnstile verification failed'
          token.value = null
          isLoading.value = false // Widget finished loading (with error)
        },
        'expired-callback': () => {
          token.value = null
          error.value = 'Turnstile token expired'
        },
        theme: 'light',
        size: isMobile ? 'compact' : 'normal'
      })
      
      // Also set a timeout to hide loading after reasonable time
      setTimeout(() => {
        if (isLoading.value) {
          isLoading.value = false
        }
      }, 5000)
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      isLoading.value = false
    }
  }

  const reset = () => {
    if (window.turnstile && widgetId.value) {
      window.turnstile.reset(widgetId.value)
      token.value = null
      error.value = null
      isLoading.value = false
    }
  }

  const remove = () => {
    if (window.turnstile && widgetId.value) {
      window.turnstile.remove(widgetId.value)
      widgetId.value = null
      token.value = null
      error.value = null
    }
  }

  onUnmounted(() => {
    remove()
  })

  return {
    isLoaded,
    isLoading,
    token,
    error,
    render,
    reset,
    remove
  }
}