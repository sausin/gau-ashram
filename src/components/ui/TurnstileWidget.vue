<template>
  <div ref="turnstileRef" class="turnstile-widget"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  siteKey: string;
  size?: 'normal' | 'compact';
  language?: string;
}>();

const emit = defineEmits<{
  (e: 'success', token: string): void;
  (e: 'error', error: string): void;
  (e: 'expired'): void;
  (e: 'timeout'): void;
}>();

const turnstileRef = ref<HTMLElement>();
let widgetId: string | null = null;

const loadTurnstileScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit';
    script.async = true;
    script.defer = true;

    window.onTurnstileLoad = () => {
      resolve();
      delete window.onTurnstileLoad;
    };

    script.onerror = () => reject(new Error('Failed to load Turnstile script'));
    document.head.appendChild(script);
  });
};

const renderWidget = async () => {
  if (!turnstileRef.value || !window.turnstile) return;

  try {
    widgetId = window.turnstile.render(turnstileRef.value, {
      sitekey: props.siteKey,
      theme: 'light', // Always use light theme
      size: props.size || 'normal',
      language: props.language,
      callback: (token: string) => {
        emit('success', token);
      },
      'error-callback': (error: string) => {
        console.error('Turnstile error:', error);
        emit('error', 'Turnstile verification failed.');
      },
      'expired-callback': () => {
        emit('expired');
      },
      'timeout-callback': () => {
        emit('timeout');
      },
    });
  } catch (error) {
    console.error('Failed to render Turnstile widget:', error);
    emit('error', 'Failed to render Turnstile widget');
  }
};

const reset = () => {
  if (widgetId && window.turnstile) {
    window.turnstile.reset(widgetId);
  }
};

const getResponse = (): string | null => {
  if (widgetId && window.turnstile) {
    return window.turnstile.getResponse(widgetId);
  }
  return null;
};

onMounted(async () => {
  try {
    await loadTurnstileScript();
    await renderWidget();
  } catch (error) {
    console.error('Turnstile initialization failed:', error);
    emit('error', 'Turnstile initialization failed');
  }
});

onUnmounted(() => {
  if (widgetId && window.turnstile) {
    window.turnstile.remove(widgetId);
  }
});

defineExpose({
  reset,
  getResponse
});

declare global {
  interface Window {
    onTurnstileLoad?: () => void;
    turnstile: {
      render: (element: HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | null;
    };
  }
}
</script>

<style scoped>
.turnstile-widget {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 65px;
  width: 100%;
  background-color: #f9fafb; /* bg-gray-50 */
  border: 1px solid #e5e7eb; /* border-gray-200 */
  border-radius: 0.5rem; /* rounded-lg */
  overflow: hidden;
}
</style>