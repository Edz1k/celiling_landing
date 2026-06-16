<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

useHead({
  title: 'Vitesse',
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">
      Vitesse
    </h1>
    <p class="mt-2 text-lg">
      A <strong>Vite</strong> & <strong>Vue 3</strong> starter template with
      batteries-included features for rapid development.
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
