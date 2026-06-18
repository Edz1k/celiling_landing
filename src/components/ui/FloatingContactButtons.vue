<script setup lang="ts">
import { phoneNumbers, whatsappLink } from '~/data/contacts'

const primaryPhone = phoneNumbers[0]
</script>

<template>
  <div class="floating-contact-buttons" aria-label="Быстрая связь">
    <a
      class="floating-contact-buttons__button floating-contact-buttons__button--phone"
      :href="primaryPhone.href"
      :aria-label="`Позвонить: ${primaryPhone.label}`"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.6 10.8c1.6 3.2 3.4 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1v3.5c0 .6-.4 1-1 1C10.8 21 3 13.2 3 3.7c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
      </svg>
    </a>

    <a
      class="floating-contact-buttons__button floating-contact-buttons__button--whatsapp"
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.4A9.5 9.5 0 0 0 3.9 17l-1 4.6 4.7-1A9.5 9.5 0 1 0 12 2.4Zm0 17.2a7.7 7.7 0 0 1-3.9-1.1l-.3-.2-2.8.6.6-2.7-.2-.3a7.6 7.6 0 1 1 6.6 3.7Zm4.3-5.7c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.6-1.4-.8-1.9c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.7 1.2 2.9a10.2 10.2 0 0 0 4 3.5c1.5.6 2.1.7 2.9.6.4-.1 1.4-.6 1.6-1.1.2-.6.2-1 .2-1.1-.1-.1-.2-.2-.4-.3Z" />
      </svg>
    </a>
  </div>
</template>

<style scoped>
/* Фиксированные CTA-кнопки: быстрый звонок и WhatsApp поверх основного контента. */
.floating-contact-buttons {
  pointer-events: none;
}

.floating-contact-buttons__button {
  position: fixed;
  z-index: 82;
  display: grid;
  bottom: 32px;
  width: 64px;
  height: 64px;
  place-items: center;
  border-radius: 50%;
  box-shadow: 0 18px 42px rgba(31, 31, 31, 0.2);
  pointer-events: auto;
  transition:
    box-shadow 220ms ease,
    transform 220ms ease;
}

.floating-contact-buttons__button:hover {
  box-shadow: 0 22px 52px rgba(31, 31, 31, 0.24);
  transform: scale(1.06);
}

.floating-contact-buttons__button svg {
  width: 30px;
  height: 30px;
  fill: currentColor;
}

.floating-contact-buttons__button--phone {
  left: 32px;
  background: linear-gradient(135deg, #d3aa61, #b9852d);
  color: #fff;
}

.floating-contact-buttons__button--whatsapp {
  right: 32px;
  background: linear-gradient(135deg, #2bd366, #149f47);
  color: #fff;
}

@media (max-width: 1020px) {
  .floating-contact-buttons__button {
    bottom: 24px;
    width: 58px;
    height: 58px;
  }

  .floating-contact-buttons__button svg {
    width: 26px;
    height: 26px;
  }

  .floating-contact-buttons__button--phone {
    left: 24px;
  }

  .floating-contact-buttons__button--whatsapp {
    right: 24px;
  }
}

@media (max-width: 768px) {
  .floating-contact-buttons__button {
    bottom: calc(18px + env(safe-area-inset-bottom));
    width: 52px;
    height: 52px;
  }

  .floating-contact-buttons__button svg {
    width: 24px;
    height: 24px;
  }

  .floating-contact-buttons__button--phone {
    left: 16px;
  }

  .floating-contact-buttons__button--whatsapp {
    right: 16px;
  }
}
</style>
