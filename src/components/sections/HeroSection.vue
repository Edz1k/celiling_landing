<script setup lang="ts">
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
        <!-- Левая колонка: основной оффер, текст и кнопки -->
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

          <!-- Основные действия пользователя -->
          <div class="hero-section__actions">
            <AppButton @click="openCallbackModal">
              Мы вам позвоним!
            </AppButton>

            <div class="hero-section__messengers" aria-label="Мессенджеры">
              <a class="hero-section__messenger hero-section__messenger--whatsapp" href="https://wa.me/79231555572" aria-label="Написать в WhatsApp">
                W
              </a>
              <a class="hero-section__messenger hero-section__messenger--telegram" href="#contacts" aria-label="Написать в Telegram">
                T
              </a>
              <a class="hero-section__messenger hero-section__messenger--max" href="#contacts" aria-label="Написать в MAX">
                MAX
              </a>
            </div>
          </div>

          <p class="hero-section__note">
            Напишите нам любым удобным способом
          </p>
        </div>

        <!-- Правая колонка: сам интерьерный фон остается главным визуалом, здесь только легкие акценты -->
        <div class="hero-section__visual" aria-hidden="true">
          <div class="hero-section__discount">
            <span>10%</span>
            скидка на потолок до конца месяца
          </div>
        </div>
      </div>
    </AppContainer>

    <CallbackModal v-if="isCallbackModalOpen" @close="closeCallbackModal" />
  </section>
</template>

<style scoped>
/* Главный экран: интерьерный WebP + светлый overlay для читаемости текста */
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

/* Две колонки на desktop: сильный текст слева, воздух и акценты справа */
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
  font-weight: 950;
  letter-spacing: 0.04em;
  margin: 0 0 28px;
  padding: 0 18px;
  text-transform: uppercase;
}

.hero-section__title {
  display: grid;
  color: var(--landing-text);
  font-size: clamp(72px, 7.2vw, 118px);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 0.9;
  margin: 0;
  text-transform: uppercase;
}

.hero-section__location {
  color: var(--landing-gold-dark);
  font-size: clamp(22px, 2.2vw, 34px);
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.12;
  margin: 20px 0 0;
  text-transform: uppercase;
}

.hero-section__text {
  max-width: 510px;
  color: #555;
  font-size: 18px;
  font-weight: 750;
  line-height: 1.65;
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
  font-weight: 800;
  line-height: 1.25;
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
  font-weight: 900;
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
  font-size: 15px;
  font-weight: 950;
  text-decoration: none;
  transition:
    box-shadow 220ms ease,
    transform 220ms ease;
}

.hero-section__messenger:hover {
  box-shadow: 0 20px 42px rgba(31, 31, 31, 0.16);
  transform: translateY(-2px);
}

.hero-section__messenger--whatsapp {
  background: #25d366;
}

.hero-section__messenger--telegram {
  background: #2aabee;
}

.hero-section__messenger--max {
  background: #262626;
  font-size: 13px;
}

.hero-section__note {
  color: var(--landing-muted);
  font-size: 13px;
  font-weight: 750;
  margin: 14px 0 0 260px;
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
  font-weight: 750;
  line-height: 1.35;
  padding: 20px;
  backdrop-filter: blur(14px);
}

.hero-section__discount span {
  color: var(--landing-gold-dark);
  font-size: 34px;
  font-weight: 950;
  line-height: 1;
}

/* Планшет: уменьшаем масштаб hero, но сохраняем двухколоночную композицию */
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

/* Mobile: текст становится компактнее, фон затемняется светлым overlay */
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

  .hero-section__note {
    margin-left: 0;
  }

  .hero-section__visual {
    min-height: 82px;
  }

  .hero-section__discount {
    right: auto;
    bottom: 0;
    left: 0;
    width: min(100%, 260px);
  }
}
</style>
