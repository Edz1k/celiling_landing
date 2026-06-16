<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'НОВПОТОЛОК - натяжные потолки в Новосибирске',
  meta: [
    {
      name: 'description',
      content: 'Натяжные потолки в Новосибирске с установкой под ключ, бесплатным замером и гарантией.',
    },
    {
      name: 'theme-color',
      content: '#fffaf2',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <AppHeader />
  <RouterView />
  <Toast />
</template>
