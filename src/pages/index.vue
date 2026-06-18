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
  <AdditionalOptionsSection />
  <AboutSection />
  <PortfolioSection />
  <FaqSection />
  <ContactsSection />
  <Ofertasection />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
