export interface PortfolioItem {
  area: string
  id: string
  location: string
  title: string
  type: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    area: '18 м²',
    id: 'living-room',
    location: 'Заельцовский район',
    title: 'Гостиная с теневым профилем',
    type: 'Матовый потолок',
  },
  {
    area: '11 м²',
    id: 'kitchen',
    location: 'Октябрьский район',
    title: 'Кухня с трековым светом',
    type: 'Сатиновый потолок',
  },
  {
    area: '24 м²',
    id: 'studio',
    location: 'Центральный район',
    title: 'Студия с контурной подсветкой',
    type: 'Парящий потолок',
  },
]
