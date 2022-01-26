import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    Unocss({
      shortcuts: [
        [
          'btn',
          'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
        ],
        [
          'icon-btn',
          'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
        ],
        [
          'letter-box',
          'w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-1 text-center text-lg text-gray-700 dark:text-gray-300 border-1 border-gray-300 dark:border-gray-600',
        ],
        [
          'letter-box--green',
          'bg-green-200 dark:bg-green-700 border-green-400 dark:border-green-500',
        ],
        [
          'letter-box--orange',
          'bg-orange-200 dark:bg-orange-600 border-orange-400 dark:border-orange-500',
        ],
        [
          'letter-box--disabled',
          'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
        ],
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
        }),
      ],
    }),
  ],
  base: 'https://ms-fadaei.github.io/wordlemple/',

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
