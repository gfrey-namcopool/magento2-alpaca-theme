function pickRandomitem (item) {
  return item[Math.floor(Math.random() * item.length)]
}

describe('Add to cart', function () {
  before(() => {
    // Hide premissions popup
    cy.setCookie('permission-cookies', 'true')
    cy.setCookie('permission-profiling', 'true')
    cy.setCookie('mage-cache-sessid', 'true')
    // Keep cookies beween tests
    Cypress.Cookies.defaults({
      whitelist: [
        'frontend',
        'X-Magento-Vary',
        'permission-cookies',
        'permission-profiling',
        'PHPSESSID',
        'form_key'
      ]
    })
  })

  it('Visits product', () => {
    cy.visit('/women')
  })

  it('adds product to cart', () => {
    cy.get('[data-testid=catalog-grid-item__link]')
      .then((elements) => {
        cy.log(elements)
        pickRandomitem(elements).click()
      })

    cy.get('[data-testid=product-gallery-placeholder]').should('be.visible')
    cy.get('.product-view__main-actions').should('be.visible')
    cy.get('.swatch-opt').should('be.visible').find('.size')
    cy.get('.size').find('.swatch__option')
      .then((elements) => {
        cy.log(elements)
        pickRandomitem(elements).click()
      })
    cy.get('.color').find('.swatch__option')
      .then((elements) => {
        cy.log(elements)
        pickRandomitem(elements).click()
      })
    cy.get('#product-addtocart-button').first()
      .click()
      .debug()
  })
  after(() => {
    // Clear cookie after tests to enable running test several times
    cy.clearCookie('frontend')
    cy.clearCookie('permission-cookies')
    cy.clearCookie('permission-profiling')
    cy.clearCookie('form_key')
    cy.clearCookie('PHPSESSID')
    cy.clearCookie('mage-cache-sessid')
  })
})
