export interface PortfolioCharacteristic {
  label: string
  value: string
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  characteristics: PortfolioCharacteristic[]
}

const portfolioImages = import.meta.glob('../assets/images/portfolio/*.jpg', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

function getPortfolioImage(fileName: string) {
  return portfolioImages[`../assets/images/portfolio/${fileName}`] ?? ''
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'floating-geometry',
    title: 'Парящий потолок сложной геометрии',
    description: 'Матовый натяжной потолок с парящей подсветкой по периметру и декоративными световыми линиями. Такое решение визуально делает помещение выше и подчеркивает нестандартную геометрию интерьера.',
    image: getPortfolioImage('portfolio-01-paryashchiy-potolok.jpg'),
    imageAlt: 'Парящий натяжной потолок сложной геометрии с подсветкой',
    characteristics: [
      { label: 'Тип потолка', value: 'матовый, парящий' },
      { label: 'Освещение', value: 'LED-подсветка по периметру, декоративные линии' },
      { label: 'Примыкание', value: 'аккуратное примыкание к стенам' },
      { label: 'Особенности', value: 'сложная геометрия, визуальный эффект легкости' },
    ],
  },
  {
    id: 'perimeter-lighting',
    title: 'Парящий потолок с контурной подсветкой',
    description: 'Матовое полотно с теплой светодиодной подсветкой по периметру. В проекте также предусмотрены точки под встроенное освещение, что делает потолок практичным и современным.',
    image: getPortfolioImage('portfolio-02-konturnaya-podsvetka.jpg'),
    imageAlt: 'Парящий натяжной потолок с контурной подсветкой',
    characteristics: [
      { label: 'Тип потолка', value: 'матовый, парящий' },
      { label: 'Освещение', value: 'контурная подсветка, точки под светильники' },
      { label: 'Примыкание', value: 'подсветка вдоль стен' },
      { label: 'Особенности', value: 'теплый свет, современная геометрия' },
    ],
  },
  {
    id: 'shadow-joint',
    title: 'Потолок с теневым примыканием',
    description: 'Современный натяжной потолок с аккуратным теневым примыканием к стенам. Без лишних декоративных вставок - только ровные линии, чистая геометрия и мягкая подсветка.',
    image: getPortfolioImage('portfolio-03-tenevoy-potolok.jpg'),
    imageAlt: 'Натяжной потолок с теневым примыканием',
    characteristics: [
      { label: 'Тип потолка', value: 'матовый, теневой' },
      { label: 'Освещение', value: 'точечные светильники, скрытая подсветка' },
      { label: 'Примыкание', value: 'теневой профиль' },
      { label: 'Особенности', value: 'минимализм, чистые линии' },
    ],
  },
  {
    id: 'hidden-light',
    title: 'Матовый потолок со скрытой подсветкой',
    description: 'Лаконичный потолок с мягкой скрытой подсветкой вдоль стены и встроенными квадратными светильниками. Хороший вариант для современных интерьеров в спокойном стиле.',
    image: getPortfolioImage('portfolio-04-skrytaya-podsvetka.jpg'),
    imageAlt: 'Матовый потолок со скрытой подсветкой',
    characteristics: [
      { label: 'Тип потолка', value: 'матовый' },
      { label: 'Освещение', value: 'скрытая подсветка, встроенные светильники' },
      { label: 'Примыкание', value: 'аккуратное примыкание к стенам' },
      { label: 'Особенности', value: 'спокойный дизайн, равномерное освещение' },
    ],
  },
  {
    id: 'modern-shadow-ceiling',
    title: 'Теневой потолок в современном интерьере',
    description: 'Матовое полотно с теневым профилем и мягкой контурной подсветкой. Такое решение делает стык потолка и стен аккуратным, а интерьер визуально более дорогим.',
    image: getPortfolioImage('portfolio-05-tenevoe-primykanie.jpg'),
    imageAlt: 'Теневой потолок в современном интерьере',
    characteristics: [
      { label: 'Тип потолка', value: 'матовый, теневой' },
      { label: 'Освещение', value: 'контурная подсветка' },
      { label: 'Примыкание', value: 'теневой профиль' },
      { label: 'Особенности', value: 'современный внешний вид, эффект чистого периметра' },
    ],
  },
  {
    id: 'linear-lighting',
    title: 'Потолок с линейным освещением',
    description: 'Современный потолок с интегрированными световыми линиями. Такой вариант хорошо подходит для помещений, где освещение становится частью дизайна.',
    image: getPortfolioImage('portfolio-06-lineynoe-osveshchenie.jpg'),
    imageAlt: 'Потолок с линейным освещением',
    characteristics: [
      { label: 'Тип потолка', value: 'матовый' },
      { label: 'Освещение', value: 'встроенные световые линии' },
      { label: 'Примыкание', value: 'аккуратное примыкание к стенам' },
      { label: 'Особенности', value: 'дизайнерский свет, современный стиль' },
    ],
  },
  {
    id: 'decorative-cornice',
    title: 'Парящий потолок с декоративным карнизом',
    description: 'Матовый потолок со скрытой подсветкой и декоративным оформлением по периметру. Решение сочетает классические элементы интерьера и современную подсветку.',
    image: getPortfolioImage('portfolio-07-dekorativnyy-karniz.jpg'),
    imageAlt: 'Парящий потолок с декоративным карнизом',
    characteristics: [
      { label: 'Тип потолка', value: 'матовый, парящий' },
      { label: 'Освещение', value: 'скрытая LED-подсветка, люстры' },
      { label: 'Примыкание', value: 'декоративный карниз' },
      { label: 'Особенности', value: 'сочетание классики и современного света' },
    ],
  },
]
