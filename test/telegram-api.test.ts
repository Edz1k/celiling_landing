import { afterEach, describe, expect, it, vi } from 'vitest'
import { useTelegramApi } from '../src/composables/useTelegramApi'

const lead = {
  source: 'Калькулятор',
  selectedType: 'Матовый потолок',
  area: '18',
  lights: '6',
  price: 'от 150 ₽/м²',
  name: 'Олег',
  phone: '+7 999 000-00-00',
  comment: 'Нужна консультация',
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('telegram lead service', () => {
  it('отправляет все поля заявки в нужный чат', async () => {
    vi.stubEnv('VITE_TELEGRAM_API_KEY', 'test-token')
    vi.stubEnv('VITE_TELEGRAM_CHAT_ID', '6991300314')

    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)

    await useTelegramApi().sendTelegramLead(lead)

    const [url, options] = fetchMock.mock.calls[0]
    const payload = JSON.parse(options.body)

    expect(url).toBe('https://api.telegram.org/bottest-token/sendMessage')
    expect(payload.chat_id).toBe('6991300314')
    expect(payload.text).toContain('📥 Новая заявка с сайта')
    expect(payload.text).toContain('📐 Площадь: 18 м²')
    expect(payload.text).toContain('💡 Светильники: 6')
    expect(payload.text).toContain('🏠 Тип потолка: Матовый потолок')
    expect(payload.text).toContain('💰 Расчет: от 150 ₽/м²')
    expect(payload.text).toContain('📍 Источник: Калькулятор')
  })

  it('не отправляет форму без обязательных полей', async () => {
    vi.stubEnv('VITE_TELEGRAM_API_KEY', 'test-token')
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    await expect(useTelegramApi().sendTelegramLead({
      source: 'Главный экран',
      name: '',
      phone: '',
    })).rejects.toThrow('Укажите имя и номер телефона.')

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('возвращает понятную ошибку при проблеме сети', async () => {
    vi.stubEnv('VITE_TELEGRAM_API_KEY', 'test-token')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Failed to fetch')))

    await expect(useTelegramApi().sendTelegramLead(lead)).rejects.toThrow(
      'Не удалось отправить заявку. Попробуйте написать нам в WhatsApp или Telegram.',
    )
  })
})
