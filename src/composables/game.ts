import { Ref } from 'vue'

export function initWordlemple(word: Ref<string>) {
  // current row index
  const currentRow = ref(1)

  // check word on each completed row
  const validateWord = (value: string, rowNumber: number) => {
    if (value === word.value.toLowerCase()) {
      currentRow.value = 0
      setTimeout(() => {
        alert('You Won!')
      }, 100)
    } else {
      currentRow.value = rowNumber + 1
    }
  }

  return { currentRow, validateWord }
}

export function useWordlempleRow(
  word: Ref<string>,
  isActive: Ref<boolean>,
  parentElement: Ref<HTMLInputElement | null>,
  onWordCompleted: (word: string) => void
) {
  const wordLength = computed(() => word.value.length)
  const valueRefs = ref<string[]>(Array(wordLength.value).fill(''))
  const enteredWord = computed(() => valueRefs.value.join(''))
  const isWordComplete = computed(() => wordLength.value === enteredWord.value.length)

  // notify parent component when word is completed
  watch(enteredWord, () => {
    if (isWordComplete.value) {
      onWordCompleted(enteredWord.value)
    }
  })

  const getInputs = () => {
    return parentElement.value?.querySelectorAll('input') as NodeListOf<HTMLInputElement>
  }

  // auto focus on first input when component is active
  watchEffect(() => {
    if (isActive.value) {
      nextTick(() => {
        parentElement.value?.querySelector('input')?.focus()
      })
    }
  })

  // set entered value and focus on next element
  const setValue = (value: string, index: number) => {
    valueRefs.value[index] = value

    const inputs = getInputs()
    if (value && index < wordLength.value - 1) {
      inputs[index + 1].focus()
    }
  }

  // set focus on previous element on backspace
  const focusHandler = (e: Event, index: number) => {
    if (e instanceof InputEvent && e.inputType) {
      if (e.inputType === 'deleteContentBackward' && valueRefs.value[index] === '') {
        const inputs = getInputs()
        if (index > 0) {
          inputs[index - 1].focus()
          e.preventDefault()
        }
      }
    }
  }

  return {
    isWordComplete,
    setValue,
    focusHandler,
  }
}

export function useWordlempleRowInput(
  letter: Ref<string>,
  word: Ref<string>,
  onLetterChanged: (letter: string) => void
) {
  // define input value ref
  const value = ref<string>('')

  // define status computed properties
  const isCorrect = computed(() => value.value === letter.value.toLowerCase())
  const isPresent = computed(
    () => !isCorrect.value && value.value && word.value.toLowerCase().includes(value.value)
  )
  const isWrong = computed(() => !isCorrect.value && !isPresent.value)

  // input value watcher to emit update event
  watch(value, () => {
    onLetterChanged(value.value)
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

  return { isCorrect, isPresent, isWrong, setValue }
}
