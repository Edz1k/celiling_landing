<template>
  <!-- Временный кодовый логотип. Позже этот компонент легко заменить на SVG/PNG -->
  <a class="logo-mark" href="/" aria-label="СИБ ГРУП - на главную">
    <span class="logo-mark__icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img">
        <path
          d="M24 4.8 40.6 14.4v19.2L24 43.2 7.4 33.6V14.4L24 4.8Z"
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="2.8"
        />
        <path
          d="M18.2 19.2c1.7-3.2 4.7-4.9 8.2-4.2 3 .6 5.2 2.8 5.8 5.6"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2.8"
        />
        <path
          d="M29.8 28.8c-1.7 3.2-4.7 4.9-8.2 4.2-3-.6-5.2-2.8-5.8-5.6"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2.8"
        />
        <path
          d="M32.4 14.8v7.8h-7.8M15.6 33.2v-7.8h7.8"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.8"
        />
      </svg>
    </span>

    <span class="logo-mark__copy">
      <span class="logo-mark__title">СИБ ГРУП</span>
      <span class="logo-mark__subtitle">натяжные потолки</span>
    </span>
  </a>
</template>

<style scoped>
/* Общая строка логотипа: знак плюс текст */
.logo-mark {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  color: var(--landing-text);
  text-decoration: none;
  transition: transform 240ms ease;
}

.logo-mark:hover {
  transform: translateY(-1px);
}

/* Знак логотипа нарисован SVG-контуром в золотом цвете */
.logo-mark__icon {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  place-items: center;
  color: var(--landing-gold);
  filter: drop-shadow(0 10px 18px rgba(201, 154, 75, 0));
  transform-origin: center;
  transition:
    color 240ms ease,
    filter 240ms ease,
    transform 280ms ease;
}

.logo-mark:hover .logo-mark__icon {
  color: var(--landing-gold-dark);
  filter: drop-shadow(0 12px 20px rgba(201, 154, 75, 0.22));
  transform: rotate(-4deg) scale(1.04);
}

.logo-mark__icon svg {
  width: 100%;
  height: 100%;
}

.logo-mark__icon path {
  transition: stroke-width 240ms ease;
}

.logo-mark:hover .logo-mark__icon path {
  stroke-width: 3.1;
}

/* Текстовая часть логотипа */
.logo-mark__copy {
  display: grid;
  gap: 4px;
  min-width: 0;
  transition: transform 240ms ease;
}

.logo-mark:hover .logo-mark__copy {
  transform: translateX(2px);
}

.logo-mark__title {
  color: var(--landing-text);
  font-size: 20px;
  font-weight: 950;
  letter-spacing: 0;
  line-height: 1;
  white-space: nowrap;
  transition: color 220ms ease;
}

.logo-mark:hover .logo-mark__title {
  color: #111;
}

.logo-mark__subtitle {
  max-width: 150px;
  color: var(--landing-muted);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.1;
  text-transform: uppercase;
  transition: color 220ms ease;
}

.logo-mark:hover .logo-mark__subtitle {
  color: var(--landing-gold-dark);
}

/* Mobile: уменьшаем логотип, чтобы шапка не занимала много места */
@media (max-width: 520px) {
  .logo-mark {
    gap: 9px;
  }

  .logo-mark__icon {
    width: 40px;
    height: 40px;
  }

  .logo-mark__title {
    font-size: 16px;
  }

  .logo-mark__subtitle {
    max-width: 118px;
    font-size: 9px;
  }
}
</style>
