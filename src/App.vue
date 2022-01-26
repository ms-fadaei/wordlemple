<template>
  <main
    font-sans
    class="flex flex-col h-screen justify-center items-center"
    un-bg="gray-50 dark:gray-900"
    un-text="gray-700 dark:gray-200"
  >
    <Wordlemple word="ticket" :tries="5" class="p-4 rounded-2" un-bg="gray-100 dark:gray-800" />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Wordlemple',
  meta: [
    {
      name: `description`,
      content: `A simple implementation of the wordle game.`,
    },
  ],
})
</script>
