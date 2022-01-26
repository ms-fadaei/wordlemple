<template>
  <div>
    <WordlempleRow
      v-for="i in tries"
      :key="i"
      :word="word"
      :is-active="i === currentRow"
      @next="currentRow = i + 1"
      @win="winner"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
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
const winner = () => {
  currentRow.value = 0;
  alert('You win!')
}
</script>
