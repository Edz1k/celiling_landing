export interface AdditionalOption {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  imageAlt: string
  gradient: string
  modalDescription: string
  features: string[]
}

const optionImages = import.meta.glob('../assets/images/additional-options/*.{jpg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

function getOptionImage(fileNames: string[]) {
  for (const fileName of fileNames) {
    const image = optionImages[`../assets/images/additional-options/${fileName}`]

    if (image)
      return image
  }

  return ''
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
      'Слот система',
    ],
    image: getOptionImage([
      'service-01-lighting.jpg',
      'service-lighting.jpg',
    ]),
    imageAlt: 'Освещение для натяжного потолка в Новосибирске',
    gradient: 'linear-gradient(135deg, #efe2cf 0%, #fffaf3 48%, #c99a4b 100%)',
    modalDescription: 'Освещение лучше продумывать заранее, еще до монтажа потолка. Мы поможем выбрать удобный вариант под комнату и интерьер: от классической люстры до современных световых линий и трековых систем.',
    features: [
      'точечные светильники для равномерного света',
      'люстры для основного освещения',
      'световые линии для современного дизайна',
      'магнитные треки для гибкой настройки света',
    ],
  },
  {
    id: 'wall-connection',
    title: 'Примыкание к стене',
    description: 'Подскажем, какой вариант лучше подойдет: классическая вставка или аккуратный теневой профиль.',
    tags: [
      'Вставка',
      'Теневой профиль',
      'Безщелевое примыкание',
      'Парящий потолок',

    ],
    image: getOptionImage([
      'service-02-wall-junction.jpg',
      'tenevoe-primykanie-k-stene.jpg',
    ]),
    imageAlt: 'Теневой профиль и примыкание натяжного потолка к стене',
    gradient: 'linear-gradient(135deg, #ded3c5 0%, #f8f1e7 52%, #9d8c78 100%)',
    modalDescription: 'От примыкания зависит, насколько аккуратно потолок будет смотреться по периметру. Можно выбрать классическую вставку, декоративную галтель или современный теневой профиль.',
    features: [
      'вставка - простой и практичный вариант',
      'теневой профиль - современный эффект ровного зазора',
      'аккуратный периметр без лишних деталей',
    ],
  },
  {
    id: 'curtains',
    title: 'Гардины и карнизы',
    description: 'Можно заранее подготовить нишу под шторы, скрытую гардину или потолочный карниз под ключ.',
    tags: [
      'Скрытая гардина',
      'Ниша под шторы',
      'Потолочный карниз',
      'Карниз с подсветкой',
    ],
    image: getOptionImage([
      'service-03-curtains-cornices.jpg',
      'skrytaya-gardina-i-karniz.jpg',
    ]),
    imageAlt: 'Скрытая гардина и потолочный карниз для натяжного потолка',
    gradient: 'linear-gradient(135deg, #d8cbbb 0%, #fff7ec 50%, #c6a46d 100%)',
    modalDescription: 'Гардины и карнизы лучше закладывать заранее, чтобы потолок выглядел цельно. Можно сделать нишу под шторы, скрытую гардину или аккуратный потолочный карниз.',
    features: [
      'скрытая гардина для чистого современного вида',
      'ниша под шторы',
      'потолочный карниз',
      'подготовка решения до монтажа потолка',
    ],
  },
]
