<template>
  <div v-if="content" class="prose prose-lg max-w-none">
    <div v-html="content.html"></div>
  </div>
  <div v-else-if="loading" class="text-center py-8">
    <p class="text-gray-500">{{ t('common.loading') }}</p>
  </div>
  <div v-else class="text-center py-8">
    <p class="text-gray-500">{{ t('common.error') }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useContent } from '../../composables/useContent'
import { useI18n } from '../../composables/useI18n'

interface Props {
  contentPath: string
  locale?: string
}

const props = defineProps<Props>()
const { getContent } = useContent()
const { t } = useI18n()

const loading = ref(false)

const content = computed(() => {
  return getContent(props.contentPath, props.locale)
})
</script>