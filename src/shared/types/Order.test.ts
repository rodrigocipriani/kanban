import { produceOrder, sortArray } from './Order'

type Item = {
  id: string
  rank: string
}
let mockItems: Item[] = []

function mockMoveItem(itemId: string, moveToIndex: number) {
  const currentItemIndex = mockItems.findIndex((item) => item.id === itemId)

  if (currentItemIndex === moveToIndex) {
    return mockItems.map((item) => item.id).join('')
  }

  let prevItem = undefined
  let nextItem = undefined
  if (currentItemIndex > moveToIndex) {
    prevItem = mockItems[moveToIndex - 1]
    nextItem = mockItems[moveToIndex]
  } else {
    prevItem = mockItems[moveToIndex]
    nextItem = mockItems[moveToIndex + 1]
  }

  const prevItemRank = prevItem ? prevItem.rank : undefined
  const nextItemRank = nextItem ? nextItem.rank : undefined

  const newOrder = produceOrder(prevItemRank, nextItemRank)

  mockItems = mockItems.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        rank: newOrder,
      }
    }

    return item
  })

  mockItems = sortArray(mockItems, {
    field: 'rank',
    direction: 'asc',
  })

  return mockItems.map((item) => item.id).join('')
}

describe('Order', () => {
  beforeEach(() => {
    mockItems = []
    mockItems.push({ id: '1', rank: produceOrder() })
    mockItems.push({ id: '2', rank: produceOrder(mockItems[0].rank) })
    mockItems.push({ id: '3', rank: produceOrder(mockItems[1].rank) })
    mockItems.push({ id: '4', rank: produceOrder(mockItems[2].rank) })
    mockItems.push({ id: '5', rank: produceOrder(mockItems[3].rank) })
  })

  it('should be ranked', () => {
    const orderedIds = mockItems.map((item) => item.id).join('')

    expect(orderedIds).toEqual('12345')
  })

  it('should be reranked ', () => {
    const newOrderedIds = mockMoveItem('1', 4)

    expect(newOrderedIds).toEqual('23451')
  })

  it('should rerank from the last to first position', () => {
    const newOrderedIds = mockMoveItem('5', 0)

    expect(newOrderedIds).toEqual('51234')
  })

  it('should rerank from the first to last position', () => {
    const newOrderedIds = mockMoveItem('1', 3)

    expect(newOrderedIds).toEqual('23415')
  })

  it('should rerank from the middle to first position', () => {
    const newOrderedIds = mockMoveItem('3', 0)

    expect(newOrderedIds).toEqual('31245')
  })

  it('should rerank from the middle to last position', () => {
    const newOrderedIds = mockMoveItem('3', 4)

    expect(newOrderedIds).toEqual('12453')
  })

  it('should rerank from the middle to middle position', () => {
    const newOrderedIds = mockMoveItem('3', 1)

    expect(newOrderedIds).toEqual('13245')
  })

  it('should continue well sorted even after many reranks on same positions', () => {
    mockMoveItem('4', 2)
    mockMoveItem('3', 2)
    mockMoveItem('4', 2)
    mockMoveItem('3', 2)
    mockMoveItem('4', 2)
    mockMoveItem('3', 2)
    mockMoveItem('4', 2)
    mockMoveItem('3', 2)
    mockMoveItem('4', 2)
    mockMoveItem('3', 2)
    mockMoveItem('4', 2)
    mockMoveItem('3', 2)
    mockMoveItem('4', 2)
    mockMoveItem('3', 2)
    mockMoveItem('4', 2)
    mockMoveItem('3', 2)
    mockMoveItem('4', 2)
    mockMoveItem('3', 2)
    mockMoveItem('4', 2)
    const newOrderedIds = mockMoveItem('3', 2)

    expect(newOrderedIds).toEqual('12345')
  })
})
