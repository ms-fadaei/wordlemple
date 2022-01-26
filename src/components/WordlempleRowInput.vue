<template>
  <input
    v-model="value"
    type="text"
    maxlength="1"
    class="letter-box"
    :class="{
      'letter-box--green': isCorrect,
      'letter-box--orange': isInTheWord,
      'letter-box--disabled': isNotThere
    }"
  >
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
const isCorrect = computed(() => props.canValidate && value.value === props.letter)
const isInTheWord = computed(() => props.canValidate && !isCorrect.value && value.value && props.word.includes(value.value))
const isNotThere = computed(() => props.canValidate && !isCorrect.value && !isInTheWord.value)

watch(value, () => {
  $emit("update", value.value)
})
</script>
