import { Ticket } from '../types'

const tickets: Ticket[] = [
  {
    id: '1',
    name: 'Concert Ticket',
    price: 99,
    quantity: 150,
    isVIP: false,
    description: 'Enjoy an amazing live concert with top artists.',
  },
  {
    id: '2',
    name: 'VIP Concert Ticket',
    price: 199,
    quantity: 50,
    isVIP: true,
    description:
      'VIP access to the concert with front-row seating and exclusive perks.',
  },
  {
    id: '3',
    name: 'Theater Show Ticket',
    price: 59,
    quantity: 80,
    isVIP: false,
    description:
      'Watch an award-winning theater show with incredible performances.',
  },
  {
    id: '4',
    name: 'Sports Game Ticket',
    price: 120,
    quantity: 200,
    isVIP: false,
    description: 'Cheer on your favorite team at the live sports game.',
  },
  {
    id: '5',
    name: 'VIP Sports Game Ticket',
    price: 250,
    quantity: 30,
    isVIP: true,
    description:
      'VIP experience with premium seating and access to exclusive areas.',
  },
]

export default tickets
