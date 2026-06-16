<script setup lang="ts">
import { contactInfo, navigationItems } from '~/data/navigation'

// Состояния шапки: открыто ли мобильное меню и был ли скролл страницы
const isMenuOpen = ref(false)
const isScrolled = ref(false)

function closeMenu() {
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function updateScrollState() {
  isScrolled.value = window.scrollY > 12
}

// Слушатели нужны только в браузере: при SSG-сборке объекта window нет
if (!import.meta.env.SSR) {
  useEventListener(window, 'scroll', updateScrollState, { passive: true })
  useEventListener(window, 'resize', () => {
    if (window.innerWidth > 900)
      closeMenu()
  })
}

// Класс на body нужен, чтобы открытое мобильное меню не создавало горизонтальный скролл
watch(isMenuOpen, (open) => {
  document.body.classList.toggle('is-mobile-menu-open', open)
})

onMounted(updateScrollState)
onBeforeUnmount(() => {
  document.body.classList.remove('is-mobile-menu-open')
})
</script>

<template>
  <header class="app-header" :class="{ 'app-header--scrolled': isScrolled, 'app-header--menu-open': isMenuOpen }">
    <div class="app-header__inner">
      <LogoMark />

      <!-- Desktop-навигация: ссылки берутся из src/data/navigation.ts -->
      <nav class="app-header__nav" aria-label="Основная навигация">
        <a
          v-for="item in navigationItems"
          :key="item.href"
          class="app-header__nav-link"
          :href="item.href"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Правый блок на desktop: телефон и график работы -->
      <div class="app-header__contacts">
        <a class="app-header__phone" :href="contactInfo.phoneHref">
          {{ contactInfo.phone }}
        </a>
        <span class="app-header__schedule">{{ contactInfo.schedule }}</span>
      </div>

      <a class="app-header__cta" href="#contacts">
        Перезвоните мне
      </a>

      <BurgerButton :open="isMenuOpen" @click="toggleMenu" />
    </div>

    <!-- Мобильная панель открывается бургером и закрывается при клике на пункт меню -->
    <Transition name="mobile-menu">
      <div v-if="isMenuOpen" id="mobile-navigation" class="app-header__mobile-panel">
        <nav class="app-header__mobile-nav" aria-label="Мобильная навигация">
          <a
            v-for="item in navigationItems"
            :key="item.href"
            class="app-header__mobile-link"
            :href="item.href"
            @click="closeMenu"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="app-header__mobile-contact">
          <a class="app-header__mobile-phone" :href="contactInfo.phoneHref">
            {{ contactInfo.phone }}
          </a>
          <span>{{ contactInfo.schedule }}</span>
        </div>

        <a class="app-header__mobile-cta" href="#contacts" @click="closeMenu">
          Перезвоните мне
        </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Базовое состояние шапки: прозрачная поверх первого экрана */
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background: rgba(255, 255, 255, 0.18);
  transition:
    background 260ms ease,
    box-shadow 260ms ease,
    border-color 260ms ease;
}

/* Состояние после скролла или при открытом меню: стеклянная подложка */
.app-header--scrolled,
.app-header--menu-open {
  border-bottom: 1px solid rgba(201, 154, 75, 0.14);
  background: rgba(255, 252, 247, 0.82);
  box-shadow: 0 18px 50px rgba(31, 31, 31, 0.08);
  backdrop-filter: blur(18px);
}

/* Desktop-сетка: логотип, меню, контакты, CTA */
.app-header__inner {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 26px;
  width: min(100% - 48px, 1220px);
  min-height: 88px;
  margin: 0 auto;
}

.app-header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 1.55vw, 28px);
  min-width: 0;
}

.app-header__nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  color: rgba(31, 31, 31, 0.78);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  transition: color 220ms ease;
}

/* Анимация золотой линии под пунктом меню */
.app-header__nav-link::after {
  position: absolute;
  right: 0;
  bottom: 5px;
  left: 0;
  height: 2px;
  border-radius: 999px;
  background: var(--landing-gold);
  content: '';
  opacity: 0;
  transform: scaleX(0.35);
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

.app-header__nav-link:hover {
  color: var(--landing-text);
}

.app-header__nav-link:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.app-header__contacts {
  display: grid;
  gap: 4px;
  justify-items: end;
  white-space: nowrap;
}

.app-header__phone {
  color: var(--landing-text);
  font-size: 18px;
  font-weight: 900;
  line-height: 1;
  text-decoration: none;
  transition: color 220ms ease;
}

.app-header__phone:hover {
  color: var(--landing-gold-dark);
}

.app-header__schedule {
  color: var(--landing-muted);
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
}

.app-header__cta,
.app-header__mobile-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--landing-gold), var(--landing-gold-dark));
  box-shadow: 0 14px 30px rgba(201, 154, 75, 0.24);
  color: #fff;
  font-size: 14px;
  font-weight: 900;
  line-height: 1;
  padding: 0 24px;
  text-decoration: none;
  white-space: nowrap;
  transition:
    box-shadow 220ms ease,
    filter 220ms ease,
    transform 220ms ease;
}

.app-header__cta:hover,
.app-header__mobile-cta:hover {
  box-shadow: 0 18px 38px rgba(201, 154, 75, 0.34);
  filter: brightness(0.96);
  transform: translateY(-1px);
}

/* Выпадающая мобильная панель */
.app-header__mobile-panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 16px;
  left: 16px;
  display: none;
  max-height: calc(100vh - 112px);
  overflow-y: auto;
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 24px;
  background: rgba(255, 252, 247, 0.94);
  box-shadow: 0 24px 64px rgba(31, 31, 31, 0.14);
  padding: 18px;
  backdrop-filter: blur(18px);
}

.app-header__mobile-nav {
  display: grid;
  gap: 4px;
}

.app-header__mobile-link {
  display: flex;
  align-items: center;
  min-height: 42px;
  border-radius: 14px;
  color: var(--landing-text);
  font-size: 16px;
  font-weight: 800;
  padding: 0 12px;
  text-decoration: none;
  transition:
    background 220ms ease,
    color 220ms ease;
}

.app-header__mobile-link:hover {
  background: rgba(201, 154, 75, 0.1);
  color: var(--landing-gold-dark);
}

.app-header__mobile-contact {
  display: grid;
  gap: 7px;
  border-top: 1px solid rgba(31, 31, 31, 0.08);
  color: var(--landing-muted);
  font-size: 13px;
  font-weight: 700;
  margin-top: 14px;
  padding: 18px 12px 14px;
}

.app-header__mobile-phone {
  color: var(--landing-text);
  font-size: 20px;
  font-weight: 900;
  text-decoration: none;
}

.app-header__mobile-cta {
  width: 100%;
}

/* Анимация появления/скрытия мобильного меню */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 220ms ease,
    transform 260ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Узкий desktop: чуть сжимаем расстояния, чтобы шапка не ломалась */
@media (max-width: 1140px) {
  .app-header__inner {
    gap: 18px;
    width: min(100% - 36px, 1220px);
  }

  .app-header__nav {
    gap: 13px;
  }

  .app-header__nav-link {
    font-size: 13px;
  }

  .app-header__phone {
    font-size: 16px;
  }

  .app-header__cta {
    padding: 0 18px;
  }
}

/* Mobile: прячем desktop-меню и показываем бургер */
@media (max-width: 900px) {
  .app-header__inner {
    display: flex;
    justify-content: space-between;
    min-height: 72px;
    width: min(100% - 28px, 1220px);
  }

  .app-header__nav,
  .app-header__contacts,
  .app-header__cta {
    display: none;
  }

  .app-header__mobile-panel {
    display: block;
  }
}
</style>
