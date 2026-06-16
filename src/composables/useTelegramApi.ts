export function useTelegramApi() {
  const sendBotMessage = async (message: string) => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID

    const url = `https://api.telegram.org/bot${token}/sendMessage`

    const payload = {
      chat_id: chatId,
      text: message,
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Failed to send message to Telegram: ${response.statusText}`)
      }
    }
    catch (error) {
      throw new Error(`Error sending message to Telegram: ${error}`)
    }
  }
  return { sendBotMessage }
}
