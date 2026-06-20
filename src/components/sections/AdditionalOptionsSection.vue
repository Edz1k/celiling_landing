<script setup lang="ts">
import type { AdditionalOption } from '~/data/additionalOptions'
// Данные вынесены отдельно: изображения, теги и тексты модалки редактируются без правки верстки.
import { additionalOptions } from '~/data/additionalOptions'

const selectedOption = ref<AdditionalOption | null>(null)
const consultationOption = ref<AdditionalOption | null>(null)

function openOption(option: AdditionalOption) {
  selectedOption.value = option
}

function closeOption() {
  selectedOption.value = null
}

function openConsultation(option: AdditionalOption) {
  selectedOption.value = null
  consultationOption.value = option
}

function closeConsultation() {
  consultationOption.value = null
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    closeOption()
}

watch(selectedOption, (option) => {
  if (typeof document !== 'undefined')
    document.body.classList.toggle('is-additional-option-modal-open', Boolean(option))
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.body.classList.remove('is-additional-option-modal-open')
  window.removeEventListener('keydown', handleKeydown)
})
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
          tabindex="0"
          role="button"
          :aria-label="`Подробнее: ${option.title}`"
          @click="openOption(option)"
          @keydown.enter.prevent="openOption(option)"
          @keydown.space.prevent="openOption(option)"
        >
          <div class="additional-options-section__visual" :style="{ background: option.gradient }">
            <img v-if="option.image" :src="option.image" :alt="option.imageAlt">
            <div v-else class="additional-options-section__placeholder" aria-hidden="true" />
            <span class="additional-options-section__arrow" aria-hidden="true">→</span>
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
              :aria-label="`Открыть подробнее: ${option.title}`"
              @click.stop="openOption(option)"
            >
              <span>Подробнее</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>
    </AppContainer>

    <Teleport to="body">
      <Transition name="additional-option-modal" appear>
        <div
          v-if="selectedOption"
          class="additional-option-modal"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedOption.title"
          @click.self="closeOption"
        >
          <ModalCloseButton @close="closeOption" />

          <div class="additional-option-modal__window">
            <div class="additional-option-modal__image" :style="{ background: selectedOption.gradient }">
              <img v-if="selectedOption.image" :src="selectedOption.image" :alt="selectedOption.imageAlt">
              <div v-else class="additional-option-modal__placeholder" aria-hidden="true" />
            </div>

            <div class="additional-option-modal__content">
              <p class="additional-option-modal__eyebrow">
                Детали решения
              </p>
              <h3>{{ selectedOption.title }}</h3>
              <p>{{ selectedOption.modalDescription }}</p>

              <div class="additional-option-modal__features">
                <h4>Особенности</h4>
                <ul>
                  <li v-for="feature in selectedOption.features" :key="feature">
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <button class="additional-option-modal__cta" type="button" @click="openConsultation(selectedOption)">
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <CallbackModal
      v-if="consultationOption"
      title="Получить консультацию от специалиста"
      subtitle="Расскажем про освещение, примыкание к стене, гардины и карнизы. Подскажем, какое решение лучше подойдет под ваш потолок."
      submit-text="Получить консультацию"
      source="Дополнительно к потолкам"
      :selected-option="consultationOption.title"
      @close="closeConsultation"
    />
  </section>
</template>

<style scoped>
:global(body.is-additional-option-modal-open) {
  overflow: hidden;
}

/* Секция дополняет каталог: показывает решения, которые лучше продумать до монтажа потолка. */
.additional-options-section {
  padding: 82px 0;
  background: #fffaf3;
}

.additional-options-section__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  align-items: stretch;
}

.additional-options-section__card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(201, 154, 75, 0.14);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 18px 48px rgba(31, 31, 31, 0.07);
  cursor: pointer;
  outline: none;
  transition:
    border-color 240ms ease,
    box-shadow 240ms ease,
    transform 240ms ease;
}

.additional-options-section__card:hover,
.additional-options-section__card:focus-visible {
  border-color: rgba(201, 154, 75, 0.32);
  box-shadow: 0 24px 62px rgba(31, 31, 31, 0.12);
  transform: translateY(-4px);
}

.additional-options-section__visual {
  position: relative;
  display: grid;
  height: 238px;
  overflow: hidden;
  place-items: center;
}

.additional-options-section__visual::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(31, 31, 31, 0.04), rgba(31, 31, 31, 0.28));
  content: '';
  opacity: 0.78;
  transition: opacity 260ms ease;
}

.additional-options-section__visual img,
.additional-options-section__placeholder {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 420ms ease;
}

.additional-options-section__card:hover .additional-options-section__visual img,
.additional-options-section__card:focus-visible .additional-options-section__visual img,
.additional-options-section__card:hover .additional-options-section__placeholder,
.additional-options-section__card:focus-visible .additional-options-section__placeholder {
  transform: scale(1.05);
}

.additional-options-section__card:hover .additional-options-section__visual::after,
.additional-options-section__card:focus-visible .additional-options-section__visual::after {
  opacity: 1;
}

.additional-options-section__placeholder {
  background: inherit;
}

.additional-options-section__arrow {
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 1;
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.36);
  border-radius: 50%;
  background: rgba(31, 31, 31, 0.34);
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 0 12px 28px rgba(31, 31, 31, 0.18);
  backdrop-filter: blur(10px);
  transition:
    background 220ms ease,
    transform 220ms ease;
}

.additional-options-section__card:hover .additional-options-section__arrow,
.additional-options-section__card:focus-visible .additional-options-section__arrow {
  background: var(--landing-gold);
  transform: translateX(2px);
}

.additional-options-section__body {
  display: flex;
  flex: 1;
  flex-direction: column;
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
  margin-top: auto;
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

.additional-option-modal {
  position: fixed;
  inset: 0;
  z-index: 9998;
  display: grid;
  place-items: center;
  overflow-y: auto;
  background: rgba(31, 31, 31, 0.5);
  padding: 24px;
  pointer-events: auto;
  backdrop-filter: blur(12px);
}

.additional-option-modal__window {
  position: relative;
  display: grid;
  grid-template-columns: minmax(280px, 0.45fr) minmax(0, 0.55fr);
  gap: 18px;
  width: min(100%, 820px);
  max-height: min(720px, calc(100vh - 48px));
  overflow-y: auto;
  border: 1px solid rgba(201, 154, 75, 0.18);
  border-radius: 32px;
  background: radial-gradient(circle at 86% 8%, rgba(201, 154, 75, 0.14), transparent 30%), #fffaf2;
  box-shadow: 0 34px 90px rgba(31, 31, 31, 0.24);
  padding: clamp(16px, 2.4vw, 24px);
}

.additional-option-modal__image {
  overflow: hidden;
  border-radius: 26px;
  background: #f7f2eb;
}

.additional-option-modal__image img,
.additional-option-modal__placeholder {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
  transition: transform 420ms ease;
}

.additional-option-modal__image:hover img,
.additional-option-modal__image:hover .additional-option-modal__placeholder {
  transform: scale(1.03);
}

.additional-option-modal__placeholder {
  background: inherit;
}

.additional-option-modal__content {
  display: grid;
  align-content: start;
  gap: 12px;
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.68);
  padding: clamp(20px, 2.6vw, 26px);
}

.additional-option-modal__eyebrow {
  color: var(--landing-gold-dark);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0;
  text-transform: uppercase;
}

.additional-option-modal__content h3 {
  color: #1f1f1f;
  font-size: clamp(26px, 2.8vw, 36px);
  font-weight: 700;
  line-height: 1.08;
  margin: 0;
}

.additional-option-modal__content p {
  color: #666;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.68;
  margin: 0;
}

.additional-option-modal__features {
  display: grid;
  gap: 10px;
  margin-top: 4px;
}

.additional-option-modal__features h4 {
  color: #1f1f1f;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
}

.additional-option-modal__features ul {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.additional-option-modal__features li {
  position: relative;
  color: #1f1f1f;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.45;
  padding: 0 0 0 28px;
}

.additional-option-modal__features li::before {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  width: 18px;
  height: 18px;
  place-items: center;
  border-radius: 50%;
  background: var(--landing-gold);
  color: #fff;
  content: '✓';
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.additional-option-modal__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  border: 0;
  border-radius: 999px;
  background: var(--landing-gold);
  box-shadow: 0 16px 32px rgba(201, 154, 75, 0.24);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  margin-top: 8px;
  padding: 0 22px;
  transition:
    background 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.additional-option-modal__cta:hover {
  background: var(--landing-gold-dark);
  box-shadow: 0 20px 38px rgba(201, 154, 75, 0.32);
  transform: translateY(-1px);
}

.additional-option-modal-enter-active,
.additional-option-modal-leave-active {
  transition: opacity 220ms ease;
}

.additional-option-modal-enter-active .additional-option-modal__window,
.additional-option-modal-leave-active .additional-option-modal__window {
  transition:
    opacity 220ms ease,
    transform 260ms ease;
}

.additional-option-modal-enter-from,
.additional-option-modal-leave-to {
  opacity: 0;
}

.additional-option-modal-enter-from .additional-option-modal__window,
.additional-option-modal-leave-to .additional-option-modal__window {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}

@media (max-width: 1020px) {
  .additional-options-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .additional-option-modal__window {
    grid-template-columns: 1fr;
  }

  .additional-option-modal__image img,
  .additional-option-modal__placeholder {
    min-height: 300px;
  }
}

@media (max-width: 620px) {
  .additional-options-section {
    padding: 64px 0;
  }

  .additional-options-section__grid {
    grid-template-columns: 1fr;
  }

  .additional-options-section__visual {
    height: 220px;
  }

  .additional-options-section__body {
    padding: 22px;
  }

  .additional-option-modal {
    align-items: end;
    padding: 12px;
  }

  .additional-option-modal__window {
    width: min(100%, 90vw);
    max-height: calc(100vh - 24px);
    border-radius: 26px;
    padding: 18px;
  }

  .additional-option-modal__image img,
  .additional-option-modal__placeholder {
    min-height: 240px;
  }

  .additional-option-modal__cta {
    width: 100%;
  }
}
</style>
