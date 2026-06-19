export interface PhoneNumber {
  href: string
  label: string
}

// Единый список реальных номеров для шапки, контактов и быстрых CTA-кнопок.
export const phoneNumbers: PhoneNumber[] = [
  {
    href: 'tel:+79231555572',
    label: '+7 923 155 55 72',
  },
  {
    href: 'tel:+79931897170',
    label: '+7 993 189 71 70',
  },
]

export const contactSchedule = 'Ежедневно с 9:00 до 21:00'

export const whatsappLink = 'https://wa.me/79931897170'

export const maxLink = 'https://max.ru/u/f9LHodD0cOJ4vG-tUatKytQvCD4AsWeChQJQaMwCqOxEwpPkzN_ZQCdpq7Q'
