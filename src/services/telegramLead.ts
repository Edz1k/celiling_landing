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

const optionalFields: Array<[
  keyof TelegramLead,
  string,
  string,
  string?,
]> = [
  ['comment', '💬', 'Комментарий'],
  ['area', '📐', 'Площадь', ' м²'],
  ['lights', '💡', 'Светильники'],
  ['selectedType', '🏠', 'Тип потолка'],
  ['selectedOption', '🔧', 'Выбранное решение'],
  ['curtainMeters', '📏', 'Гардина', ' м'],
  ['price', '💰', 'Расчет'],
]

function buildMessage(lead: TelegramLeadRequest) {
  const formattedTimestamp = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Novosibirsk',
  }).format(new Date(lead.submittedAt))
  const lines = [
    '📥 Новая заявка с сайта',
    '',
    `👤 Имя: ${lead.name}`,
    `📞 Телефон: ${lead.phone}`,
  ]

  for (const [field, icon, label, suffix = ''] of optionalFields) {
    const value = lead[field]

    if (value !== undefined && value !== '')
      lines.push(`${icon} ${label}: ${value}${suffix}`)
  }

  lines.push(`📍 Источник: ${lead.source}`)
  lines.push(`🕒 Дата и время: ${formattedTimestamp}`)

  return lines.join('\n')
}

export async function sendTelegramLead(lead: TelegramLead) {
  const token = import.meta.env.VITE_TELEGRAM_API_KEY?.trim()
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID?.trim()
  const name = lead.name.trim()
  const phone = lead.phone.trim()

  if (!name || !phone)
    throw new Error('Укажите имя и номер телефона.')

  if (!token || !chatId)
    throw new Error('Сервис отправки заявок не настроен.')

  const payload: TelegramLeadRequest = {
    ...lead,
    name,
    phone,
    submittedAt: new Date().toISOString(),
  }

  let response: Response

  try {
    response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      body: new URLSearchParams({
        chat_id: chatId,
        text: buildMessage(payload),
      }),
    })
  }
  catch {
    throw new Error('Не удалось связаться с Telegram.')
  }

  if (!response.ok)
    throw new Error('Сервис не смог отправить заявку в Telegram.')
}
