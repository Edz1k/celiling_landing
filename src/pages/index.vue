<script setup lang="ts">
import heroImage from '~/assets/images/hero/background.webp'
import { maxLink, phoneNumbers, telegramLink, whatsappLink } from '~/data/contacts'
import { siteDescription, siteName, siteTitle, siteUrl } from '~/data/site'

defineOptions({
  name: 'IndexPage',
})

const heroImageUrl = new URL(heroImage, siteUrl).href
const city = {
  '@type': 'City',
  'name': 'Новосибирск',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  'name': siteName,
  'url': siteUrl,
  'description': siteDescription,
  'image': heroImageUrl,
  'telephone': phoneNumbers.map(phone => phone.href.replace('tel:', '')),
  'areaServed': city,
  'sameAs': [telegramLink, maxLink, whatsappLink],
  'makesOffer': {
    '@type': 'Offer',
    'itemOffered': {
      '@type': 'Service',
      'name': 'Монтаж натяжных потолков под ключ',
      'serviceType': 'Натяжные потолки',
      'areaServed': city,
    },
  },
}

useSeoMeta({
  title: siteTitle,
  description: siteDescription,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogType: 'website',
  ogLocale: 'ru_RU',
  ogSiteName: siteName,
  ogTitle: siteTitle,
  ogDescription: siteDescription,
  ogUrl: siteUrl,
  ogImage: heroImageUrl,
  ogImageWidth: 1536,
  ogImageHeight: 1024,
  ogImageAlt: 'Натяжные потолки в современном интерьере',
  twitterCard: 'summary_large_image',
  twitterTitle: siteTitle,
  twitterDescription: siteDescription,
  twitterImage: heroImageUrl,
  twitterImageAlt: 'Натяжные потолки в современном интерьере',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: siteUrl,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(localBusinessSchema),
    },
  ],
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
