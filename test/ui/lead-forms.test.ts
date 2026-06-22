import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CallbackModal from '~/components/modals/CallbackModal.vue'
import CeilingTypeModal from '~/components/sections/CeilingTypeModal.vue'
import { ceilingTypes } from '~/data/ceilingTypes'
import { sendTelegramLead } from '~/services/telegramLead'

vi.mock('~/services/telegramLead', () => ({
  sendTelegramLead: vi.fn(),
}))

const mountOptions = {
  global: {
    stubs: {
      ModalCloseButton: true,
      Teleport: true,
    },
  },
}

afterEach(() => {
  vi.mocked(sendTelegramLead).mockReset()
})

describe('callback lead form', () => {
  it('блокирует повторную отправку и очищает поля после успеха', async () => {
    let resolveRequest: (() => void) | undefined
    vi.mocked(sendTelegramLead).mockReturnValue(new Promise<void>((resolve) => {
      resolveRequest = resolve
    }))

    const wrapper = mount(CallbackModal, {
      ...mountOptions,
      props: {
        selectedOption: 'Теневое примыкание',
        source: 'Дополнительно к потолкам',
      },
    })
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('Анна')
    await inputs[1].setValue('+7 999 111-22-33')
    await wrapper.get('textarea').setValue('Перезвонить вечером')
    await wrapper.get('form').trigger('submit')
    await wrapper.get('form').trigger('submit')

    expect(sendTelegramLead).toHaveBeenCalledTimes(1)
    expect(sendTelegramLead).toHaveBeenCalledWith({
      comment: 'Перезвонить вечером',
      name: 'Анна',
      phone: '+7 999 111-22-33',
      selectedOption: 'Теневое примыкание',
      source: 'Дополнительно к потолкам',
    })
    expect(wrapper.get('button.callback-modal__submit').attributes('disabled')).toBeDefined()

    resolveRequest?.()
    await flushPromises()

    expect(inputs[0].element.value).toBe('')
    expect(inputs[1].element.value).toBe('')
    expect(wrapper.get('textarea').element.value).toBe('')
    expect(wrapper.text()).toContain('Спасибо! Заявка отправлена')
  })

  it('сохраняет данные и показывает ошибку при неудаче', async () => {
    vi.mocked(sendTelegramLead).mockRejectedValue(new Error('Request failed'))
    const wrapper = mount(CallbackModal, mountOptions)
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('Анна')
    await inputs[1].setValue('+7 999 111-22-33')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(inputs[0].element.value).toBe('Анна')
    expect(inputs[1].element.value).toBe('+7 999 111-22-33')
    expect(wrapper.text()).toContain('Не удалось отправить заявку')
  })
})

describe('ceiling calculator lead form', () => {
  it('отправляет расчет и очищает все поля после успеха', async () => {
    vi.mocked(sendTelegramLead).mockResolvedValue()
    const type = ceilingTypes[0]
    const wrapper = mount(CeilingTypeModal, {
      ...mountOptions,
      props: { type },
    })
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('18')
    await inputs[1].setValue('6')
    await inputs[2].setValue('3')
    await inputs[3].setValue('Олег')
    await inputs[4].setValue('+7 999 000-00-00')
    await wrapper.get('textarea').setValue('Нужен замер')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(sendTelegramLead).toHaveBeenCalledWith({
      area: 18,
      comment: 'Нужен замер',
      curtainMeters: 3,
      lights: 6,
      name: 'Олег',
      phone: '+7 999 000-00-00',
      price: type.price,
      selectedType: type.title,
      source: 'Калькулятор / Виды потолков',
    })
    expect(inputs.every(input => input.element.value === '')).toBe(true)
    expect(wrapper.get('textarea').element.value).toBe('')
    expect(wrapper.text()).toContain('Спасибо! Заявка отправлена')
  })
})
