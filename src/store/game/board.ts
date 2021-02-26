import { Board, Node } from './game.types'

export const createBoard = (size: number): Board => {
  const initialNode: Node = 'empty'

  const buildColumn = () => [...new Array(size)].map(() => initialNode)

  return [...new Array(size)].map(buildColumn)
}
