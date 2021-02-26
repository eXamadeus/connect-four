/// <reference types="cypress" />

const clickColumn = (column: number) => {
  cy.findByRole('button', { name: new RegExp(`node ${column}, 0`, 'i') }).click()
}

context('Actions', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('win vertically', () => {
    clickColumn(0)
    clickColumn(1)

    clickColumn(0)
    clickColumn(1)

    clickColumn(0)
    clickColumn(1)

    clickColumn(0)
    clickColumn(1)

    cy.findByRole('heading', { name: /blue won!/i })
  })

  it('win horizontally', () => {
    clickColumn(0)
    clickColumn(0)

    clickColumn(1)
    clickColumn(1)

    clickColumn(2)
    clickColumn(2)

    clickColumn(3)
    clickColumn(3)

    cy.findByRole('heading', { name: /blue won!/i })
  })

  it('win diagonally - ne', () => {
    clickColumn(0)
    clickColumn(1)

    clickColumn(1)
    clickColumn(2)

    clickColumn(2)
    clickColumn(3)

    clickColumn(4)
    clickColumn(3)

    clickColumn(2)
    clickColumn(3)

    clickColumn(3)

    cy.findByRole('heading', { name: /blue won!/i })
  })
})
