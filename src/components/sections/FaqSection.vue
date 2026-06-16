<script setup lang="ts">
// Вопросы вынесены в data-файл, чтобы FAQ можно было пополнять без правки верстки.
import { faqItems } from '~/data/faq'

const activeItemId = ref(faqItems[0]?.id ?? '')

function toggleItem(id: string) {
  activeItemId.value = activeItemId.value === id ? '' : id
}
</script>

<template>
  <section id="faq" class="faq-section">
    <AppContainer>
      <div class="faq-section__inner">
        <div class="faq-section__head">
          <p class="faq-section__eyebrow">
            FAQ
          </p>
          <h2>Частые вопросы</h2>
          <p>
            Ответили на вопросы, которые чаще всего задают перед заказом натяжного потолка.
          </p>
        </div>

        <!-- Аккордеон FAQ: открываем один вопрос, чтобы блок оставался компактным. -->
        <div class="faq-section__panel">
          <article
            v-for="item in faqItems"
            :key="item.id"
            class="faq-section__item"
            :class="{ 'faq-section__item--active': activeItemId === item.id }"
          >
            <button
              class="faq-section__question"
              type="button"
              :aria-expanded="activeItemId === item.id"
              :aria-controls="`faq-answer-${item.id}`"
              @click="toggleItem(item.id)"
            >
              <span>{{ item.question }}</span>
              <span class="faq-section__icon" aria-hidden="true">
                {{ activeItemId === item.id ? '−' : '+' }}
              </span>
            </button>

            <Transition name="faq-answer">
              <div
                v-if="activeItemId === item.id"
                :id="`faq-answer-${item.id}`"
                class="faq-section__answer"
              >
                <p>{{ item.answer }}</p>
              </div>
            </Transition>
          </article>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* FAQ закрывает типовые сомнения перед заявкой и остается в светлом стиле сайта. */
.faq-section {
  padding: 82px 0;
  background: linear-gradient(180deg, #fffaf3 0%, var(--landing-milk) 100%);
}

.faq-section__inner {
  max-width: 980px;
  margin: 0 auto;
}

.faq-section__head {
  max-width: 680px;
  margin: 0 auto 30px;
  text-align: center;
}

.faq-section__eyebrow {
  color: var(--landing-gold-dark);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1;
  margin: 0 0 12px;
  text-transform: uppercase;
}

.faq-section__head h2 {
  color: #1f1f1f;
  font-size: clamp(32px, 4vw, 46px);
  font-weight: 700;
  line-height: 1.08;
  margin: 0;
}

.faq-section__head p {
  color: #666;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.65;
  margin: 16px 0 0;
}

.faq-section__panel {
  display: grid;
  gap: 10px;
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.66);
  box-shadow: 0 22px 62px rgba(31, 31, 31, 0.08);
  padding: 12px;
}

.faq-section__item {
  overflow: hidden;
  border: 1px solid rgba(201, 154, 75, 0.12);
  border-radius: 20px;
  background: rgba(255, 250, 243, 0.72);
  transition:
    border-color 220ms ease,
    background 220ms ease,
    box-shadow 220ms ease;
}

.faq-section__item:hover,
.faq-section__item--active {
  border-color: rgba(201, 154, 75, 0.32);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 14px 34px rgba(31, 31, 31, 0.055);
}

.faq-section__question {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  width: 100%;
  min-height: 70px;
  border: 0;
  background: transparent;
  color: #1f1f1f;
  cursor: pointer;
  font: inherit;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
  padding: 20px 22px;
  text-align: left;
}

.faq-section__icon {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  background: rgba(201, 154, 75, 0.12);
  color: var(--landing-gold-dark);
  font-size: 22px;
  font-weight: 500;
  line-height: 1;
  transition:
    background 220ms ease,
    color 220ms ease,
    transform 220ms ease;
}

.faq-section__item--active .faq-section__icon {
  background: var(--landing-gold);
  color: #fff;
  transform: rotate(180deg);
}

.faq-section__answer {
  padding: 0 22px 22px;
}

.faq-section__answer p {
  max-width: 820px;
  color: #666;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.7;
  margin: 0;
}

.faq-answer-enter-active,
.faq-answer-leave-active {
  overflow: hidden;
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.faq-answer-enter-from,
.faq-answer-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 760px) {
  .faq-section {
    padding: 64px 0;
  }

  .faq-section__head {
    margin-bottom: 24px;
    text-align: left;
  }

  .faq-section__panel {
    border-radius: 22px;
    padding: 8px;
  }

  .faq-section__item {
    border-radius: 18px;
  }

  .faq-section__question {
    min-height: 64px;
    gap: 12px;
    font-size: 15px;
    padding: 18px;
  }

  .faq-section__icon {
    width: 30px;
    height: 30px;
    font-size: 20px;
  }

  .faq-section__answer {
    padding: 0 18px 18px;
  }
}
</style>
