<script setup lang="ts">
import { siteTitle } from '~/data/site'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  htmlAttrs: {
    lang: 'ru',
  },
  title: siteTitle,
  meta: [
    {
      name: 'theme-color',
      content: '#fffaf2',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
  ],
})
</script>

<template>
  <AppHeader />
  <RouterView />
  <Toast />
</template>
