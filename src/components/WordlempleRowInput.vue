<template>
  <input
    type="text"
    maxlength="1"
    class="letter-box"
    :class="{
      'letter-box--green': canValidate && isCorrect,
      'letter-box--orange': canValidate && isPresent,
      'letter-box--disabled': canValidate && isWrong,
    }"
    @input="setValue"
  />
</template>

<script setup lang="ts">
import { useWordlempleRowInput } from '~/composables'

// define props
const $props = defineProps<{
  letter: string
  word: string
  canValidate: boolean
}>()

const $emit = defineEmits(['update'])
const onUpdate = (letter: string) => $emit('update', letter)

const { letter, word } = toRefs($props)
const { isCorrect, isPresent, isWrong, setValue } = useWordlempleRowInput(letter, word, onUpdate)
</script>
