<template>
  <input
    v-model="value"
    type="text"
    maxlength="1"
    class="letter-box"
    :class="{
      'letter-box--green': canValidate && isCorrect,
      'letter-box--orange': canValidate && isInTheWord,
      'letter-box--disabled': canValidate && isNotThere,
    }"
    @keydown="validateLetter"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  letter: {
    type: String,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  canValidate: {
    type: Boolean,
    required: true,
  },
})

const $emit = defineEmits(['update'])

const value = ref<string>('')
const isCorrect = computed(() => value.value.toLowerCase() === props.letter.toLowerCase())
const isInTheWord = computed(
  () =>
    !isCorrect.value && value.value && props.word.toLowerCase().includes(value.value.toLowerCase())
)
const isNotThere = computed(() => !isCorrect.value && !isInTheWord.value)

watch(value, () => {
  $emit('update', value.value.toLowerCase())
})

function validateLetter(e: KeyboardEvent) {
  const keyCode = e.key.toLowerCase().charCodeAt(0)
  if (keyCode < 97 || keyCode > 122) {
    e.preventDefault()
  }
}
</script>
