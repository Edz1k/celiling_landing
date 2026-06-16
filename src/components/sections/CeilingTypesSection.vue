<script setup lang="ts">
import type { CeilingType } from '~/data/ceilingTypes'
// Данные карточек вынесены отдельно, чтобы менять каталог без правки верстки
import { ceilingTypes } from '~/data/ceilingTypes'

const selectedType = ref<CeilingType | null>(null)

function openMaterial(type: CeilingType) {
  selectedType.value = type
}

function closeMaterial() {
  selectedType.value = null
}
</script>

<template>
  <section id="types" class="ceiling-types-section">
    <AppContainer>
      <SectionTitle
        eyebrow="Каталог"
        title="Виды натяжных потолков"
        subtitle="Выберите материал, чтобы посмотреть описание и подготовить предварительный расчет."
      />

      <!-- Карточки видов потолков строятся из src/data/ceilingTypes.ts -->
      <div class="ceiling-types-section__grid">
        <article
          v-for="type in ceilingTypes"
          :key="type.id"
          class="ceiling-types-section__card"
          tabindex="0"
          role="button"
          :aria-label="`Открыть материал: ${type.title}`"
          @click="openMaterial(type)"
          @keydown.enter.prevent="openMaterial(type)"
          @keydown.space.prevent="openMaterial(type)"
        >
          <div class="ceiling-types-section__image" :style="{ background: type.image.gradient }" aria-hidden="true">
            <span>{{ type.title.slice(0, 1) }}</span>
          </div>

          <div class="ceiling-types-section__body">
            <h3>{{ type.title }}</h3>
            <p>{{ type.description }}</p>

            <div class="ceiling-types-section__bottom">
              <strong>{{ type.price }}</strong>
              <button
                class="ceiling-types-section__arrow"
                type="button"
                :aria-label="`Подробнее: ${type.title}`"
                @click.stop="openMaterial(type)"
              >
                →
              </button>
            </div>
          </div>
        </article>
      </div>
    </AppContainer>

    <CeilingTypeModal v-if="selectedType" :type="selectedType" @close="closeMaterial" />
  </section>
</template>

<style scoped>
/* Секция каталога: теплый фон и премиальные карточки материалов */
.ceiling-types-section {
  padding: 82px 0;
  background: #f7f2eb;
}

/* Desktop-сетка: четыре карточки в ряд */
.ceiling-types-section__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.ceiling-types-section__card {
  overflow: hidden;
  border: 1px solid rgba(201, 154, 75, 0.14);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 48px rgba(31, 31, 31, 0.07);
  cursor: pointer;
  outline: none;
  transition:
    border-color 240ms ease,
    box-shadow 240ms ease,
    transform 240ms ease;
}

.ceiling-types-section__card:hover,
.ceiling-types-section__card:focus-visible {
  border-color: rgba(201, 154, 75, 0.32);
  box-shadow: 0 24px 62px rgba(31, 31, 31, 0.11);
  transform: translateY(-5px);
}

/* Временная зона под будущие фотографии потолков */
.ceiling-types-section__image {
  position: relative;
  display: grid;
  height: 178px;
  place-items: center;
}

.ceiling-types-section__image::after {
  position: absolute;
  inset: 24px;
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: 22px;
  content: '';
}

.ceiling-types-section__image span {
  position: relative;
  z-index: 1;
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.72);
  color: var(--landing-gold-dark);
  font-size: 28px;
  font-weight: 600;
}

.ceiling-types-section__body {
  display: grid;
  gap: 14px;
  padding: 24px;
}

.ceiling-types-section__body h3 {
  color: #1f1f1f;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
}

.ceiling-types-section__body p {
  color: #666;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.65;
  margin: 0;
}

.ceiling-types-section__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
}

.ceiling-types-section__bottom strong {
  color: #1f1f1f;
  font-size: 17px;
  font-weight: 600;
}

.ceiling-types-section__arrow {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: var(--landing-gold);
  box-shadow: 0 14px 28px rgba(201, 154, 75, 0.24);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
  transition:
    background 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.ceiling-types-section__card:hover .ceiling-types-section__arrow,
.ceiling-types-section__arrow:hover {
  background: var(--landing-gold-dark);
  box-shadow: 0 18px 34px rgba(201, 154, 75, 0.32);
  transform: scale(1.07);
}

/* Планшет: карточки в две колонки */
@media (max-width: 1020px) {
  .ceiling-types-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Mobile: карточки становятся одной колонкой */
@media (max-width: 620px) {
  .ceiling-types-section {
    padding: 64px 0;
  }

  .ceiling-types-section__grid {
    grid-template-columns: 1fr;
  }

  .ceiling-types-section__body {
    padding: 22px;
  }
}
</style>
