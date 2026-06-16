export interface NavigationItem {
  href: string
  label: string
}

export const navigationItems: NavigationItem[] = [
  {
    href: '#advantages',
    label: 'Преимущества',
  },
  {
    href: '#types',
    label: 'Виды потолков',
  },
  {
    href: '#prices',
    label: 'Цены',
  },
  {
    href: '#portfolio',
    label: 'Портфолио',
  },
  {
    href: '#reviews',
    label: 'Отзывы',
  },
  {
    href: '#steps',
    label: 'Этапы',
  },
  {
    href: '#contacts',
    label: 'Контакты',
  },
]

export const contactInfo = {
  phone: '+7 (383) 123-45-67',
  phoneHref: 'tel:+73831234567',
  schedule: 'Ежедневно с 9:00 до 21:00',
}
