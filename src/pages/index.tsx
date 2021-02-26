import { css } from '@emotion/core'
import Link from 'next/link'
import React from 'react'

import { Button } from '../components/Button/Button.component'
import { Title } from '../components/Title/Title.component'
import { FullPageCenteredFlexContainer } from '../layout/FullPageCenteredFlexContainer'

const IndexPage: React.FC = () => {
  return (
    <FullPageCenteredFlexContainer>
      <div>
        <Title>Connect Four Game</Title>
        <div>
          <h4>
            Designed by{' '}
            <a href='https://github.com/examadeus' target='_blank' rel='noreferrer'>
              Julian
            </a>
          </h4>
        </div>
      </div>

      <div
        css={css`
          margin-top: 3rem;
        `}>
        <Link href={'/game'}>
          <Button>Play</Button>
        </Link>
      </div>
    </FullPageCenteredFlexContainer>
  )
}

export default IndexPage
