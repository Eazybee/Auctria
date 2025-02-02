import { mount } from '@vue/test-utils'
import HomePage from '../views/HomePage.vue'
import TicketItem from '../components/TicketItem.vue'
import { Tickets } from '../types'
import { createMockStore } from './mockStore'

describe('HomePage.vue', () => {
  it('should render the available tickets title', () => {
    const store = createMockStore()
    const wrapper = mount(HomePage, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.text()).toContain('Available Tickets')
  })

  it('should display a message when there are no tickets', () => {
    const store = createMockStore()
    const wrapper = mount(HomePage, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.text()).toContain('No tickets available.')
  })

  it('should display tickets when available', () => {
    const tickets: Tickets = [
      {
        id: '1',
        name: 'VIP Ticket',
        quantity: 10,
        isVIP: true,
        price: 199,
        description:
          'VIP access to the concert with front-row seating and exclusive perks.',
      },
      {
        id: '2',
        name: 'Regular Ticket',
        quantity: 5,
        isVIP: false,
        price: 99,
        description: 'Enjoy an amazing live concert with top artists.',
      },
    ]
    const store = createMockStore({ tickets, cart: [] })
    const wrapper = mount(HomePage, {
      global: {
        plugins: [store],
      },
    })

    const ticketItems = wrapper.findAllComponents(TicketItem)
    expect(ticketItems.length).toBe(2)

    expect(wrapper.text()).toContain('VIP Ticket')
    expect(wrapper.text()).toContain('Regular Ticket')
  })

  it('should call addToCart action when "Add to Cart" button is clicked', async () => {
    let mockDispatch: jest.Mock = jest.fn()
    window.alert = jest.fn()
    const tickets = [
      {
        id: '1',
        name: 'VIP Ticket',
        quantity: 10,
        isVIP: true,
        price: 199,
        description: 'VIP access to ',
        availableQuantity: 20,
      },
    ]

    const store = createMockStore(
      { tickets, cart: [] },
      { addToCart: mockDispatch }
    )
    const wrapper = mount(HomePage, {
      global: {
        plugins: [store],
      },
    })

    const ticketItem = wrapper.findComponent(TicketItem)
    expect(ticketItem.exists()).toBe(true)

    const mockTicket = { ...store.state.tickets[0], quantity: 1 }

    await ticketItem.vm.$emit('add-to-cart', mockTicket)

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ id: '1', quantity: 1 })
    )
  })
})
