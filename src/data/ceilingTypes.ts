export interface CeilingType {
  description: string
  id: string
  price: string
  title: string
}

export const ceilingTypes: CeilingType[] = [
  {
    description: 'Ровная универсальная поверхность без бликов для спальни, детской и гостиной.',
    id: 'matte',
    price: 'от 390 ₽/м²',
    title: 'Матовые',
  },
  {
    description: 'Добавляют визуальную глубину и мягкое отражение света в современных интерьерах.',
    id: 'glossy',
    price: 'от 490 ₽/м²',
    title: 'Глянцевые',
  },
  {
    description: 'Спокойный шелковистый блеск и аккуратная фактура для премиального вида.',
    id: 'satin',
    price: 'от 450 ₽/м²',
    title: 'Сатиновые',
  },
  {
    description: 'Практичное решение с выразительной подсветкой по периметру или зонам.',
    id: 'light',
    price: 'от 750 ₽/м²',
    title: 'С подсветкой',
  },
]
