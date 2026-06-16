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
            Натяжные потолки в Новосибирске с установкой за 1 день
          </h1>

          <p class="hero-section__text">
            Аккуратный монтаж под ключ, понятная смета после замера и гарантия на материалы и работы.
          </p>

          <!-- Основные действия пользователя -->
          <div class="hero-section__actions">
            <AppButton href="#contacts">
              Рассчитать стоимость
            </AppButton>
            <AppButton href="tel:+73831234567" variant="secondary">
              Позвонить
            </AppButton>
          </div>

          <ul class="hero-section__facts" aria-label="Ключевые преимущества">
            <li>от 390 ₽/м²</li>
            <li>гарантия до 15 лет</li>
            <li>монтаж без грязи</li>
          </ul>
        </div>

        <!-- Правая колонка: временная декоративная сцена, позже можно заменить на фото/галерею -->
        <div class="hero-section__visual" aria-hidden="true">
          <div class="hero-section__room">
            <div class="hero-section__light-line" />
            <div class="hero-section__window" />
            <div class="hero-section__sofa" />
            <div class="hero-section__card">
              <span>10%</span>
              скидка на потолок до конца месяца
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* Главный экран: здесь подключен фоновый WebP из src/assets/images/hero */
.hero-section {
  padding: 72px 0 86px;
  background:
    linear-gradient(90deg, rgba(255, 250, 242, 0.96), rgba(255, 250, 242, 0.42)),
    url('../../assets/images/hero/background.webp') center / cover no-repeat;
}

/* Две колонки на desktop: контент слева, визуал справа */
.hero-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(340px, 1.05fr);
  align-items: center;
  gap: 48px;
}

.hero-section__content {
  display: grid;
  justify-items: start;
}

.hero-section__badge {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  border: 1px solid rgba(201, 154, 75, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--landing-text);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.04em;
  margin: 0 0 22px;
  padding: 0 14px;
  text-transform: uppercase;
}

.hero-section__title {
  max-width: 720px;
  color: var(--landing-text);
  font-size: clamp(42px, 6vw, 76px);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 0.98;
  margin: 0;
  text-transform: uppercase;
}

.hero-section__text {
  max-width: 520px;
  color: var(--landing-muted);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.65;
  margin: 24px 0 0;
}

.hero-section__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.hero-section__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  margin: 30px 0 0;
  padding: 0;
}

.hero-section__facts li {
  border-left: 2px solid var(--landing-gold);
  color: var(--landing-text);
  font-size: 14px;
  font-weight: 850;
  line-height: 1.2;
  padding-left: 12px;
}

.hero-section__visual {
  min-width: 0;
}

/* Временная карточка-визуал. Когда будет реальное фото, этот блок можно упростить */
.hero-section__room {
  position: relative;
  min-height: 460px;
  overflow: hidden;
  border: 1px solid rgba(201, 154, 75, 0.18);
  border-radius: 28px;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.66), transparent 42%),
    linear-gradient(145deg, #d9d0c2, #f7f2eb 54%, #c8b7a0);
  box-shadow: 0 30px 80px rgba(31, 31, 31, 0.12);
}

.hero-section__light-line {
  position: absolute;
  top: 72px;
  right: 0;
  left: 12%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #f5d28f, transparent);
  box-shadow: 0 0 28px rgba(245, 210, 143, 0.9);
}

.hero-section__window {
  position: absolute;
  top: 118px;
  left: 34%;
  width: 220px;
  height: 190px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: inset 0 0 0 12px rgba(255, 255, 255, 0.24);
}

.hero-section__sofa {
  position: absolute;
  right: 12%;
  bottom: 70px;
  width: 390px;
  max-width: 72%;
  height: 118px;
  border-radius: 28px 28px 18px 18px;
  background: #d7c8b6;
  box-shadow: 0 22px 42px rgba(31, 31, 31, 0.12);
}

.hero-section__card {
  position: absolute;
  right: 28px;
  bottom: 28px;
  display: grid;
  gap: 4px;
  width: 188px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 38px rgba(31, 31, 31, 0.12);
  color: var(--landing-muted);
  font-size: 13px;
  font-weight: 750;
  line-height: 1.35;
  padding: 18px;
}

.hero-section__card span {
  color: var(--landing-gold-dark);
  font-size: 28px;
  font-weight: 950;
  line-height: 1;
}

/* Планшет и мобильные: перестраиваем hero в одну колонку */
@media (max-width: 900px) {
  .hero-section {
    padding: 48px 0 64px;
  }

  .hero-section__grid {
    grid-template-columns: 1fr;
  }

  .hero-section__room {
    min-height: 340px;
  }
}

/* Маленькие экраны: кнопки на всю ширину, визуал ниже и компактнее */
@media (max-width: 520px) {
  .hero-section__actions,
  .hero-section__actions :deep(.app-button) {
    width: 100%;
  }

  .hero-section__room {
    min-height: 280px;
    border-radius: 22px;
  }
}
</style>
