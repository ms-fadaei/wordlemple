<template>
  <div>
    <WordlempleRow
      v-for="i in tries"
      :key="i"
      :word="word"
      :is-active="i === currentRow"
      @next="currentRow = i + 1"
      @done="checkWord($event, i)"
    />
  </div>
</template>

<script setup lang="ts">
const $props = defineProps<{
  word: string
  tries: number
}>()

// current row index
const currentRow = ref(1)

// check word on each completed row
const checkWord = (value: string, rowNumber: number) => {
  if (value === $props.word.toLowerCase()) {
    currentRow.value = 0
    nextTick(() => {
      alert('You Won!')
    })
  } else {
    currentRow.value = rowNumber + 1
  }
}
</script>
