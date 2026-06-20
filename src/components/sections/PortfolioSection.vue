<script setup lang="ts">
import type { PortfolioItem } from '~/data/portfolio'
// Работы вынесены в data-файл, чтобы пополнять портфолио без правки верстки.
import { portfolioItems } from '~/data/portfolio'

const selectedItem = ref<PortfolioItem | null>(null)
const consultationItem = ref<PortfolioItem | null>(null)

function openPortfolioItem(item: PortfolioItem) {
  selectedItem.value = item
}

function closePortfolioItem() {
  selectedItem.value = null
}

function openConsultation(item: PortfolioItem) {
  selectedItem.value = null
  consultationItem.value = item
}

function closeConsultation() {
  consultationItem.value = null
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    closePortfolioItem()
}

watch(selectedItem, (item) => {
  if (typeof document !== 'undefined')
    document.body.classList.toggle('is-portfolio-modal-open', Boolean(item))
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.body.classList.remove('is-portfolio-modal-open')
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <section id="portfolio" class="portfolio-section">
    <AppContainer>
      <SectionTitle
        eyebrow="Работы"
        title="Наши работы"
        subtitle="Посмотрите примеры потолков с подсветкой, теневым примыканием, световыми линиями и декоративными карнизами."
      />

      <div class="portfolio-section__grid">
        <article
          v-for="item in portfolioItems"
          :key="item.id"
          class="portfolio-section__card"
          tabindex="0"
          role="button"
          :aria-label="`Смотреть работу: ${item.title}`"
          @click="openPortfolioItem(item)"
          @keydown.enter.prevent="openPortfolioItem(item)"
          @keydown.space.prevent="openPortfolioItem(item)"
        >
          <div class="portfolio-section__preview">
            <img v-if="item.image" :src="item.image" :alt="item.imageAlt">
            <div v-else class="portfolio-section__placeholder" aria-hidden="true" />

            <div class="portfolio-section__overlay" aria-hidden="true" />
          </div>

          <div class="portfolio-section__body">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>

            <button
              class="portfolio-section__button"
              type="button"
              :aria-label="`Открыть подробнее: ${item.title}`"
              @click.stop="openPortfolioItem(item)"
            >
              <span>Подробнее</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>
    </AppContainer>

    <Teleport to="body">
      <Transition name="portfolio-modal" appear>
        <div
          v-if="selectedItem"
          class="portfolio-modal"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedItem.title"
          @click.self="closePortfolioItem"
        >
          <ModalCloseButton @close="closePortfolioItem" />

          <div class="portfolio-modal__window">
            <div class="portfolio-modal__image">
              <img v-if="selectedItem.image" :src="selectedItem.image" :alt="selectedItem.imageAlt">
              <div v-else class="portfolio-modal__placeholder" aria-hidden="true" />
            </div>

            <div class="portfolio-modal__content">
              <p class="portfolio-modal__eyebrow">
                Работа
              </p>
              <h3>{{ selectedItem.title }}</h3>
              <p>{{ selectedItem.description }}</p>

              <dl class="portfolio-modal__features">
                <div v-for="feature in selectedItem.characteristics" :key="feature.label">
                  <dt>{{ feature.label }}</dt>
                  <dd>{{ feature.value }}</dd>
                </div>
              </dl>

              <button class="portfolio-modal__cta" type="button" @click="openConsultation(selectedItem)">
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <CallbackModal
      v-if="consultationItem"
      title="Получить консультацию от специалиста"
      subtitle="Расскажем по выбранной работе, подскажем похожее решение для вашего помещения и сориентируем по примерной стоимости."
      submit-text="Получить консультацию"
      source="Портфолио"
      :selected-option="consultationItem.title"
      @close="closeConsultation"
    />
  </section>
</template>

<style scoped>
:global(body.is-portfolio-modal-open) {
  overflow: hidden;
}

/* Портфолио оформлено в одном стиле с блоком дополнительных решений. */
.portfolio-section {
  padding: 82px 0;
  background: #fff;
}

.portfolio-section__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 22px;
}

.portfolio-section__card {
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

.portfolio-section__card:hover,
.portfolio-section__card:focus-visible {
  border-color: rgba(201, 154, 75, 0.32);
  box-shadow: 0 24px 62px rgba(31, 31, 31, 0.12);
  transform: translateY(-4px);
}

.portfolio-section__preview {
  position: relative;
  height: 238px;
  overflow: hidden;
  background: linear-gradient(135deg, #cfc5b8, #f4eee5 55%, #bca88e);
}

.portfolio-section__preview img,
.portfolio-section__placeholder {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 420ms ease;
}

.portfolio-section__card:hover .portfolio-section__preview img,
.portfolio-section__card:focus-visible .portfolio-section__preview img,
.portfolio-section__card:hover .portfolio-section__placeholder,
.portfolio-section__card:focus-visible .portfolio-section__placeholder {
  transform: scale(1.05);
}

.portfolio-section__placeholder {
  background: linear-gradient(135deg, #cfc5b8, #f4eee5 55%, #bca88e);
}

.portfolio-section__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(31, 31, 31, 0.04), rgba(31, 31, 31, 0.28));
  opacity: 0.72;
  transition: opacity 260ms ease;
}

.portfolio-section__card:hover .portfolio-section__overlay,
.portfolio-section__card:focus-visible .portfolio-section__overlay {
  opacity: 1;
}

.portfolio-section__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
}

.portfolio-section__body h3,
.portfolio-section__body p {
  margin: 0;
}

.portfolio-section__body h3 {
  color: #1f1f1f;
  font-size: 21px;
  font-weight: 600;
  line-height: 1.25;
}

.portfolio-section__body p {
  color: #666;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.65;
}

.portfolio-section__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
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
  margin-top: auto;
  padding: 0 18px;
  transition:
    background 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.portfolio-section__button:hover {
  background: var(--landing-gold-dark);
  box-shadow: 0 18px 34px rgba(201, 154, 75, 0.3);
  transform: translateY(-1px);
}

.portfolio-modal {
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

.portfolio-modal__window {
  position: relative;
  display: grid;
  grid-template-columns: minmax(280px, 0.45fr) minmax(0, 0.55fr);
  gap: 18px;
  width: min(100%, 860px);
  max-height: min(720px, calc(100vh - 48px));
  overflow-y: auto;
  border: 1px solid rgba(201, 154, 75, 0.18);
  border-radius: 32px;
  background: radial-gradient(circle at 86% 8%, rgba(201, 154, 75, 0.14), transparent 30%), #fffaf2;
  box-shadow: 0 34px 90px rgba(31, 31, 31, 0.24);
  padding: clamp(16px, 2.4vw, 24px);
}

.portfolio-modal__image {
  overflow: hidden;
  border-radius: 26px;
  background: #f7f2eb;
}

.portfolio-modal__image img,
.portfolio-modal__placeholder {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
  transition: transform 420ms ease;
}

.portfolio-modal__image:hover img,
.portfolio-modal__image:hover .portfolio-modal__placeholder {
  transform: scale(1.03);
}

.portfolio-modal__placeholder {
  background: linear-gradient(135deg, #cfc5b8, #f4eee5 55%, #bca88e);
}

.portfolio-modal__content {
  display: grid;
  align-content: start;
  gap: 12px;
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.68);
  padding: clamp(20px, 2.6vw, 26px);
}

.portfolio-modal__eyebrow {
  color: var(--landing-gold-dark);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0;
  text-transform: uppercase;
}

.portfolio-modal__content h3 {
  color: #1f1f1f;
  font-size: clamp(26px, 2.8vw, 36px);
  font-weight: 700;
  line-height: 1.08;
  margin: 0;
}

.portfolio-modal__content p {
  color: #666;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.68;
  margin: 0;
}

.portfolio-modal__features {
  display: grid;
  gap: 9px;
  margin: 6px 0 0;
}

.portfolio-modal__features div {
  display: grid;
  gap: 3px;
  border-bottom: 1px solid rgba(201, 154, 75, 0.14);
  padding-bottom: 8px;
}

.portfolio-modal__features div:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.portfolio-modal__features dt {
  color: var(--landing-gold-dark);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
}

.portfolio-modal__features dd {
  color: #1f1f1f;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.45;
  margin: 0;
}

.portfolio-modal__cta {
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

.portfolio-modal__cta:hover {
  background: var(--landing-gold-dark);
  box-shadow: 0 20px 38px rgba(201, 154, 75, 0.32);
  transform: translateY(-1px);
}

.portfolio-modal-enter-active,
.portfolio-modal-leave-active {
  transition: opacity 220ms ease;
}

.portfolio-modal-enter-active .portfolio-modal__window,
.portfolio-modal-leave-active .portfolio-modal__window {
  transition:
    opacity 220ms ease,
    transform 260ms ease;
}

.portfolio-modal-enter-from,
.portfolio-modal-leave-to {
  opacity: 0;
}

.portfolio-modal-enter-from .portfolio-modal__window,
.portfolio-modal-leave-to .portfolio-modal__window {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}

@media (max-width: 1020px) {
  .portfolio-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .portfolio-modal__window {
    grid-template-columns: 1fr;
  }

  .portfolio-modal__image img,
  .portfolio-modal__placeholder {
    min-height: 300px;
  }
}

@media (max-width: 680px) {
  .portfolio-section {
    padding: 64px 0;
  }

  .portfolio-section__grid {
    grid-template-columns: 1fr;
  }

  .portfolio-section__preview {
    height: 220px;
  }

  .portfolio-section__body {
    padding: 22px;
  }

  .portfolio-modal {
    align-items: end;
    padding: 12px;
  }

  .portfolio-modal__window {
    width: min(100%, 92vw);
    max-height: calc(100vh - 24px);
    border-radius: 26px;
    padding: 18px;
  }

  .portfolio-modal__image img,
  .portfolio-modal__placeholder {
    min-height: 240px;
  }

  .portfolio-modal__cta {
    width: 100%;
  }
}
</style>
