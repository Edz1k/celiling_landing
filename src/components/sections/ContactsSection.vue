<script setup lang="ts">
// Контакты берем из общего navigation.ts, чтобы телефон был один для шапки и формы
import { contactInfo } from '~/data/navigation'
</script>

<template>
  <section id="contacts" class="contacts-section">
    <AppContainer>
      <div class="contacts-section__panel">
        <!-- Финальный CTA: здесь пользователь оставляет заявку на замер -->
        <SectionTitle
          align="left"
          eyebrow="Заявка"
          title="Запишитесь на бесплатный замер"
          subtitle="Форму позже подключим к Telegram, CRM или другому каналу. Сейчас блок готовит место для финального CTA."
        />

        <!-- Слева контакты, справа временная форма заявки -->
        <div class="contacts-section__content">
          <div class="contacts-section__contact-card">
            <span>Телефон</span>
            <a :href="contactInfo.phoneHref">{{ contactInfo.phone }}</a>
            <p>{{ contactInfo.schedule }}</p>
          </div>

          <!-- Пока форма без отправки: позже подключим Telegram/CRM/API -->
          <form class="contacts-section__form">
            <label>
              <span>Ваше имя</span>
              <input type="text" placeholder="Алёша" autocomplete="name">
            </label>
            <label>
              <span>Телефон</span>
              <input type="tel" placeholder="+7 ___ ___-__-__" autocomplete="tel">
            </label>
            <AppButton>
              Отправить заявку
            </AppButton>
          </form>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
/* Финальный блок заявки */
.contacts-section {
  padding: 82px 0 96px;
  background: #fff;
}

/* Темная премиальная панель, чтобы CTA визуально отличался от остальных секций */
.contacts-section__panel {
  overflow: hidden;
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(31, 31, 31, 0.82), rgba(31, 31, 31, 0.64)), linear-gradient(135deg, #8f826f, #d2c3ae);
  box-shadow: 0 24px 70px rgba(31, 31, 31, 0.16);
  padding: clamp(28px, 5vw, 54px);
}

/* Переопределяем общий SectionTitle внутри темной панели */
.contacts-section__panel :deep(.section-title__eyebrow),
.contacts-section__panel :deep(.section-title__subtitle) {
  color: rgba(255, 255, 255, 0.72);
}

.contacts-section__panel :deep(.section-title__heading) {
  color: #fff;
}

/* Desktop-сетка: контакты и форма рядом */
.contacts-section__content {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(340px, 1fr);
  gap: 28px;
}

.contacts-section__contact-card,
.contacts-section__form {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  padding: 24px;
}

.contacts-section__contact-card {
  display: grid;
  align-content: center;
  gap: 10px;
}

.contacts-section__contact-card span,
.contacts-section__form label span {
  color: rgba(255, 255, 255, 0.68);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.contacts-section__contact-card a {
  color: #fff;
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 950;
  line-height: 1;
  text-decoration: none;
}

.contacts-section__contact-card p {
  color: rgba(255, 255, 255, 0.72);
  font-size: 15px;
  font-weight: 700;
  margin: 0;
}

/* Сетка полей формы */
.contacts-section__form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  align-items: end;
  gap: 12px;
}

.contacts-section__form label {
  display: grid;
  gap: 8px;
}

.contacts-section__form input {
  width: 100%;
  min-height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--landing-text);
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  outline: none;
  padding: 0 16px;
}

/* Планшет: контакты и форма становятся одной колонкой */
@media (max-width: 980px) {
  .contacts-section__content,
  .contacts-section__form {
    grid-template-columns: 1fr;
  }
}

/* Mobile: уменьшаем вертикальные отступы и радиус панели */
@media (max-width: 560px) {
  .contacts-section {
    padding: 64px 0 76px;
  }

  .contacts-section__panel {
    border-radius: 22px;
  }
}
</style>
