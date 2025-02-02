export type Ticket = {
  id: string
  name: string
  price: number | string
  quantity: number
  isVIP: boolean
  description: string
}

export type Tickets = Ticket[]

export type Cart = Pick<Ticket, 'id' | 'quantity'>
export type Carts = Cart[]

export type StoreState = {
  tickets: Tickets
  cart: Carts
}
