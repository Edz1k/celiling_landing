import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { sendTelegramLead } from '~/services/telegramLead'

const lead = {
  comment: 'Нужна консультация',
  name: ' Олег ',
  phone: ' +7 999 000-00-00 ',
  selectedType: 'Матовый потолок',
  source: 'Калькулятор',
}

describe('telegram lead service', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_TELEGRAM_API_KEY', 'test-token')
    vi.stubEnv('VITE_TELEGRAM_CHAT_ID', '123456')
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-22T08:30:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('отправляет нормализованную заявку напрямую в Telegram Bot API', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)

    await sendTelegramLead(lead)

    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, options] = fetchMock.mock.calls[0]
    const payload = options.body as URLSearchParams
    const message = payload.get('text')

    expect(url).toBe('https://api.telegram.org/bottest-token/sendMessage')
    expect(options.method).toBe('POST')
    expect(payload.get('chat_id')).toBe('123456')
    expect(message).toContain('👤 Имя: Олег')
    expect(message).toContain('📞 Телефон: +7 999 000-00-00')
    expect(message).toContain('💬 Комментарий: Нужна консультация')
    expect(message).toContain('🏠 Тип потолка: Матовый потолок')
    expect(message).toContain('📍 Источник: Калькулятор')
    expect(message).toContain('🕒 Дата и время: 22 июн. 2026 г., 15:30:00')
  })

  it('не отправляет пустые обязательные поля', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    await expect(sendTelegramLead({
      name: ' ',
      phone: '',
      source: 'Главный экран',
    })).rejects.toThrow('Укажите имя и номер телефона.')

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('требует переменные окружения Telegram', async () => {
    vi.stubEnv('VITE_TELEGRAM_API_KEY', '')

    await expect(sendTelegramLead(lead)).rejects.toThrow('Сервис отправки заявок не настроен.')
  })

  it('сообщает об ошибке Telegram API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    await expect(sendTelegramLead(lead)).rejects.toThrow('Сервис не смог отправить заявку в Telegram.')
  })

  it('сообщает о сетевой ошибке', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Failed to fetch')))

    await expect(sendTelegramLead(lead)).rejects.toThrow('Не удалось связаться с Telegram.')
  })
})
