<script setup lang="ts">
import { phoneNumbers } from '~/data/contacts'

// Мессенджеры пока работают как визуальные заглушки: реальные ссылки подключим позже.
const messengers = [
  {
    label: 'WhatsApp',
    mark: 'W',
  },
  {
    label: 'Telegram',
    mark: 'T',
  },
  {
    label: 'MAX',
    mark: 'MAX',
  },
]

const contactSchedule = 'Ежедневно с 9:00 до 21:00'
const isCallbackModalOpen = ref(false)

function openCallbackModal() {
  isCallbackModalOpen.value = true
}

function closeCallbackModal() {
  isCallbackModalOpen.value = false
}
</script>

<template>
  <section id="contacts" class="contacts-section">
    <AppContainer>
      <div class="contacts-section__panel">
        <!-- Верх блока: компактный финальный CTA перед контактными карточками. -->
        <div class="contacts-section__head">
          <p class="contacts-section__eyebrow">
            Контакты
          </p>
          <h2>Свяжитесь с нами удобным способом</h2>
          <p>
            Поможем подобрать материал, рассчитаем стоимость и ответим на вопросы по натяжным потолкам.
          </p>
        </div>

        <div class="contacts-section__content">
          <!-- Левая карточка: реальные кликабельные телефоны и график работы. -->
          <div class="contacts-section__card contacts-section__card--phones">
            <p class="contacts-section__card-label">
              Телефоны
            </p>

            <div class="contacts-section__phones" aria-label="Телефоны компании">
              <a
                v-for="phone in phoneNumbers"
                :key="phone.href"
                class="contacts-section__phone"
                :href="phone.href"
              >
                <span aria-hidden="true">☎</span>
                {{ phone.label }}
              </a>
            </div>

            <p class="contacts-section__schedule">
              {{ contactSchedule }}
            </p>

            <p class="contacts-section__trust-text">
              Свяжитесь с нами любым удобным способом. Подскажем по материалам, срокам и аккуратно сориентируем по стоимости.
            </p>
          </div>

          <!-- Правая карточка: будущие мессенджеры и кнопка существующей модалки обратного звонка. -->
          <div class="contacts-section__card contacts-section__card--actions">
            <div class="contacts-section__messenger-head">
              <p class="contacts-section__card-label">
                Мессенджеры
              </p>
              <h3>Напишите нам удобным способом</h3>
              <span>Скоро подключим все мессенджеры</span>
            </div>

            <div class="contacts-section__messengers" aria-label="Будущие мессенджеры">
              <button
                v-for="messenger in messengers"
                :key="messenger.label"
                class="contacts-section__messenger"
                type="button"
                disabled
              >
                <span>{{ messenger.mark }}</span>
                <small>{{ messenger.label }}</small>
              </button>
            </div>

            <button class="contacts-section__callback-button" type="button" @click="openCallbackModal">
              Мы вам позвоним
            </button>
          </div>
        </div>
      </div>
    </AppContainer>

    <CallbackModal v-if="isCallbackModalOpen" @close="closeCallbackModal" />
  </section>
</template>

<style scoped>
/* Внешняя секция остается светлой, как остальные блоки страницы. */
.contacts-section {
  padding: 82px 0 96px;
  background: #fff;
}

.contacts-section__panel {
  overflow: hidden;
  display: grid;
  gap: 30px;
  border-radius: 32px;
  background:
    radial-gradient(circle at 12% 0%, rgba(201, 154, 75, 0.18), transparent 32%),
    linear-gradient(135deg, #252525 0%, #333 100%);
  box-shadow: 0 28px 76px rgba(31, 31, 31, 0.18);
  padding: clamp(28px, 5vw, 48px);
}

.contacts-section__head {
  max-width: 720px;
}

.contacts-section__eyebrow {
  color: var(--landing-gold);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1;
  margin: 0 0 12px;
  text-transform: uppercase;
}

.contacts-section__head h2 {
  max-width: 680px;
  color: #f7f2eb;
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.08;
  margin: 0;
}

.contacts-section__head p:last-child {
  max-width: 620px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.62;
  margin: 16px 0 0;
}

.contacts-section__content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

/* Внутренние подблоки: темное стекло поверх графитового фона без белых плашек. */
.contacts-section__card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 24px 54px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(10px);
  padding: 24px;
}

.contacts-section__card--phones {
  display: grid;
  align-content: center;
  gap: 16px;
}

.contacts-section__card--actions {
  display: grid;
  gap: 16px;
}

.contacts-section__card-label {
  color: var(--landing-gold);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;
}

.contacts-section__phones {
  display: grid;
  gap: 8px;
}

.contacts-section__phone {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
  min-height: 42px;
  border-radius: 999px;
  color: #f7f2eb;
  font-size: clamp(19px, 2.1vw, 27px);
  font-weight: 600;
  line-height: 1.12;
  text-decoration: none;
  transition:
    color 220ms ease,
    transform 220ms ease;
}

.contacts-section__phone:hover {
  color: var(--landing-gold);
  transform: translateX(2px);
}

.contacts-section__phone span {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  background: rgba(201, 154, 75, 0.16);
  color: var(--landing-gold);
  font-size: 15px;
  line-height: 1;
}

.contacts-section__schedule,
.contacts-section__trust-text {
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.58;
  margin: 0;
}

.contacts-section__trust-text {
  max-width: 520px;
  color: rgba(255, 255, 255, 0.62);
}

.contacts-section__messenger-head h3 {
  color: #f7f2eb;
  font-size: clamp(22px, 2.4vw, 30px);
  font-weight: 700;
  line-height: 1.14;
  margin: 10px 0 8px;
}

.contacts-section__messenger-head span {
  color: rgba(255, 255, 255, 0.64);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
}

.contacts-section__messengers {
  display: grid;
  gap: 9px;
}

.contacts-section__messenger {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 54px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.07);
  color: #f7f2eb;
  cursor: not-allowed;
  font: inherit;
  opacity: 0.88;
  padding: 9px 12px;
  text-align: left;
  transition:
    border-color 220ms ease,
    background 220ms ease,
    transform 220ms ease;
}

.contacts-section__messenger:hover {
  border-color: rgba(201, 154, 75, 0.46);
  background: rgba(201, 154, 75, 0.12);
  transform: translateY(-1px);
}

.contacts-section__messenger span {
  display: grid;
  flex: 0 0 auto;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--landing-gold), var(--landing-gold-dark));
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.contacts-section__messenger small {
  color: rgba(255, 255, 255, 0.82);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
}

.contacts-section__callback-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: start;
  min-height: 46px;
  border: 0;
  border-radius: 999px;
  background: #c99a4b;
  box-shadow: 0 16px 34px rgba(201, 154, 75, 0.22);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.15;
  padding: 0 24px;
  transition:
    background 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.contacts-section__callback-button:hover {
  background: #bd8d3d;
  box-shadow: 0 20px 40px rgba(201, 154, 75, 0.3);
  transform: translateY(-1px);
}

/* Планшет: карточки становятся одной колонкой, сохраняя компактность и читаемость. */
@media (max-width: 900px) {
  .contacts-section__content {
    grid-template-columns: 1fr;
  }
}

/* Mobile: меньше воздуха, но все элементы остаются удобными для нажатия. */
@media (max-width: 560px) {
  .contacts-section {
    padding: 64px 0 76px;
  }

  .contacts-section__panel {
    gap: 22px;
    border-radius: 24px;
    padding: 24px;
  }

  .contacts-section__card {
    border-radius: 20px;
    padding: 20px;
  }

  .contacts-section__phone {
    width: 100%;
    font-size: 19px;
  }

  .contacts-section__callback-button {
    width: 100%;
  }
}
</style>
