export interface NavigationItem {
  href: string
  label: string
}

export const navigationItems: NavigationItem[] = [
  {
    href: '#hero',
    label: 'Главная',
  },
  {
    href: '#types',
    label: 'Виды потолков',
  },
  {
    href: '#about',
    label: 'О компании',
  },
  {
    href: '#portfolio',
    label: 'Портфолио',
  },
  {
    href: '#faq',
    label: 'FAQ',
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
