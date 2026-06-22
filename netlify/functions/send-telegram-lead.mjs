import process from 'node:process'

const optionalFields = [
  ['comment', '💬', 'Комментарий'],
  ['area', '📐', 'Площадь', ' м²'],
  ['lights', '💡', 'Светильники'],
  ['selectedType', '🏠', 'Тип потолка'],
  ['selectedOption', '🔧', 'Выбранное решение'],
  ['curtainMeters', '📏', 'Гардина', ' м'],
  ['price', '💰', 'Расчет'],
]

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  }
}

function normalize(value, maxLength = 500) {
  if (typeof value === 'number' && Number.isFinite(value))
    return String(value)

  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function buildMessage(lead) {
  const submittedAt = new Date(lead.submittedAt)
  const timestamp = Number.isNaN(submittedAt.getTime()) ? new Date() : submittedAt
  const formattedTimestamp = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Novosibirsk',
  }).format(timestamp)

  const lines = [
    '📥 Новая заявка с сайта',
    '',
    `👤 Имя: ${lead.name}`,
    `📞 Телефон: ${lead.phone}`,
  ]

  for (const [field, icon, label, suffix = ''] of optionalFields) {
    const value = lead[field]

    if (value)
      lines.push(`${icon} ${label}: ${value}${suffix}`)
  }

  lines.push(`📍 Источник: ${lead.source}`)
  lines.push(`🕒 Дата и время: ${formattedTimestamp}`)

  return lines.join('\n')
}

export async function handler(event) {
  if (event.httpMethod !== 'POST')
    return json(405, { error: 'Метод не поддерживается.' })

  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_API_KEY
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('Telegram lead endpoint is missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID.')
    return json(500, { error: 'Сервис отправки заявок не настроен.' })
  }

  let requestBody

  try {
    requestBody = JSON.parse(event.body || '{}')
  }
  catch {
    return json(400, { error: 'Некорректный формат заявки.' })
  }

  const lead = {
    name: normalize(requestBody.name, 100),
    phone: normalize(requestBody.phone, 50),
    source: normalize(requestBody.source, 150),
    submittedAt: normalize(requestBody.submittedAt, 50),
  }

  for (const [field] of optionalFields)
    lead[field] = normalize(requestBody[field])

  if (!lead.name || !lead.phone || !lead.source)
    return json(400, { error: 'Укажите имя, телефон и источник заявки.' })

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      body: new URLSearchParams({
        chat_id: chatId,
        text: buildMessage(lead),
      }),
    })

    if (!telegramResponse.ok) {
      console.error(`Telegram Bot API rejected a lead with status ${telegramResponse.status}.`)
      return json(502, { error: 'Telegram не принял заявку.' })
    }

    return json(200, { ok: true })
  }
  catch (error) {
    console.error('Telegram Bot API request failed.', error)
    return json(502, { error: 'Не удалось связаться с Telegram.' })
  }
}
