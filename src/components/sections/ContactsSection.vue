<script setup lang="ts">
import { contactSchedule, maxLink, phoneNumbers, whatsappLink } from '~/data/contacts'

const messengers = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: whatsappLink,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: undefined,
  },
  {
    id: 'max',
    label: 'MAX',
    href: maxLink,
  },
]

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
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.6 3.2 3.4 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1v3.5c0 .6-.4 1-1 1C10.8 21 3 13.2 3 3.7c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
                  </svg>
                </span>
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

          <!-- Правая карточка: мессенджеры и кнопка существующей модалки обратного звонка. -->
          <div class="contacts-section__card contacts-section__card--actions">
            <div class="contacts-section__messenger-head">
              <p class="contacts-section__card-label">
                Мессенджеры
              </p>
              <h3>Напишите нам удобным для вас способом!</h3>
              <span>Ответим в WhatsApp, MAX или Telegram</span>
            </div>

            <div class="contacts-section__messengers" aria-label="Мессенджеры">
              <component
                :is="messenger.href ? 'a' : 'button'"
                v-for="messenger in messengers"
                :key="messenger.id"
                class="contacts-section__messenger"
                :class="[
                  `contacts-section__messenger--${messenger.id}`,
                  { 'contacts-section__messenger--active': messenger.href },
                ]"
                :href="messenger.href"
                :target="messenger.href ? '_blank' : undefined"
                :rel="messenger.href ? 'noopener noreferrer' : undefined"
                :type="messenger.href ? undefined : 'button'"
                :disabled="!messenger.href"
                :aria-label="messenger.href ? `Написать в ${messenger.label}` : undefined"
              >
                <span class="contacts-section__messenger-icon" aria-hidden="true">
                  <svg v-if="messenger.id === 'whatsapp'" viewBox="0 0 24 24">
                    <path d="M12 2.4A9.5 9.5 0 0 0 3.9 17l-1 4.6 4.7-1A9.5 9.5 0 1 0 12 2.4Zm0 17.2a7.7 7.7 0 0 1-3.9-1.1l-.3-.2-2.8.6.6-2.7-.2-.3a7.6 7.6 0 1 1 6.6 3.7Zm4.3-5.7c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.6-1.4-.8-1.9c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.7 1.2 2.9a10.2 10.2 0 0 0 4 3.5c1.5.6 2.1.7 2.9.6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .2-1.1-.1-.1-.2-.2-.4-.3Z" />
                  </svg>
                  <svg v-else-if="messenger.id === 'telegram'" viewBox="0 0 24 24">
                    <path d="M20.9 4.4 18 18.1c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L6.6 12.2 2.2 10.8c-1-.3-1-1 .2-1.5L19.6 2.7c.8-.3 1.5.2 1.3 1.7Z" />
                  </svg>
                  <strong v-else>MAX</strong>
                </span>
                <small>{{ messenger.label }}</small>
              </component>
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
  line-height: 1;
}

.contacts-section__phone svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
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
  opacity: 0.9;
  padding: 9px 12px;
  text-align: left;
  text-decoration: none;
  transition:
    border-color 220ms ease,
    background 220ms ease,
    transform 220ms ease;
}

.contacts-section__messenger--active {
  cursor: pointer;
}

.contacts-section__messenger:hover {
  border-color: rgba(201, 154, 75, 0.46);
  background: rgba(201, 154, 75, 0.12);
  transform: translateY(-1px);
}

.contacts-section__messenger-icon {
  display: grid;
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  line-height: 1;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}

.contacts-section__messenger-icon svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.contacts-section__messenger-icon strong {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.contacts-section__messenger--whatsapp .contacts-section__messenger-icon {
  background: #25d366;
}

.contacts-section__messenger--telegram .contacts-section__messenger-icon {
  background: #2aabee;
}

.contacts-section__messenger--max .contacts-section__messenger-icon {
  background: #262626;
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

@media (max-width: 900px) {
  .contacts-section__content {
    grid-template-columns: 1fr;
  }
}

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
