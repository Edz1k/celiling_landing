<script setup lang="ts">
withDefaults(defineProps<{
  align?: 'center' | 'left'
  eyebrow?: string
  subtitle?: string
  title: string
}>(), {
  align: 'center',
})
</script>

<template>
  <header class="section-title" :class="`section-title--${align}`">
    <p v-if="eyebrow" class="section-title__eyebrow">
      {{ eyebrow }}
    </p>

    <h2 class="section-title__heading">
      {{ title }}
    </h2>

    <p v-if="subtitle" class="section-title__subtitle">
      {{ subtitle }}
    </p>
  </header>
</template>

<style scoped>
.section-title {
  display: grid;
  gap: 12px;
  max-width: 720px;
  margin-bottom: 34px;
}

.section-title--center {
  justify-items: center;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.section-title--left {
  justify-items: start;
  text-align: left;
}

.section-title__eyebrow {
  color: var(--landing-gold-dark);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;
}

.section-title__heading {
  color: var(--landing-text);
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 1.08;
  margin: 0;
}

.section-title__heading::after {
  display: block;
  width: 44px;
  height: 2px;
  border-radius: 999px;
  background: var(--landing-gold);
  content: '';
  margin-top: 16px;
}

.section-title--center .section-title__heading::after {
  margin-right: auto;
  margin-left: auto;
}

.section-title__subtitle {
  color: var(--landing-muted);
  font-size: 16px;
  font-weight: 650;
  line-height: 1.65;
  margin: 0;
}
</style>
