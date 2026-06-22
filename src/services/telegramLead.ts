export interface TelegramLead {
  area?: number | string
  comment?: string
  curtainMeters?: number | string
  lights?: number | string
  name: string
  phone: string
  price?: string
  selectedOption?: string
  selectedType?: string
  source: string
}

export interface TelegramLeadRequest extends TelegramLead {
  submittedAt: string
}

const LEAD_ENDPOINT = '/api/telegram-lead'

export async function sendTelegramLead(lead: TelegramLead) {
  const name = lead.name.trim()
  const phone = lead.phone.trim()

  if (!name || !phone)
    throw new Error('Укажите имя и номер телефона.')

  const payload: TelegramLeadRequest = {
    ...lead,
    name,
    phone,
    submittedAt: new Date().toISOString(),
  }

  let response: Response

  try {
    response = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  }
  catch {
    throw new Error('Не удалось связаться с сервисом отправки заявок.')
  }

  if (!response.ok)
    throw new Error('Сервис не смог отправить заявку в Telegram.')
}
