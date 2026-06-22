import { afterEach, describe, expect, it, vi } from 'vitest'
import { handler } from '../netlify/functions/send-telegram-lead.mjs'

const request = {
  httpMethod: 'POST',
  body: JSON.stringify({
    area: '18',
    comment: 'Нужна консультация',
    lights: '6',
    name: 'Олег',
    phone: '+7 999 000-00-00',
    price: 'от 150 ₽/м²',
    selectedType: 'Матовый потолок',
    source: 'Калькулятор / Виды потолков',
    submittedAt: '2026-06-22T08:30:00.000Z',
  }),
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('send telegram lead function', () => {
  it('отклоняет методы кроме POST', async () => {
    const response = await handler({ httpMethod: 'GET' })

    expect(response.statusCode).toBe(405)
  })

  it('требует серверные переменные окружения', async () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', '')
    vi.stubEnv('TELEGRAM_CHAT_ID', '')
    vi.stubEnv('VITE_TELEGRAM_API_KEY', '')
    vi.stubEnv('VITE_TELEGRAM_CHAT_ID', '')
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const response = await handler(request)

    expect(response.statusCode).toBe(500)
  })

  it('отправляет все поля и дату в Telegram Bot API', async () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token')
    vi.stubEnv('TELEGRAM_CHAT_ID', '123456')
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 })
    vi.stubGlobal('fetch', fetchMock)

    const response = await handler(request)

    expect(response.statusCode).toBe(200)

    const [url, options] = fetchMock.mock.calls[0]
    const payload = options.body as URLSearchParams
    const message = payload.get('text')

    expect(url).toBe('https://api.telegram.org/bottest-token/sendMessage')
    expect(payload.get('chat_id')).toBe('123456')
    expect(message).toContain('👤 Имя: Олег')
    expect(message).toContain('📞 Телефон: +7 999 000-00-00')
    expect(message).toContain('📐 Площадь: 18 м²')
    expect(message).toContain('💡 Светильники: 6')
    expect(message).toContain('🏠 Тип потолка: Матовый потолок')
    expect(message).toContain('📍 Источник: Калькулятор / Виды потолков')
    expect(message).toContain('🕒 Дата и время: 22 июн. 2026 г., 15:30:00')
  })

  it('возвращает ошибку при отказе Telegram', async () => {
    vi.stubEnv('TELEGRAM_BOT_TOKEN', 'test-token')
    vi.stubEnv('TELEGRAM_CHAT_ID', '123456')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401 }))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const response = await handler(request)

    expect(response.statusCode).toBe(502)
  })
})
