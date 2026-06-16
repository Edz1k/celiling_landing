<script setup lang="ts">
// Список вопросов вынесен в data-файл, чтобы быстро менять FAQ без правки верстки
import { faqItems } from '~/data/faq'
</script>

<template>
  <section id="faq" class="faq-section">
    <AppContainer>
      <SectionTitle
        eyebrow="FAQ"
        title="Частые вопросы"
        subtitle="Блок закроет типовые сомнения перед заявкой: сроки, мебель, гарантия, запах и порядок оплаты."
      />

      <!-- Вопросы и ответы строятся из src/data/faq.ts -->
      <div class="faq-section__list">
        <article v-for="item in faqItems" :key="item.question" class="faq-section__item">
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </article>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* FAQ закрывает типовые сомнения перед заявкой */
.faq-section {
  padding: 82px 0;
  background: var(--landing-milk);
}

/* Desktop: два вопроса в ряд */
.faq-section__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.faq-section__item {
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.78);
  padding: 24px;
}

.faq-section__item h3 {
  color: var(--landing-text);
  font-size: 18px;
  font-weight: 900;
  line-height: 1.25;
  margin: 0 0 10px;
}

.faq-section__item p {
  color: var(--landing-muted);
  font-size: 15px;
  font-weight: 650;
  line-height: 1.6;
  margin: 0;
}

/* Mobile: вопросы идут одной колонкой */
@media (max-width: 760px) {
  .faq-section {
    padding: 64px 0;
  }

  .faq-section__list {
    grid-template-columns: 1fr;
  }
}
</style>
