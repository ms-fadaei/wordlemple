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
// define props
const $props = defineProps<{
  letter: string
  word: string
  canValidate: boolean
}>()

// define emits
const $emit = defineEmits(['update'])

// define input value ref
const value = ref<string>('')

// define status computed properties
const isCorrect = computed(() => value.value === $props.letter.toLowerCase())
const isPresent = computed(
  () => !isCorrect.value && value.value && $props.word.toLowerCase().includes(value.value)
)
const isWrong = computed(() => !isCorrect.value && !isPresent.value)

// input value watcher to emit update event
watch(value, () => {
  $emit('update', value.value)
})

// validate (and then set) entered value
function setValue(e: Event) {
  const _value = (e.target as HTMLInputElement).value
  const keyCode = _value.toLowerCase().charCodeAt(0)
  if (keyCode >= 97 && keyCode <= 122) {
    value.value = _value.toLowerCase()
  } else {
    ;(e.target as HTMLInputElement).value = ''
    value.value = ''
  }
}
</script>
