<template>
  <div>
    <WordlempleRow
      v-for="i in tries"
      :key="i"
      :word="word"
      :is-active="i === currentRow"
      @done="validateWord($event, i)"
    />
  </div>
</template>

<script setup lang="ts">
import { initWordlemple } from '~/composables'

const $props = defineProps<{
  word: string
  tries: number
}>()

const { word } = toRefs($props)
const { currentRow, validateWord } = initWordlemple(word)
</script>
