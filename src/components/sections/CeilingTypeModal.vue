<script setup lang="ts">
import type { CeilingType } from '~/data/ceilingTypes'

const props = defineProps<{
  type: CeilingType
}>()

const emit = defineEmits<{
  close: []
}>()

const formMessage = ref('')
const isSubmitting = ref(false)
const { sendTelegramLead } = useTelegramApi()

const requestForm = reactive({
  area: '',
  comment: '',
  curtainMeters: '',
  lights: '',
  name: '',
  phone: '',
})

function closeModal() {
  emit('close')
}

async function submitRequest() {
  formMessage.value = ''

  if (!requestForm.name.trim() || !requestForm.phone.trim()) {
    formMessage.value = 'Укажите имя и номер телефона.'
    return
  }

  isSubmitting.value = true

  try {
    await sendTelegramLead({
      source: 'Калькулятор / Виды потолков',
      selectedType: props.type.title,
      area: requestForm.area,
      lights: requestForm.lights,
      curtainMeters: requestForm.curtainMeters,
      price: props.type.price,
      name: requestForm.name,
      phone: requestForm.phone,
      comment: requestForm.comment,
    })

    formMessage.value = 'Спасибо! Заявка отправлена, мы скоро свяжемся с вами.'
  }
  catch {
    formMessage.value = 'Не удалось отправить заявку. Попробуйте написать нам в WhatsApp или Telegram.'
  }
  finally {
    isSubmitting.value = false
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    closeModal()
}

onMounted(() => {
  document.body.classList.add('is-catalog-modal-open')
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.body.classList.remove('is-catalog-modal-open')
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="catalog-modal" appear>
      <div
        class="catalog-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="type.title"
        @click.self="closeModal"
      >
        <ModalCloseButton @close="closeModal" />

        <div class="catalog-modal__window">
          <!-- Верх модалки: слева визуальный placeholder, справа информация о материале -->
          <div class="catalog-modal__hero">
            <div class="catalog-modal__image" :style="{ background: type.fallbackGradient }">
              <img v-if="type.image" :src="type.image" :alt="type.imageAlt">
              <div v-else class="catalog-modal__image-card">
                <span>{{ type.title.slice(0, 1) }}</span>
                <p>{{ type.imageAlt }}</p>
              </div>
            </div>

            <div class="catalog-modal__intro">
              <p class="catalog-modal__eyebrow">
                Материал
              </p>
              <h3>{{ type.title }}</h3>
              <p>{{ type.description }}</p>
              <strong>{{ type.price }}</strong>

              <div class="catalog-modal__lists">
                <section>
                  <h4>Особенности</h4>
                  <ul>
                    <li v-for="feature in type.features" :key="feature">
                      {{ feature }}
                    </li>
                  </ul>
                </section>

                <section>
                  <h4>Лучше всего для</h4>
                  <ul>
                    <li v-for="item in type.bestFor" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>

          <form class="catalog-modal__form" @submit.prevent="submitRequest">
            <!-- Мини-квиз для предварительного расчета -->
            <section class="catalog-modal__card">
              <h4>Предварительный расчет</h4>
              <div class="catalog-modal__quiz">
                <label>
                  <span>Какая площадь потолка?</span>
                  <input v-model="requestForm.area" type="number" min="0" inputmode="decimal" placeholder="18">
                </label>

                <label>
                  <span>Сколько точек освещения?</span>
                  <input v-model="requestForm.lights" type="number" min="0" inputmode="numeric" placeholder="6">
                </label>

                <label>
                  <span>Сколько метров гардина?</span>
                  <input v-model="requestForm.curtainMeters" type="number" min="0" inputmode="decimal" placeholder="3">
                </label>
              </div>
            </section>

            <!-- Контакты клиента для будущей отправки заявки -->
            <section class="catalog-modal__card">
              <h4>Заявка</h4>
              <div class="catalog-modal__request">
                <label>
                  <span>Имя</span>
                  <input v-model="requestForm.name" type="text" autocomplete="name" placeholder="Ваше имя" required>
                </label>

                <label>
                  <span>Телефон</span>
                  <input v-model="requestForm.phone" type="tel" autocomplete="tel" placeholder="+7 ___ ___-__-__" required>
                </label>

                <label class="catalog-modal__wide">
                  <span>Комментарий</span>
                  <textarea v-model="requestForm.comment" rows="3" placeholder="Укажите район, сроки или пожелания" />
                </label>
              </div>
            </section>

            <div class="catalog-modal__actions">
              <button class="catalog-modal__submit" type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Отправляем...' : 'Оставить заявку' }}
              </button>
              <p v-if="formMessage" class="catalog-modal__message">
                {{ formMessage }}
              </p>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
:global(body.is-catalog-modal-open) {
  overflow: hidden;
}

/* Overlay модалки: затемняет страницу и центрирует окно */
.catalog-modal {
  position: fixed;
  inset: 0;
  z-index: 9998;
  display: grid;
  place-items: center;
  overflow-y: auto;
  background: rgba(31, 31, 31, 0.42);
  padding: 24px;
  pointer-events: auto;
  backdrop-filter: blur(12px);
}

.catalog-modal__window {
  position: relative;
  width: min(100%, 1040px);
  max-height: min(860px, calc(100vh - 48px));
  overflow-y: auto;
  border: 1px solid rgba(201, 154, 75, 0.18);
  border-radius: 32px;
  background: radial-gradient(circle at 88% 8%, rgba(201, 154, 75, 0.14), transparent 26%), #fffaf2;
  box-shadow: 0 34px 90px rgba(31, 31, 31, 0.24);
  padding: clamp(20px, 3vw, 34px);
}

/* Верхняя композиция: фото/placeholder и основная информация */
.catalog-modal__hero {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
  gap: 22px;
  margin-bottom: 22px;
}

.catalog-modal__image {
  position: relative;
  display: grid;
  min-height: 350px;
  overflow: hidden;
  place-items: end start;
  border-radius: 26px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.36);
  padding: 22px;
}

.catalog-modal__image img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.catalog-modal__image::before {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 28%, rgba(31, 31, 31, 0.2)),
    radial-gradient(circle at 75% 18%, rgba(255, 255, 255, 0.2), transparent 30%);
  content: '';
  z-index: 1;
  pointer-events: none;
}

.catalog-modal__image-card {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 8px;
  width: min(100%, 230px);
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  color: #1f1f1f;
  padding: 18px;
  backdrop-filter: blur(14px);
}

.catalog-modal__image-card span {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 50%;
  background: var(--landing-gold);
  color: #fff;
  font-size: 24px;
  font-weight: 600;
}

.catalog-modal__image-card p {
  color: #555;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
}

.catalog-modal__intro {
  display: grid;
  align-content: start;
  gap: 14px;
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.68);
  padding: clamp(22px, 3vw, 30px);
}

.catalog-modal__eyebrow {
  color: var(--landing-gold-dark);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0;
  text-transform: uppercase;
}

.catalog-modal__intro h3 {
  color: #1f1f1f;
  font-size: clamp(30px, 3.5vw, 46px);
  font-weight: 700;
  line-height: 1.08;
  margin: 0;
}

.catalog-modal__intro p {
  color: #666;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.68;
  margin: 0;
}

.catalog-modal__intro strong {
  color: #1f1f1f;
  font-size: 24px;
  font-weight: 600;
}

.catalog-modal__lists {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 4px;
}

.catalog-modal__lists section {
  border-radius: 18px;
  background: #f7f2eb;
  padding: 16px;
}

.catalog-modal__lists h4,
.catalog-modal__card h4 {
  color: #1f1f1f;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 12px;
}

.catalog-modal__lists ul {
  display: grid;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.catalog-modal__lists li {
  position: relative;
  color: #666;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.45;
  padding-left: 16px;
}

.catalog-modal__lists li::before {
  position: absolute;
  top: 0.48em;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--landing-gold);
  content: '';
}

.catalog-modal__form {
  display: grid;
  gap: 16px;
}

.catalog-modal__card {
  border: 1px solid rgba(201, 154, 75, 0.16);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.68);
  padding: clamp(18px, 2.4vw, 24px);
}

.catalog-modal__quiz {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.catalog-modal__request {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.catalog-modal__form label {
  display: grid;
  gap: 7px;
}

.catalog-modal__form label span {
  color: #666;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
}

.catalog-modal__form input,
.catalog-modal__form textarea {
  width: 100%;
  border: 1px solid rgba(31, 31, 31, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.88);
  color: #1f1f1f;
  font: inherit;
  font-size: 14px;
  font-weight: 400;
  outline: none;
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.catalog-modal__form input {
  min-height: 44px;
  padding: 0 14px;
}

.catalog-modal__form textarea {
  min-height: 96px;
  padding: 12px 14px;
  resize: vertical;
}

.catalog-modal__form input:focus,
.catalog-modal__form textarea:focus {
  border-color: rgba(201, 154, 75, 0.48);
  box-shadow: 0 0 0 4px rgba(201, 154, 75, 0.12);
}

.catalog-modal__wide {
  grid-column: 1 / -1;
}

.catalog-modal__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
}

.catalog-modal__submit {
  min-height: 54px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--landing-gold), var(--landing-gold-dark));
  box-shadow: 0 18px 38px rgba(201, 154, 75, 0.26);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  padding: 0 28px;
  transition:
    box-shadow 220ms ease,
    transform 220ms ease;
}

.catalog-modal__submit:hover {
  box-shadow: 0 22px 46px rgba(201, 154, 75, 0.34);
  transform: translateY(-1px);
}

.catalog-modal__submit:disabled {
  cursor: wait;
  opacity: 0.7;
  transform: none;
}

.catalog-modal__message {
  color: #666;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.55;
  margin: 0;
}

.catalog-modal-enter-active,
.catalog-modal-leave-active {
  transition: opacity 220ms ease;
}

.catalog-modal-enter-active .catalog-modal__window,
.catalog-modal-leave-active .catalog-modal__window {
  transition:
    opacity 220ms ease,
    transform 260ms ease;
}

.catalog-modal-enter-from,
.catalog-modal-leave-to {
  opacity: 0;
}

.catalog-modal-enter-from .catalog-modal__window,
.catalog-modal-leave-to .catalog-modal__window {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}

@media (max-width: 900px) {
  .catalog-modal__hero {
    grid-template-columns: 1fr;
  }

  .catalog-modal__image {
    min-height: 260px;
  }

  .catalog-modal__quiz {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .catalog-modal {
    align-items: end;
    padding: 12px;
  }

  .catalog-modal__window {
    max-height: calc(100vh - 24px);
    border-radius: 26px;
    padding: 18px;
  }

  .catalog-modal__image {
    min-height: 210px;
  }

  .catalog-modal__lists,
  .catalog-modal__quiz,
  .catalog-modal__request {
    grid-template-columns: 1fr;
  }

  .catalog-modal__actions,
  .catalog-modal__submit {
    width: 100%;
  }
}
</style>
