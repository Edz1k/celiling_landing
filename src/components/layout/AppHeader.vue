<script setup lang="ts">
import { contactSchedule, phoneNumbers } from '~/data/contacts'
import { navigationItems } from '~/data/navigation'

// Состояния шапки: мобильное меню, dropdown звонка и эффект после скролла
const isMenuOpen = ref(false)
const isCallDropdownOpen = ref(false)
const isScrolled = ref(false)
const callDropdownRef = ref<HTMLElement | null>(null)

function closeMenu() {
  isMenuOpen.value = false
}

function closeCallDropdown() {
  isCallDropdownOpen.value = false
}

function toggleMenu() {
  closeCallDropdown()
  isMenuOpen.value = !isMenuOpen.value
}

function toggleCallDropdown() {
  closeMenu()
  isCallDropdownOpen.value = !isCallDropdownOpen.value
}

function updateScrollState() {
  isScrolled.value = window.scrollY > 12
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target

  if (!(target instanceof Node) || !callDropdownRef.value)
    return

  if (!callDropdownRef.value.contains(target))
    closeCallDropdown()
}

// Слушатели нужны только в браузере: при SSG-сборке объекта window нет
if (!import.meta.env.SSR) {
  useEventListener(window, 'scroll', updateScrollState, { passive: true })
  useEventListener(window, 'resize', () => {
    if (window.innerWidth > 768) {
      closeMenu()
      closeCallDropdown()
    }
  })
  useEventListener(document, 'click', handleDocumentClick)
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
  <header
    class="app-header"
    :class="{
      'app-header--scrolled': isScrolled,
      'app-header--menu-open': isMenuOpen,
      'app-header--call-open': isCallDropdownOpen,
    }"
  >
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
        <div class="app-header__phones" aria-label="Телефоны">
          <a
            v-for="phone in phoneNumbers"
            :key="phone.href"
            class="app-header__phone"
            :href="phone.href"
          >
            {{ phone.label }}
          </a>
        </div>
        <span class="app-header__schedule">{{ contactSchedule }}</span>
      </div>

      <a class="app-header__cta" :href="phoneNumbers[0].href">
        Позвоните нам!
      </a>

      <!-- Mobile-кнопка звонка: открывает выбор из двух номеров -->
      <div ref="callDropdownRef" class="app-header__call">
        <button
          class="app-header__call-button"
          type="button"
          :aria-expanded="isCallDropdownOpen"
          aria-controls="mobile-call-dropdown"
          aria-label="Выбрать номер для звонка"
          @click.stop="toggleCallDropdown"
        >
          Позвонить
        </button>

        <Transition name="call-dropdown">
          <div
            v-if="isCallDropdownOpen"
            id="mobile-call-dropdown"
            class="app-header__call-dropdown"
          >
            <a
              v-for="phone in phoneNumbers"
              :key="phone.href"
              :href="phone.href"
              @click="closeCallDropdown"
            >
              {{ phone.label }}
            </a>
          </div>
        </Transition>
      </div>

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
          <a
            v-for="phone in phoneNumbers"
            :key="phone.href"
            class="app-header__mobile-phone"
            :href="phone.href"
            @click="closeMenu"
          >
            {{ phone.label }}
          </a>
          <span>{{ contactSchedule }}</span>
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
  border-bottom: 1px solid rgba(201, 154, 75, 0.16);
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 10px 30px rgba(31, 31, 31, 0.035);
  backdrop-filter: blur(16px);
  transition:
    background 260ms ease,
    box-shadow 260ms ease,
    border-color 260ms ease;
}

/* Состояние после скролла или при открытом меню: стеклянная подложка */
.app-header--scrolled,
.app-header--menu-open,
.app-header--call-open {
  border-bottom-color: rgba(201, 154, 75, 0.16);
  background: rgba(255, 252, 247, 0.86);
  box-shadow: 0 18px 46px rgba(31, 31, 31, 0.09);
}

/* Desktop-сетка: логотип, меню, контакты, CTA */
.app-header__inner {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 22px;
  width: min(100% - 48px, 1220px);
  min-height: 84px;
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
  font-weight: 500;
  line-height: 1.2;
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
  gap: 6px;
  justify-items: end;
  white-space: nowrap;
}

.app-header__phones {
  display: grid;
  gap: 4px;
  justify-items: end;
}

.app-header__phone {
  color: var(--landing-text);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.15;
  text-decoration: none;
  transition: color 220ms ease;
}

.app-header__phone:hover {
  color: var(--landing-gold-dark);
}

.app-header__schedule {
  color: var(--landing-muted);
  font-size: 11px;
  font-weight: 400;
  line-height: 1.25;
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
  font-weight: 600;
  line-height: 1.15;
  padding: 0 24px;
  text-decoration: none;
  white-space: nowrap;
  transition:
    box-shadow 220ms ease,
    filter 220ms ease,
    transform 220ms ease;
}

.app-header__call {
  position: relative;
  display: none;
}

.app-header__call-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border: 1px solid rgba(201, 154, 75, 0.28);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 12px 28px rgba(31, 31, 31, 0.07);
  color: var(--landing-text);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.15;
  padding: 0 16px;
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.app-header__call-button:hover {
  border-color: rgba(201, 154, 75, 0.48);
  box-shadow: 0 16px 34px rgba(31, 31, 31, 0.1);
  transform: translateY(-1px);
}

.app-header__call-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  display: grid;
  gap: 4px;
  min-width: 206px;
  border: 1px solid rgba(201, 154, 75, 0.18);
  border-radius: 18px;
  background: rgba(255, 252, 247, 0.96);
  box-shadow: 0 22px 54px rgba(31, 31, 31, 0.14);
  padding: 8px;
  backdrop-filter: blur(16px);
}

.app-header__call-dropdown a {
  border-radius: 12px;
  color: var(--landing-text);
  font-size: 15px;
  font-weight: 500;
  padding: 12px;
  text-decoration: none;
  transition:
    background 220ms ease,
    color 220ms ease;
}

.app-header__call-dropdown a:hover {
  background: rgba(201, 154, 75, 0.1);
  color: var(--landing-gold-dark);
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
  font-weight: 500;
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
  font-weight: 400;
  margin-top: 14px;
  padding: 18px 12px 14px;
}

.app-header__mobile-phone {
  color: var(--landing-text);
  font-size: 18px;
  font-weight: 600;
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

.call-dropdown-enter-active,
.call-dropdown-leave-active {
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.call-dropdown-enter-from,
.call-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Узкий desktop: чуть сжимаем расстояния, чтобы шапка не ломалась */
@media (max-width: 1140px) {
  .app-header__inner {
    gap: 18px;
    width: min(100% - 36px, 1220px);
  }

  .app-header__nav {
    gap: 11px;
  }

  .app-header__nav-link {
    font-size: 13px;
  }

  .app-header__phone {
    font-size: 14px;
  }

  .app-header__cta {
    padding: 0 18px;
  }
}

/* Tablet: убираем CTA, чтобы меню и два номера не наезжали друг на друга */
@media (max-width: 980px) {
  .app-header__inner {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .app-header__cta {
    display: none;
  }
}

/* Mobile: прячем desktop-меню, показываем звонок и бургер */
@media (max-width: 768px) {
  :global(section[id]) {
    scroll-margin-top: 82px;
  }

  :global(main) {
    padding-top: 64px;
  }

  .app-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 86;
    width: 100%;
    background: rgba(255, 252, 247, 0.9);
    box-shadow: 0 10px 30px rgba(31, 31, 31, 0.06);
    backdrop-filter: blur(16px);
  }

  .app-header--scrolled,
  .app-header--menu-open,
  .app-header--call-open {
    background: rgba(255, 252, 247, 0.94);
    box-shadow: 0 16px 42px rgba(31, 31, 31, 0.12);
  }

  .app-header__inner {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    min-height: 64px;
    width: min(100% - 28px, 1220px);
  }

  .app-header__nav,
  .app-header__contacts,
  .app-header__cta {
    display: none;
  }

  .app-header__call {
    display: block;
    margin-left: auto;
  }

  .app-header__mobile-panel {
    display: block;
    max-height: calc(100vh - 92px);
  }
}

@media (max-width: 420px) {
  .app-header__call-button {
    width: 42px;
    padding: 0;
    font-size: 0;
  }

  .app-header__call-button::before {
    content: '☎';
    font-size: 17px;
  }
}
</style>
