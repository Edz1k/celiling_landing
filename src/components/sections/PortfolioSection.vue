<script setup lang="ts">
import type { PortfolioItem } from '~/data/portfolio'
// Работы вынесены в data-файл, чтобы пополнять портфолио без правки верстки.
import { portfolioItems } from '~/data/portfolio'

const selectedItem = ref<PortfolioItem | null>(null)

function openPortfolioItem(item: PortfolioItem) {
  selectedItem.value = item
}

function closePortfolioItem() {
  selectedItem.value = null
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

            <div class="portfolio-section__overlay">
              <span>Смотреть работу</span>
            </div>
          </div>

          <div class="portfolio-section__body">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
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
          <div class="portfolio-modal__window">
            <button class="portfolio-modal__close" type="button" aria-label="Закрыть работу" @click="closePortfolioItem">
              ×
            </button>

            <div class="portfolio-modal__image">
              <img v-if="selectedItem.image" :src="selectedItem.image" :alt="selectedItem.imageAlt">
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
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
:global(body.is-portfolio-modal-open) {
  overflow: hidden;
}

/* Портфолио: реальные фотографии работ в премиальной сетке. */
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
  border: 1px solid rgba(201, 154, 75, 0.14);
  border-radius: 26px;
  background: rgba(255, 250, 243, 0.86);
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
  box-shadow: 0 24px 62px rgba(31, 31, 31, 0.11);
  transform: translateY(-4px);
}

.portfolio-section__preview {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: linear-gradient(135deg, #cfc5b8, #f4eee5 55%, #bca88e);
}

.portfolio-section__preview img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 420ms ease;
}

.portfolio-section__card:hover .portfolio-section__preview img,
.portfolio-section__card:focus-visible .portfolio-section__preview img {
  transform: scale(1.05);
}

.portfolio-section__placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #cfc5b8, #f4eee5 55%, #bca88e);
}

.portfolio-section__overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(31, 31, 31, 0.36);
  opacity: 0;
  transition: opacity 260ms ease;
}

.portfolio-section__overlay span {
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 18px;
  backdrop-filter: blur(10px);
}

.portfolio-section__card:hover .portfolio-section__overlay,
.portfolio-section__card:focus-visible .portfolio-section__overlay {
  opacity: 1;
}

.portfolio-section__body {
  display: grid;
  gap: 10px;
  padding: 22px;
}

.portfolio-section__body h3,
.portfolio-section__body p {
  margin: 0;
}

.portfolio-section__body h3 {
  color: var(--landing-text);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.24;
}

.portfolio-section__body p {
  color: var(--landing-muted);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.58;
}

.portfolio-modal {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  overflow-y: auto;
  background: rgba(31, 31, 31, 0.48);
  padding: 24px;
  backdrop-filter: blur(12px);
}

.portfolio-modal__window {
  position: relative;
  display: grid;
  grid-template-columns: minmax(320px, 1.12fr) minmax(0, 0.88fr);
  gap: 24px;
  width: min(100%, 1080px);
  max-height: min(860px, calc(100vh - 48px));
  overflow-y: auto;
  border: 1px solid rgba(201, 154, 75, 0.18);
  border-radius: 32px;
  background: radial-gradient(circle at 86% 8%, rgba(201, 154, 75, 0.14), transparent 30%), #fffaf2;
  box-shadow: 0 34px 90px rgba(31, 31, 31, 0.24);
  padding: clamp(18px, 3vw, 30px);
}

.portfolio-modal__close {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 2;
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid rgba(201, 154, 75, 0.2);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.84);
  color: #1f1f1f;
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
  transition:
    background 220ms ease,
    transform 220ms ease;
}

.portfolio-modal__close:hover {
  background: #fff;
  transform: rotate(6deg);
}

.portfolio-modal__image {
  overflow: hidden;
  border-radius: 26px;
  background: #f7f2eb;
}

.portfolio-modal__image img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 520px;
  object-fit: cover;
}

.portfolio-modal__content {
  display: grid;
  align-content: start;
  gap: 14px;
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.68);
  padding: clamp(22px, 3vw, 30px);
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
  font-size: clamp(28px, 3.2vw, 42px);
  font-weight: 700;
  line-height: 1.08;
  margin: 0;
}

.portfolio-modal__content p {
  color: #666;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.68;
  margin: 0;
}

.portfolio-modal__features {
  display: grid;
  gap: 10px;
  margin: 8px 0 0;
}

.portfolio-modal__features div {
  border-radius: 18px;
  background: #f7f2eb;
  padding: 14px;
}

.portfolio-modal__features dt {
  color: var(--landing-gold-dark);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.2;
  margin: 0 0 6px;
  text-transform: uppercase;
}

.portfolio-modal__features dd {
  color: #1f1f1f;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.45;
  margin: 0;
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

  .portfolio-modal__image img {
    min-height: 360px;
  }
}

@media (max-width: 680px) {
  .portfolio-section {
    padding: 64px 0;
  }

  .portfolio-section__grid {
    grid-template-columns: 1fr;
  }

  .portfolio-section__overlay {
    position: static;
    display: none;
  }

  .portfolio-modal {
    align-items: end;
    padding: 12px;
  }

  .portfolio-modal__window {
    max-height: calc(100vh - 24px);
    border-radius: 26px;
    padding: 18px;
  }

  .portfolio-modal__close {
    top: 12px;
    right: 12px;
  }

  .portfolio-modal__image img {
    min-height: 240px;
  }
}
</style>
