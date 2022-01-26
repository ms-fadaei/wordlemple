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
      @update="valueRefs[index -1 ] = $event"
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

const $emit = defineEmits(['next', 'win'])
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
    checkWord()
  }
})

const checkWord = () => {
  const inputs = box.value?.querySelectorAll('input') as NodeListOf<HTMLInputElement>
  let greenWords = 0

  inputs.forEach((input: HTMLInputElement, index: number) => {
    if (input.value === props.word[index]) {
      greenWords++
    }
  })


  if (greenWords === props.word.length) {
    $emit('win')
  } else {
    $emit('next')
  }
}
</script>
