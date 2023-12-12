import { LexoRank } from 'lexorank'

type SortDirection = 'asc' | 'desc'

type SortConfig = {
  field: string
  direction: SortDirection
}

export type Order = string

export function produceOrder(before?: Order, after?: Order): Order {
  if (!before && !after) {
    return LexoRank.middle().toString()
  }

  if (!before && after) {
    return LexoRank.parse(after).genPrev().toString()
  }

  if (!after && before) {
    return LexoRank.parse(before).genNext().toString()
  }

  if (before && after) {
    if (before === after) {
      return LexoRank.parse(before).genNext().toString()
    }

    const betweenLexoRank = LexoRank.parse(before).between(
      LexoRank.parse(after)
    )

    return betweenLexoRank.toString()
  }

  return LexoRank.middle().toString()
}

export function sortArray<T extends Record<string, any>>(
  arr: T[],
  config: SortConfig = { field: 'order', direction: 'asc' }
): T[] {
  const arrClone = [...arr]

  return arrClone.sort((a, b) => {
    let valA = a[config.field]
    let valB = b[config.field]

    if (typeof valA === 'string' && typeof valB === 'string') {
      return config.direction === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    } else if (typeof valA === 'number' && typeof valB === 'number') {
      return config.direction === 'asc' ? valA - valB : valB - valA
    } else {
      return 0
    }
  })
}
