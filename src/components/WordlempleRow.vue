<template>
  <div
    ref="box"
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
      @keydown="focusHandler($event, index - 1)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  word: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

const $emit = defineEmits(['done'])
const box = ref<HTMLInputElement | null>(null)

const wordLength = computed(() => props.word.length)
const valueRefs = ref<string[]>(Array(wordLength.value).fill(''))
const completeValue = computed(() => valueRefs.value.join(''))
const isWordComplete = computed(() => wordLength.value === completeValue.value.length)

watchEffect(() => {
  if (props.isActive) {
    nextTick(() => {
      box.value?.querySelectorAll('input')[0].focus()
    })
  }
})

watch(completeValue, () => {
  if (completeValue.value.length === wordLength.value) {
    $emit('done', completeValue.value)
  }
})

const setValue = (value: string, index: number) => {
  valueRefs.value[index] = value

  const inputs = box.value?.querySelectorAll('input') as NodeListOf<HTMLInputElement>
  if (value && index < wordLength.value - 1) {
    inputs[index + 1].focus()
  }
}

const focusHandler = (e: KeyboardEvent, index: number) => {
  console.log(e)
  if ((e.key === 'Backspace' || e.which === 8) && valueRefs.value[index] === '') {
    const inputs = box.value?.querySelectorAll('input') as NodeListOf<HTMLInputElement>
    if (index > 0) {
      inputs[index - 1].focus()
      e.preventDefault()
    }
  }
}
</script>
