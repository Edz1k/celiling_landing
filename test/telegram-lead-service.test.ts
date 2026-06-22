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
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-22T08:30:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('отправляет нормализованную заявку в serverless endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)

    await sendTelegramLead(lead)

    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, options] = fetchMock.mock.calls[0]
    const payload = JSON.parse(options.body)

    expect(url).toBe('/api/telegram-lead')
    expect(options.method).toBe('POST')
    expect(options.headers).toEqual({ 'Content-Type': 'application/json' })
    expect(payload).toMatchObject({
      comment: 'Нужна консультация',
      name: 'Олег',
      phone: '+7 999 000-00-00',
      selectedType: 'Матовый потолок',
      source: 'Калькулятор',
      submittedAt: '2026-06-22T08:30:00.000Z',
    })
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

  it('сообщает об ошибке endpoint', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    await expect(sendTelegramLead(lead)).rejects.toThrow('Сервис не смог отправить заявку в Telegram.')
  })

  it('сообщает о сетевой ошибке', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Failed to fetch')))

    await expect(sendTelegramLead(lead)).rejects.toThrow('Не удалось связаться с сервисом отправки заявок.')
  })
})
