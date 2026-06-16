<script setup lang="ts">
import type { AdditionalOption } from '~/data/additionalOptions'
// Данные вынесены отдельно: позже сюда можно будет добавить реальные изображения без правки верстки.
import { additionalOptions } from '~/data/additionalOptions'

const selectedOption = ref<AdditionalOption | null>(null)

function openConsultation(option: AdditionalOption) {
  selectedOption.value = option
}

function closeConsultation() {
  selectedOption.value = null
}
</script>

<template>
  <section class="additional-options-section">
    <AppContainer>
      <SectionTitle
        eyebrow="Дополнительно к потолкам"
        title="Продумайте потолок до мелочей"
        subtitle="Поможем подобрать освещение, аккуратное примыкание к стене, гардины и карнизы, чтобы потолок выглядел цельно и подходил под ваш интерьер."
      />

      <div class="additional-options-section__grid">
        <article
          v-for="option in additionalOptions"
          :key="option.id"
          class="additional-options-section__card"
        >
          <div class="additional-options-section__visual" :style="{ background: option.gradient }">
            <img v-if="option.image" :src="option.image" :alt="option.imageAlt">
            <span v-else aria-hidden="true">{{ option.title.slice(0, 1) }}</span>
          </div>

          <div class="additional-options-section__body">
            <h3>{{ option.title }}</h3>
            <p>{{ option.description }}</p>

            <ul class="additional-options-section__tags" :aria-label="`Варианты: ${option.title}`">
              <li v-for="tag in option.tags" :key="tag">
                {{ tag }}
              </li>
            </ul>

            <button
              class="additional-options-section__button"
              type="button"
              :aria-label="`Получить консультацию: ${option.title}`"
              @click="openConsultation(option)"
            >
              <span>Подробнее</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>
    </AppContainer>

    <CallbackModal
      v-if="selectedOption"
      title="Получить консультацию от специалиста"
      subtitle="Расскажем про освещение, примыкание к стене, гардины и карнизы. Подскажем, какое решение лучше подойдет под ваш потолок."
      submit-text="Получить консультацию"
      source="additional_options"
      :selected-option="selectedOption.title"
      @close="closeConsultation"
    />
  </section>
</template>

<style scoped>
/* Секция дополняет каталог, но отделяется светлым фоном и собственными карточками. */
.additional-options-section {
  padding: 82px 0;
  background: #fffaf3;
}

.additional-options-section__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.additional-options-section__card {
  overflow: hidden;
  border: 1px solid rgba(201, 154, 75, 0.14);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 48px rgba(31, 31, 31, 0.07);
  transition:
    border-color 240ms ease,
    box-shadow 240ms ease,
    transform 240ms ease;
}

.additional-options-section__card:hover {
  border-color: rgba(201, 154, 75, 0.32);
  box-shadow: 0 24px 62px rgba(31, 31, 31, 0.11);
  transform: translateY(-4px);
}

.additional-options-section__visual {
  position: relative;
  display: grid;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  place-items: center;
}

.additional-options-section__visual::after {
  position: absolute;
  inset: 22px;
  border: 1px solid rgba(255, 255, 255, 0.52);
  border-radius: 22px;
  content: '';
}

.additional-options-section__visual img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.additional-options-section__visual span {
  position: relative;
  z-index: 1;
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.74);
  color: var(--landing-gold-dark);
  font-size: 28px;
  font-weight: 600;
}

.additional-options-section__body {
  display: grid;
  gap: 14px;
  padding: 24px;
}

.additional-options-section__body h3 {
  color: #1f1f1f;
  font-size: 21px;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
}

.additional-options-section__body p {
  color: #666;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.65;
  margin: 0;
}

.additional-options-section__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 2px 0 4px;
  padding: 0;
  list-style: none;
}

.additional-options-section__tags li {
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 999px;
  background: rgba(247, 242, 235, 0.78);
  color: #666;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  padding: 8px 10px;
}

.additional-options-section__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: start;
  gap: 10px;
  min-height: 42px;
  border: 0;
  border-radius: 999px;
  background: var(--landing-gold);
  box-shadow: 0 14px 28px rgba(201, 154, 75, 0.2);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 0 18px;
  transition:
    background 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.additional-options-section__button:hover {
  background: var(--landing-gold-dark);
  box-shadow: 0 18px 34px rgba(201, 154, 75, 0.3);
  transform: translateY(-1px);
}

@media (max-width: 1020px) {
  .additional-options-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .additional-options-section {
    padding: 64px 0;
  }

  .additional-options-section__grid {
    grid-template-columns: 1fr;
  }

  .additional-options-section__body {
    padding: 22px;
  }
}
</style>
