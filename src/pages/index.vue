<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

useHead({
  title: 'НОВПОТОЛОК - натяжные потолки в Новосибирске',
})
</script>

<template>
  <HeroSection />
  <CeilingTypesSection />
  <AboutSection />
  <PortfolioSection />
  <FaqSection />
  <ContactsSection />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
