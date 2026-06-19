<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

useHead({
  title: 'СИБГРУП - натяжные потолки в Новосибирске',
})
</script>

<template>
  <HeroSection />
  <CeilingTypesSection />
  <AdditionalOptionsSection />
  <AboutSection />
  <PortfolioSection />
  <FaqSection />
  <ContactsSection />
  <Ofertasection />
  <FloatingContactButtons />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
