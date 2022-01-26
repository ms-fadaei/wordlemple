<template>
  <input
    :value="value"
    type="text"
    maxlength="1"
    class="letter-box"
    :class="{
      'letter-box--green': canValidate && isCorrect,
      'letter-box--orange': canValidate && isInTheWord,
      'letter-box--disabled': canValidate && isNotThere,
    }"
    @input="setValue"
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

function setValue(e: Event) {
  console.log(e)
  const _value = (e.target as HTMLInputElement).value
  const keyCode = _value.toLowerCase().charCodeAt(0)
  if (keyCode >= 97 && keyCode <= 122) {
    value.value = _value
  } else if (_value === '') {
    value.value = ''
  } else {
    ;(e.target as HTMLInputElement).value = ''
  }
}
</script>
