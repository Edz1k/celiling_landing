<script setup lang="ts">
import { maxLink, telegramLink, whatsappLink } from '~/data/contacts'

const isCallbackModalOpen = ref(false)

function openCallbackModal() {
  isCallbackModalOpen.value = true
}

function closeCallbackModal() {
  isCallbackModalOpen.value = false
}
</script>

<template>
  <section id="hero" class="hero-section">
    <AppContainer>
      <div class="hero-section__grid">
        <!-- Левая колонка: основной оффер, преимущества и быстрые действия. -->
        <div class="hero-section__content">
          <p class="hero-section__badge">
            Бесплатный замер сегодня
          </p>

          <h1 class="hero-section__title">
            <span>Натяжные</span>
            <span>потолки</span>
          </h1>

          <p class="hero-section__location">
            В Новосибирске
          </p>

          <p class="hero-section__text">
            Качественные натяжные потолки с установкой под ключ за 1 день без пыли и грязи
          </p>

          <ul class="hero-section__facts" aria-label="Ключевые преимущества">
            <li>
              <span class="hero-section__fact-icon">✓</span>
              <span>Гарантия<br>до 15 лет</span>
            </li>
            <li>
              <span class="hero-section__fact-icon">◷</span>
              <span>Монтаж<br>от 2 часов</span>
            </li>
            <li>
              <span class="hero-section__fact-icon">♧</span>
              <span>Экологичные<br>материалы</span>
            </li>
          </ul>

          <!-- CTA-зона: кнопка заявки и быстрые мессенджеры без лишней подписи. -->
          <div class="hero-section__actions">
            <AppButton @click="openCallbackModal">
              Мы вам позвоним!
            </AppButton>

            <div class="hero-section__messengers" aria-label="Мессенджеры">
              <a
                class="hero-section__messenger hero-section__messenger--whatsapp"
                :href="whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в WhatsApp"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.4A9.5 9.5 0 0 0 3.9 17l-1 4.6 4.7-1A9.5 9.5 0 1 0 12 2.4Zm0 17.2a7.7 7.7 0 0 1-3.9-1.1l-.3-.2-2.8.6.6-2.7-.2-.3a7.6 7.6 0 1 1 6.6 3.7Zm4.3-5.7c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.6-1.4-.8-1.9c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.7 1.2 2.9a10.2 10.2 0 0 0 4 3.5c1.5.6 2.1.7 2.9.6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .2-1.1-.1-.1-.2-.2-.4-.3Z" />
                </svg>
              </a>
              <a
                class="hero-section__messenger hero-section__messenger--telegram"
                :href="telegramLink"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в Telegram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.9 4.4 18 18.1c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L6.6 12.2 2.2 10.8c-1-.3-1-1 .2-1.5L19.6 2.7c.8-.3 1.5.2 1.3 1.7Z" />
                </svg>
              </a>
              <a
                class="hero-section__messenger hero-section__messenger--max"
                :href="maxLink"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в MAX"
              >
                MAX
              </a>
            </div>
          </div>
        </div>

        <!-- Правая колонка: фон остается главным визуалом, здесь только легкий акцент. -->
        <div class="hero-section__visual" aria-hidden="true">
          <div class="hero-section__discount">
            <span>10%</span>
            скидка на потолок до конца месяца
          </div>
        </div>
      </div>
    </AppContainer>

    <CallbackModal v-if="isCallbackModalOpen" source="Главный экран" @close="closeCallbackModal" />
  </section>
</template>

<style scoped>
/* Главный экран: интерьерный фон и светлый overlay для читаемости текста. */
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  min-height: max(720px, calc(100vh - 84px));
  overflow: hidden;
  padding: 72px 0 86px;
  background:
    linear-gradient(
      90deg,
      rgba(255, 250, 242, 0.98) 0%,
      rgba(255, 250, 242, 0.9) 32%,
      rgba(255, 250, 242, 0.5) 58%,
      rgba(255, 250, 242, 0.08) 100%
    ),
    url('../../assets/images/hero/background.webp') center right / cover no-repeat;
}

.hero-section::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at 78% 18%, rgba(201, 154, 75, 0.18), transparent 34%);
  content: '';
}

.hero-section__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(280px, 1fr);
  align-items: center;
  gap: 48px;
}

.hero-section__content {
  display: grid;
  justify-items: start;
  max-width: 720px;
}

.hero-section__badge {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  border: 1px solid rgba(201, 154, 75, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 10px 28px rgba(31, 31, 31, 0.05);
  color: var(--landing-text);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 28px;
  padding: 0 18px;
  text-transform: uppercase;
}

.hero-section__title {
  display: grid;
  color: var(--landing-text);
  font-size: clamp(72px, 7.2vw, 118px);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 0.9;
  margin: 0;
  text-transform: uppercase;
}

.hero-section__location {
  color: var(--landing-gold-dark);
  font-size: clamp(22px, 2.2vw, 34px);
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.12;
  margin: 20px 0 0;
  text-transform: uppercase;
}

.hero-section__text {
  max-width: 510px;
  color: #555;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  margin: 26px 0 0;
}

.hero-section__facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, auto));
  gap: 26px;
  list-style: none;
  margin: 34px 0 0;
  padding: 0;
}

.hero-section__facts li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--landing-text);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.35;
}

.hero-section__fact-icon {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(201, 154, 75, 0.42);
  border-radius: 50%;
  color: var(--landing-gold-dark);
  font-size: 18px;
  font-weight: 600;
}

.hero-section__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin-top: 42px;
}

.hero-section__actions :deep(.app-button) {
  min-height: 62px;
  padding: 0 34px;
}

.hero-section__messengers {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-section__messenger {
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border-radius: 50%;
  box-shadow: 0 16px 34px rgba(31, 31, 31, 0.12);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    box-shadow 220ms ease,
    transform 220ms ease;
}

.hero-section__messenger:hover {
  box-shadow: 0 20px 42px rgba(31, 31, 31, 0.16);
  transform: translateY(-2px);
}

.hero-section__messenger svg {
  width: 29px;
  height: 29px;
  fill: currentColor;
}

.hero-section__messenger--whatsapp {
  background: #25d366;
}

.hero-section__messenger--telegram {
  background: #2aabee;
}

.hero-section__messenger--max {
  background: #262626;
}

.hero-section__visual {
  position: relative;
  min-height: 520px;
}

.hero-section__discount {
  position: absolute;
  right: 2%;
  bottom: 4%;
  display: grid;
  gap: 4px;
  width: 210px;
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 44px rgba(31, 31, 31, 0.12);
  color: var(--landing-muted);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.45;
  padding: 20px;
  backdrop-filter: blur(14px);
}

.hero-section__discount span {
  color: var(--landing-gold-dark);
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
}

@media (max-width: 1020px) {
  .hero-section {
    min-height: 680px;
  }

  .hero-section__grid {
    grid-template-columns: minmax(0, 0.95fr) minmax(220px, 0.7fr);
  }

  .hero-section__visual {
    min-height: 430px;
  }
}

@media (max-width: 760px) {
  .hero-section {
    align-items: flex-start;
    min-height: 720px;
    padding: 46px 0 64px;
    background:
      linear-gradient(
        180deg,
        rgba(255, 250, 242, 0.98) 0%,
        rgba(255, 250, 242, 0.9) 48%,
        rgba(255, 250, 242, 0.72) 100%
      ),
      url('../../assets/images/hero/background.webp') center right 28% / cover no-repeat;
  }

  .hero-section__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .hero-section__title {
    font-size: clamp(42px, 14vw, 54px);
    line-height: 0.96;
  }

  .hero-section__location {
    font-size: 20px;
  }

  .hero-section__text {
    font-size: 16px;
  }

  .hero-section__facts {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 26px;
  }

  .hero-section__actions {
    align-items: flex-start;
    gap: 14px;
    margin-top: 32px;
  }

  .hero-section__actions,
  .hero-section__actions :deep(.app-button) {
    width: 100%;
  }

  .hero-section__messengers {
    width: 100%;
    justify-content: flex-start;
  }

  .hero-section__messenger {
    width: 50px;
    height: 50px;
  }

  .hero-section__messenger svg {
    width: 25px;
    height: 25px;
  }

  .hero-section__visual {
    width: 100%;
    min-height: 0;
  }

  .hero-section__discount {
    position: static;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 12px;
    width: 100%;
    max-width: 360px;
    border-radius: 16px;
    padding: 14px 16px;
  }

  .hero-section__discount span {
    font-size: 30px;
  }
}
</style>
