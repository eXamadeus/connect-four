import { css } from '@emotion/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Board } from '../components/Board/Board.component'
import { Title } from '../components/Title/Title.component'
import { FullPageCenteredFlexContainer } from '../layout/FullPageCenteredFlexContainer'
import { gameActions } from '../store/game/game.actions'
import { selectGameState, selectPlayerTurn } from '../store/game/game.selectors'
import { useSelector } from '../store/utils'

const GamePage: React.FC = () => {
  const dispatch = useDispatch()

  const gameState = useSelector(selectGameState)
  const playerTurn = useSelector(selectPlayerTurn)

  useEffect(() => {
    if (gameState === 'not playing') {
      dispatch(gameActions.start({ firstPlayer: 'blue' }))
    }
  }, [dispatch, gameState])

  return (
    <>
      <Title>Playing Connect Four</Title>
      <FullPageCenteredFlexContainer>
        <Board />
        <h2
          css={css`
            margin-top: 2rem;
            font-size: 2rem;
          `}>
          It{"'"}s {`${playerTurn}'s`} turn
        </h2>
      </FullPageCenteredFlexContainer>
    </>
  )
}

export default GamePage
