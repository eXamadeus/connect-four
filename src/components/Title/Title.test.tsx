import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import * as React from 'react'

import { Title } from './Title.component'

describe('Title Component', () => {
  it('renders', async () => {
    render(<Title>Example Component</Title>)
    expect(await screen.findByText('Example Component')).toBeInTheDocument()
  })
})
