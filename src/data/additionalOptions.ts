export interface AdditionalOption {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  imageAlt: string
  gradient: string
}

const optionImages = import.meta.glob('../assets/images/additional-options/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

function getOptionImage(fileName: string) {
  return optionImages[`../assets/images/additional-options/${fileName}`] ?? ''
}

export const additionalOptions: AdditionalOption[] = [
  {
    id: 'lighting',
    title: 'Освещение',
    description: 'Подберем освещение для натяжного потолка под комнату: люстры, точечные светильники, световые линии и магнитные треки.',
    tags: [
      'Точечные светильники',
      'Люстры',
      'Световые линии',
      'Магнитные треки',
    ],
    image: getOptionImage('lighting-tracks-novosibirsk.webp'),
    imageAlt: 'Освещение для натяжного потолка в Новосибирске',
    gradient: 'linear-gradient(135deg, #efe2cf 0%, #fffaf3 48%, #c99a4b 100%)',
  },
  {
    id: 'wall-connection',
    title: 'Примыкание к стене',
    description: 'Подскажем, какой вариант лучше подойдет для натяжных потолков Новосибирск: классическая вставка, галтель или аккуратный теневой профиль.',
    tags: [
      'Вставка',
      'Теневой профиль',
      'Без лишних элементов',
    ],
    image: getOptionImage('wall-shadow-profile-novosibirsk.webp'),
    imageAlt: 'Теневой профиль и примыкание натяжного потолка к стене',
    gradient: 'linear-gradient(135deg, #ded3c5 0%, #f8f1e7 52%, #9d8c78 100%)',
  },
  {
    id: 'curtains',
    title: 'Гардины и карнизы',
    description: 'Можно заранее подготовить гардины для натяжного потолка, нишу под шторы, скрытую гардину или потолочный карниз под ключ.',
    tags: [
      'Скрытая гардина',
      'Ниша под шторы',
      'Потолочный карниз',
      'Карниз под ключ',
    ],
    image: getOptionImage('curtains-cornices-novosibirsk.webp'),
    imageAlt: 'Скрытая гардина и потолочный карниз для натяжного потолка',
    gradient: 'linear-gradient(135deg, #d8cbbb 0%, #fff7ec 50%, #c6a46d 100%)',
  },
]
