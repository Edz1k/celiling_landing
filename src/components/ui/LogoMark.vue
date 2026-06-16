<template>
  <a class="logo-mark" href="/" aria-label="НОВПОТОЛОК - на главную">
    <span class="logo-mark__icon" aria-hidden="true">
      <svg viewBox="0 0 44 44" role="img">
        <path
          d="M22 4.6 37.1 13.3v17.4L22 39.4 6.9 30.7V13.3L22 4.6Z"
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="2.8"
        />
        <path
          d="M27.9 17.5a7.7 7.7 0 1 0 .1 9.1"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2.8"
        />
        <path
          d="M26.8 22h8"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2.8"
        />
      </svg>
    </span>

    <span class="logo-mark__copy">
      <span class="logo-mark__title">НОВПОТОЛОК</span>
      <span class="logo-mark__subtitle">натяжные потолки в Новосибирске</span>
    </span>
  </a>
</template>

<style scoped>
.logo-mark {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  color: var(--landing-text);
  text-decoration: none;
}

.logo-mark__icon {
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  place-items: center;
  color: var(--landing-gold);
}

.logo-mark__icon svg {
  width: 100%;
  height: 100%;
}

.logo-mark__copy {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.logo-mark__title {
  color: var(--landing-text);
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1;
}

.logo-mark__subtitle {
  max-width: 150px;
  color: var(--landing-muted);
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
}

@media (max-width: 520px) {
  .logo-mark {
    gap: 9px;
  }

  .logo-mark__icon {
    width: 40px;
    height: 40px;
  }

  .logo-mark__title {
    font-size: 15px;
  }

  .logo-mark__subtitle {
    max-width: 124px;
    font-size: 9px;
  }
}
</style>
