<script setup lang="ts">
// Кнопка получает состояние открытого меню от AppHeader
defineProps<{
  open: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <!-- aria-expanded помогает скринридерам понять, открыто меню или закрыто -->
  <button
    class="burger-button"
    :class="{ 'burger-button--open': open }"
    type="button"
    :aria-expanded="open"
    aria-controls="mobile-navigation"
    :aria-label="open ? 'Закрыть меню' : 'Открыть меню'"
    @click="$emit('click')"
  >
    <span />
    <span />
    <span />
  </button>
</template>

<style scoped>
/* Базовая круглая кнопка бургера */
.burger-button {
  position: relative;
  display: none;
  width: 46px;
  height: 46px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(201, 154, 75, 0.26);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 12px 28px rgba(31, 31, 31, 0.08);
  color: var(--landing-text);
  cursor: pointer;
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.burger-button:hover {
  border-color: rgba(201, 154, 75, 0.48);
  box-shadow: 0 16px 34px rgba(31, 31, 31, 0.12);
  transform: translateY(-1px);
}

/* Три линии бургера рисуются обычными span */
.burger-button span {
  position: absolute;
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  transition:
    opacity 220ms ease,
    transform 260ms ease;
}

.burger-button span:nth-child(1) {
  transform: translateY(-6px);
}

.burger-button span:nth-child(3) {
  transform: translateY(6px);
}

/* Открытое состояние: линии превращаются в крестик */
.burger-button--open span:nth-child(1) {
  transform: rotate(45deg);
}

.burger-button--open span:nth-child(2) {
  opacity: 0;
}

.burger-button--open span:nth-child(3) {
  transform: rotate(-45deg);
}

/* Бургер виден только на мобильной ширине */
@media (max-width: 768px) {
  .burger-button {
    display: inline-flex;
  }
}
</style>
