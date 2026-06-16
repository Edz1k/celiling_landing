<script setup lang="ts">
// Данные карточек вынесены отдельно, чтобы менять каталог без правки верстки
import { ceilingTypes } from '~/data/ceilingTypes'
</script>

<template>
  <section id="types" class="ceiling-types-section">
    <AppContainer>
      <SectionTitle
        eyebrow="Каталог"
        title="Виды натяжных потолков"
        subtitle="Базовый каталог для будущих карточек с фото, подробностями и быстрым расчетом стоимости."
      />

      <!-- Карточки видов потолков строятся из src/data/ceilingTypes.ts -->
      <div class="ceiling-types-section__grid">
        <article v-for="type in ceilingTypes" :key="type.id" class="ceiling-types-section__card">
          <div class="ceiling-types-section__image" aria-hidden="true" />

          <div class="ceiling-types-section__body">
            <h3>{{ type.title }}</h3>
            <p>{{ type.description }}</p>
            <div class="ceiling-types-section__bottom">
              <strong>{{ type.price }}</strong>
              <a href="#contacts" aria-label="Рассчитать стоимость">
                →
              </a>
            </div>
          </div>
        </article>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* Секция каталога: пока простой светлый блок с карточками */
.ceiling-types-section {
  padding: 82px 0;
  background: #fff;
}

/* Desktop-сетка: четыре карточки в ряд */
.ceiling-types-section__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.ceiling-types-section__card {
  overflow: hidden;
  border: 1px solid rgba(31, 31, 31, 0.08);
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 18px 48px rgba(31, 31, 31, 0.06);
}

/* Временная зона под будущие фотографии потолков */
.ceiling-types-section__image {
  height: 170px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent),
    linear-gradient(145deg, #d9d1c5, #f7f3ed 52%, #c4b39b);
}

.ceiling-types-section__body {
  display: grid;
  gap: 14px;
  padding: 22px;
}

.ceiling-types-section__body h3 {
  color: var(--landing-text);
  font-size: 20px;
  font-weight: 900;
  line-height: 1.15;
  margin: 0;
}

.ceiling-types-section__body p {
  color: var(--landing-muted);
  font-size: 14px;
  font-weight: 650;
  line-height: 1.55;
  margin: 0;
}

.ceiling-types-section__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 4px;
}

.ceiling-types-section__bottom strong {
  color: var(--landing-text);
  font-size: 16px;
  font-weight: 950;
}

.ceiling-types-section__bottom a {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: var(--landing-gold);
  color: #fff;
  font-size: 22px;
  font-weight: 900;
  text-decoration: none;
}

/* Планшет: карточки в две колонки */
@media (max-width: 1020px) {
  .ceiling-types-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Mobile: карточки становятся одной колонкой */
@media (max-width: 560px) {
  .ceiling-types-section {
    padding: 64px 0;
  }

  .ceiling-types-section__grid {
    grid-template-columns: 1fr;
  }
}
</style>
