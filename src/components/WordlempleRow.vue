<template>
  <div
    ref="parentElement"
    class="flex mb-3 last:mb-0"
    un-flex="row nowrap"
    un-justify="center"
    un-items="center"
    un-gap="2"
  >
    <WordlempleRowInput
      v-for="index in word.length"
      :key="index"
      :disabled="!isActive"
      :letter="word[index - 1]"
      :word="word"
      :can-validate="isWordComplete"
      @update="setValue($event, index - 1)"
      @beforeinput="focusHandler($event, index - 1)"
    />
  </div>
</template>

<script setup lang="ts">
import { useWordlempleRow } from '~/composables'

// define props
const $props = defineProps<{
  word: string
  isActive: boolean
}>()

// define emits
const $emit = defineEmits(['done'])
const onWordCompleted = (word: string) => $emit('done', word)

// template ref to parent element
const parentElement = ref<HTMLInputElement | null>(null)

const { word, isActive } = toRefs($props)
const { isWordComplete, setValue, focusHandler } = useWordlempleRow(
  word,
  isActive,
  parentElement,
  onWordCompleted
)
</script>
