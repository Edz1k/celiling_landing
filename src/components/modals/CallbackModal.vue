<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const formMessage = ref('')

const callbackForm = reactive({
  comment: '',
  name: '',
  phone: '',
})

function closeModal() {
  emit('close')
}

function submitCallback() {
  const requestDraft = {
    source: 'hero_callback',
    name: callbackForm.name,
    phone: callbackForm.phone,
    comment: callbackForm.comment,
  }

  // Временный вывод заявки до подключения реальной отправки.
  // eslint-disable-next-line no-console
  console.log(requestDraft)
  formMessage.value = 'Заявка подготовлена. Отправку подключим позже.'
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape')
    closeModal()
}

onMounted(() => {
  document.body.classList.add('is-callback-modal-open')
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.body.classList.remove('is-callback-modal-open')
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="callback-modal" appear>
      <div
        class="callback-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Оставьте заявку — мы вам позвоним"
        @click.self="closeModal"
      >
        <div class="callback-modal__window">
          <button class="callback-modal__close" type="button" aria-label="Закрыть модалку" @click="closeModal">
            ×
          </button>

          <div class="callback-modal__head">
            <p>Обратный звонок</p>
            <h3>Оставьте заявку — мы вам позвоним</h3>
            <span>Уточним детали, ответим на вопросы и подскажем примерную стоимость</span>
          </div>

          <form class="callback-modal__form" @submit.prevent="submitCallback">
            <!-- Контакты клиента для будущего подключения отправки заявки -->
            <label>
              <span>Имя</span>
              <input v-model="callbackForm.name" type="text" autocomplete="name" placeholder="Ваше имя">
            </label>

            <label>
              <span>Телефон</span>
              <input v-model="callbackForm.phone" type="tel" autocomplete="tel" placeholder="+7 ___ ___-__-__">
            </label>

            <label>
              <span>Комментарий / что нужно сделать</span>
              <textarea v-model="callbackForm.comment" rows="4" placeholder="Например: потолок в гостиной, 18 м²" />
            </label>

            <button class="callback-modal__submit" type="submit">
              Жду звонка
            </button>

            <p v-if="formMessage" class="callback-modal__message">
              {{ formMessage }}
            </p>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
:global(body.is-callback-modal-open) {
  overflow: hidden;
}

/* Overlay модалки: закрывается кликом вне окна */
.callback-modal {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  overflow-y: auto;
  background: rgba(31, 31, 31, 0.42);
  padding: 24px;
  backdrop-filter: blur(12px);
}

.callback-modal__window {
  position: relative;
  width: min(100%, 520px);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  border: 1px solid rgba(201, 154, 75, 0.18);
  border-radius: 30px;
  background: radial-gradient(circle at 86% 8%, rgba(201, 154, 75, 0.16), transparent 30%), #fffaf2;
  box-shadow: 0 34px 90px rgba(31, 31, 31, 0.24);
  padding: clamp(24px, 4vw, 38px);
}

.callback-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(201, 154, 75, 0.2);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.78);
  color: #1f1f1f;
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
  transition:
    background 220ms ease,
    transform 220ms ease;
}

.callback-modal__close:hover {
  background: #fff;
  transform: rotate(6deg);
}

.callback-modal__head {
  display: grid;
  gap: 12px;
  padding-right: 42px;
}

.callback-modal__head p {
  color: var(--landing-gold-dark);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin: 0;
  text-transform: uppercase;
}

.callback-modal__head h3 {
  color: #1f1f1f;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.12;
  margin: 0;
}

.callback-modal__head span {
  color: #666;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.65;
}

.callback-modal__form {
  display: grid;
  gap: 14px;
  margin-top: 26px;
}

.callback-modal__form label {
  display: grid;
  gap: 8px;
}

.callback-modal__form label span {
  color: #666;
  font-size: 13px;
  font-weight: 500;
}

.callback-modal__form input,
.callback-modal__form textarea {
  width: 100%;
  border: 1px solid rgba(31, 31, 31, 0.1);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.86);
  color: #1f1f1f;
  font: inherit;
  font-size: 15px;
  font-weight: 400;
  outline: none;
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.callback-modal__form input {
  min-height: 48px;
  padding: 0 15px;
}

.callback-modal__form textarea {
  min-height: 108px;
  padding: 13px 15px;
  resize: vertical;
}

.callback-modal__form input:focus,
.callback-modal__form textarea:focus {
  border-color: rgba(201, 154, 75, 0.48);
  box-shadow: 0 0 0 4px rgba(201, 154, 75, 0.12);
}

.callback-modal__submit {
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
  margin-top: 4px;
  padding: 0 28px;
  transition:
    box-shadow 220ms ease,
    transform 220ms ease;
}

.callback-modal__submit:hover {
  box-shadow: 0 22px 46px rgba(201, 154, 75, 0.34);
  transform: translateY(-1px);
}

.callback-modal__message {
  color: #666;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.55;
  margin: 0;
}

.callback-modal-enter-active,
.callback-modal-leave-active {
  transition: opacity 220ms ease;
}

.callback-modal-enter-active .callback-modal__window,
.callback-modal-leave-active .callback-modal__window {
  transition:
    opacity 220ms ease,
    transform 260ms ease;
}

.callback-modal-enter-from,
.callback-modal-leave-to {
  opacity: 0;
}

.callback-modal-enter-from .callback-modal__window,
.callback-modal-leave-to .callback-modal__window {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}

@media (max-width: 560px) {
  .callback-modal {
    align-items: end;
    padding: 12px;
  }

  .callback-modal__window {
    max-height: calc(100vh - 24px);
    border-radius: 26px;
    padding: 22px;
  }

  .callback-modal__head {
    padding-right: 34px;
  }

  .callback-modal__submit {
    width: 100%;
  }
}
</style>
