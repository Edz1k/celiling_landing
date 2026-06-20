<script setup lang="ts">
const props = withDefaults(defineProps<{
  selectedOption?: string
  source?: string
  submitText?: string
  subtitle?: string
  title?: string
}>(), {
  selectedOption: '',
  source: 'hero_callback',
  submitText: 'Жду звонка',
  subtitle: 'Уточним детали, ответим на вопросы и подскажем примерную стоимость',
  title: 'Оставьте заявку — мы вам позвоним',
})

const emit = defineEmits<{
  close: []
}>()

const formMessage = ref('')
const isSubmitting = ref(false)
const { sendTelegramLead } = useTelegramApi()

const callbackForm = reactive({
  comment: '',
  name: '',
  phone: '',
})

function closeModal() {
  emit('close')
}

async function submitCallback() {
  formMessage.value = ''

  if (!callbackForm.name.trim() || !callbackForm.phone.trim()) {
    formMessage.value = 'Укажите имя и номер телефона.'
    return
  }

  isSubmitting.value = true

  try {
    await sendTelegramLead({
      source: props.source,
      selectedOption: props.selectedOption,
      name: callbackForm.name,
      phone: callbackForm.phone,
      comment: callbackForm.comment,
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
        :aria-label="title"
        @click.self="closeModal"
      >
        <ModalCloseButton @close="closeModal" />

        <div class="callback-modal__window">
          <div class="callback-modal__head">
            <p>Обратная связь</p>
            <h3>{{ title }}</h3>
            <span>{{ subtitle }}</span>
          </div>

          <form class="callback-modal__form" @submit.prevent="submitCallback">
            <!-- Контакты клиента для будущего подключения отправки заявки -->
            <label>
              <span>Ваше имя</span>
              <input v-model="callbackForm.name" type="text" autocomplete="name" placeholder="Ваше имя" required>
            </label>

            <label>
              <span>Номер телефона</span>
              <input v-model="callbackForm.phone" type="tel" autocomplete="tel" placeholder="+7 ___ ___-__-__" required>
            </label>

            <label>
              <span>Комментарий</span>
              <textarea v-model="callbackForm.comment" rows="4" placeholder="Например: потолок в гостиной, 18 м²" />
            </label>

            <button class="callback-modal__submit" type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Отправляем...' : submitText }}
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
  z-index: 9998;
  display: grid;
  place-items: center;
  overflow-y: auto;
  background: rgba(31, 31, 31, 0.42);
  padding: 24px;
  pointer-events: auto;
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

.callback-modal__submit:disabled {
  cursor: wait;
  opacity: 0.7;
  transform: none;
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
