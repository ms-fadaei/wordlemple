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
const $props = defineProps({
  word: {
    type: String,
    required: true,
  },
  tries: {
    type: Number,
    default: 5,
  },
})

const currentRow = ref(1)
const checkWord = (value: string, rowNumber: number) => {
  if (value === $props.word.toLowerCase()) {
    currentRow.value = 0
    alert('You win!')
  } else {
    currentRow.value = rowNumber + 1
  }
}
</script>
