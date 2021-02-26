import { css } from '@emotion/core'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Board } from '../components/Board/Board.component'
import { Button } from '../components/Button/Button.component'
import { Title } from '../components/Title/Title.component'
import { FullPageCenteredFlexContainer } from '../layout/FullPageCenteredFlexContainer'
import { gameActions } from '../store/game/game.actions'
import { selectGameState, selectPlayerTurn } from '../store/game/game.selectors'
import { useSelector } from '../store/utils'

const GamePage: React.FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const gameState = useSelector(selectGameState)
  const playerTurn = useSelector(selectPlayerTurn)

  useEffect(() => {
    if (gameState === 'not playing') {
      dispatch(gameActions.start({ firstPlayer: 'blue' }))
    }
  }, [dispatch, gameState])

  return (
    <FullPageCenteredFlexContainer>
      <div
        css={css`
          display: flex;
          align-content: space-between;
          width: ${75 * 8}px;
          margin-bottom: 2rem;
        `}>
        <Title
          style={css`
            flex: 1 0 auto;
          `}>
          {gameState === 'game over'
            ? `${playerTurn?.[0]?.toUpperCase()}${playerTurn?.slice(1)} won!`
            : `It's ${playerTurn}'s turn`}
        </Title>
        <Button
          onClick={() => dispatch(gameActions.start({ firstPlayer: playerTurn ?? 'blue' }))}
          style={css`
            margin-left: 2rem;
          `}>
          {gameState === 'game over' ? 'Play again' : 'Restart'}
        </Button>
      </div>
      <Board />

      <Button
        onClick={() => router.push('/')}
        style={css`
          margin-top: 2rem;
        `}>
        Home
      </Button>
    </FullPageCenteredFlexContainer>
  )
}

export default GamePage
