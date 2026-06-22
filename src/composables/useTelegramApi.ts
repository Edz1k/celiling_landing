export interface TelegramLead {
  area?: string
  comment?: string
  curtainMeters?: string
  lights?: string
  name: string
  phone: string
  price?: string
  selectedOption?: string
  selectedType?: string
  source: string
}

function addOptionalLine(lines: string[], icon: string, label: string, value?: string) {
  const normalizedValue = value?.trim()

  if (normalizedValue)
    lines.push(`${icon} ${label}: ${normalizedValue}`)
}

function buildLeadMessage(lead: TelegramLead) {
  const lines = [
    '📥 Новая заявка с сайта',
    '',
    `👤 Имя: ${lead.name.trim()}`,
    `📞 Телефон: ${lead.phone.trim()}`,
  ]

  addOptionalLine(lines, '💬', 'Комментарий', lead.comment)
  addOptionalLine(lines, '📐', 'Площадь', lead.area ? `${lead.area} м²` : '')
  addOptionalLine(lines, '💡', 'Светильники', lead.lights)
  addOptionalLine(lines, '🏠', 'Тип потолка', lead.selectedType)
  addOptionalLine(lines, '🔧', 'Выбранное решение', lead.selectedOption)
  addOptionalLine(lines, '📏', 'Гардина', lead.curtainMeters ? `${lead.curtainMeters} м` : '')
  addOptionalLine(lines, '💰', 'Расчет', lead.price)
  addOptionalLine(lines, '📍', 'Источник', lead.source)

  return lines.join('\n')
}

export function useTelegramApi() {
  const token = import.meta.env.VITE_TELEGRAM_API_KEY
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '6991300314'

  async function sendBotMessage(message: string) {
    if (!token)
      throw new Error('Telegram-бот не настроен.')

    try {
      const body = new URLSearchParams({
        chat_id: chatId,
        text: message,
      })

      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        body,
      })

      if (!response.ok)
        throw new Error('Telegram не принял заявку.')
    }
    catch {
      throw new Error('Не удалось отправить заявку. Попробуйте написать нам в WhatsApp или Telegram.')
    }
  }

  async function sendTelegramLead(lead: TelegramLead) {
    if (!lead.name.trim() || !lead.phone.trim())
      throw new Error('Укажите имя и номер телефона.')

    await sendBotMessage(buildLeadMessage(lead))
  }

  return { sendBotMessage, sendTelegramLead }
}
