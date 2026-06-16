<script setup lang="ts">
import { portfolioItems } from '~/data/portfolio'
</script>

<template>
  <section id="portfolio" class="portfolio-section">
    <AppContainer>
      <SectionTitle
        eyebrow="Работы"
        title="Портфолио проектов"
        subtitle="Здесь будут реальные фотографии объектов. Пока карточки держат структуру будущего блока."
      />

      <div class="portfolio-section__grid">
        <article v-for="item in portfolioItems" :key="item.id" class="portfolio-section__card">
          <div class="portfolio-section__preview" aria-hidden="true" />

          <div class="portfolio-section__body">
            <p>{{ item.location }}</p>
            <h3>{{ item.title }}</h3>
            <div>
              <span>{{ item.type }}</span>
              <span>{{ item.area }}</span>
            </div>
          </div>
        </article>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.portfolio-section {
  padding: 82px 0;
  background: #fff;
}

.portfolio-section__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.portfolio-section__card {
  overflow: hidden;
  border-radius: 24px;
  background: var(--landing-cream);
  box-shadow: 0 18px 48px rgba(31, 31, 31, 0.07);
}

.portfolio-section__preview {
  height: 250px;
  background:
    linear-gradient(180deg, transparent, rgba(31, 31, 31, 0.18)), linear-gradient(135deg, #cfc5b8, #f4eee5 55%, #bca88e);
}

.portfolio-section__body {
  display: grid;
  gap: 10px;
  padding: 22px;
}

.portfolio-section__body p,
.portfolio-section__body h3 {
  margin: 0;
}

.portfolio-section__body p {
  color: var(--landing-gold-dark);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.portfolio-section__body h3 {
  color: var(--landing-text);
  font-size: 20px;
  font-weight: 900;
  line-height: 1.2;
}

.portfolio-section__body div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.portfolio-section__body span {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--landing-muted);
  font-size: 13px;
  font-weight: 750;
  padding: 8px 12px;
}

@media (max-width: 900px) {
  .portfolio-section__grid {
    grid-template-columns: 1fr;
  }

  .portfolio-section__preview {
    height: 220px;
  }
}
</style>
