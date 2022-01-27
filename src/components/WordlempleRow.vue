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
// define props
const $props = defineProps<{
  word: string
  isActive: boolean
}>()

// define emits
const $emit = defineEmits(['done'])

// template ref to parent element
const parentElement = ref<HTMLInputElement | null>(null)

const wordLength = computed(() => $props.word.length)
const valueRefs = ref<string[]>(Array(wordLength.value).fill(''))
const enteredWord = computed(() => valueRefs.value.join(''))
const isWordComplete = computed(() => wordLength.value === enteredWord.value.length)

// auto focus on first input when component is active
watchEffect(() => {
  if ($props.isActive) {
    nextTick(() => {
      parentElement.value?.querySelector('input')?.focus()
    })
  }
})

// notify parent component when word is completed
watch(enteredWord, () => {
  if (isWordComplete.value) {
    $emit('done', enteredWord.value)
  }
})

// set entered value and focus on next element
const setValue = (value: string, index: number) => {
  valueRefs.value[index] = value

  const inputs = parentElement.value?.querySelectorAll('input') as NodeListOf<HTMLInputElement>
  if (value && index < wordLength.value - 1) {
    inputs[index + 1].focus()
  }
}

// set focus on previous element on backspace
const focusHandler = (e: Event, index: number) => {
  if (e instanceof InputEvent && e.inputType) {
    if (e.inputType === 'deleteContentBackward' && valueRefs.value[index] === '') {
      const inputs = parentElement.value?.querySelectorAll('input') as NodeListOf<HTMLInputElement>
      if (index > 0) {
        inputs[index - 1].focus()
        e.preventDefault()
      }
    }
  }
}
</script>
