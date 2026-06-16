export interface CeilingType {
  bestFor: string[]
  description: string
  fallbackGradient: string
  features: string[]
  id: string
  image: string
  imageAlt: string
  price: string
  title: string
}

const materialImages = import.meta.glob('../assets/images/ceiling-types/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

function getMaterialImage(fileName: string) {
  return materialImages[`../assets/images/ceiling-types/${fileName}`] ?? ''
}

// Каталог основных материалов. Карточки и модалка берут данные отсюда.
export const ceilingTypes: CeilingType[] = [
  {
    bestFor: [
      'Небольшие комнаты',
      'Кухни',
      'Современные гостиные',
    ],
    description: 'Отражающая поверхность визуально увеличивает пространство помещения.',
    fallbackGradient: 'linear-gradient(145deg, #ece6dc, #ffffff 45%, #b8a895)',
    features: [
      'Визуально увеличивают пространство',
      'Добавляют больше света в помещение',
      'Хорошо смотрятся в современных интерьерах',
    ],
    id: 'glossy',
    image: getMaterialImage('1-glossy-stretch-ceiling-novosibirsk.webp'),
    imageAlt: 'Глянцевый натяжной потолок в Новосибирске',
    price: 'от 150 ₽/м²',
    title: 'Глянцевые потолки',
  },
  {
    bestFor: [
      'Спальни',
      'Детские комнаты',
      'Классические интерьеры',
    ],
    description: 'Классический спокойный вариант без бликов. Подходит для большинства интерьеров.',
    fallbackGradient: 'linear-gradient(145deg, #d9d1c5, #f8f4ee 52%, #cfc3b2)',
    features: [
      'Не дают бликов',
      'Выглядят спокойно и аккуратно',
      'Подходят почти под любой интерьер',
    ],
    id: 'matte',
    image: getMaterialImage('2-matte-stretch-ceiling-novosibirsk.webp'),
    imageAlt: 'Матовый натяжной потолок в Новосибирске',
    price: 'от 150 ₽/м²',
    title: 'Матовые потолки',
  },
  {
    bestFor: [
      'Гостиные',
      'Спальни',
      'Комнаты с люстрой или треками',
    ],
    description: 'Мягкий шелковистый блеск между матовой и глянцевой поверхностью.',
    fallbackGradient: 'linear-gradient(145deg, #d7cbbd, #faf1e5 50%, #c99a4b)',
    features: [
      'Мягкий шелковистый отблеск',
      'Смотрятся дороже обычного матового полотна',
      'Хорошо работают с вечерним освещением',
    ],
    id: 'satin',
    image: getMaterialImage('3-satin-stretch-ceiling-novosibirsk.webp'),
    imageAlt: 'Сатиновый натяжной потолок в Новосибирске',
    price: 'от 150 ₽/м²',
    title: 'Сатиновые потолки',
  },
  {
    bestFor: [
      'Дома и коттеджи',
      'Большие комнаты',
      'Премиальные интерьеры',
    ],
    description: 'Премиальный экологичный материал с высокой прочностью и благородной фактурой.',
    fallbackGradient: 'linear-gradient(145deg, #beb09e, #efe6d8 48%, #8f806d)',
    features: [
      'Премиальный внешний вид',
      'Прочная фактура',
      'Хороший вариант для просторных помещений',
    ],
    id: 'fabric',
    image: getMaterialImage('4-fabric-stretch-ceiling-novosibirsk.webp'),
    imageAlt: 'Тканевый натяжной потолок в Новосибирске',
    price: 'от 1000 ₽/м²',
    title: 'Тканевые потолки',
  },
]
