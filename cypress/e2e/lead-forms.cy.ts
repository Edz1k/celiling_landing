function submitCallbackForm(expectedSource: string, expectedOption = '') {
  cy.get('.callback-modal__form input[type="text"]').type('Тест сайта')
  cy.get('.callback-modal__form input[type="tel"]').type('+7 000 000-00-00')
  cy.get('.callback-modal__form textarea').type('Проверка формы')
  cy.get('.callback-modal__submit').click().should('be.disabled')

  cy.wait('@lead').then(({ request }) => {
    expect(request.body).to.include({
      comment: 'Проверка формы',
      name: 'Тест сайта',
      phone: '+7 000 000-00-00',
      source: expectedSource,
    })
    expect(request.body.submittedAt).to.be.a('string')

    if (expectedOption)
      expect(request.body.selectedOption).to.eq(expectedOption)
  })

  cy.contains('.callback-modal__message', 'Спасибо! Заявка отправлена').should('be.visible')
  cy.get('.callback-modal__form input').should('have.value', '')
  cy.get('.callback-modal__form textarea').should('have.value', '')
  cy.get('@consoleError').should('not.have.been.called')
}

describe('lead forms', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/telegram-lead', {
      delay: 150,
      statusCode: 200,
      body: { ok: true },
    }).as('lead')
    cy.visit('/')
    cy.window().then((window) => {
      cy.spy(window.console, 'error').as('consoleError')
    })
  })

  it('отправляет заявку из hero', () => {
    cy.get('.hero-section .app-button').click()
    submitCallbackForm('Главный экран')
  })

  it('отправляет заявку из контактов', () => {
    cy.get('.contacts-section__callback-button').click()
    submitCallbackForm('Контакты')
  })

  it('отправляет консультацию из портфолио', () => {
    cy.get('.portfolio-section__card').first().click()
    cy.get('.portfolio-modal__cta').click()
    cy.get('.callback-modal').should('be.visible')
    submitCallbackForm('Портфолио', 'Парящий потолок сложной геометрии')
  })

  it('отправляет консультацию по дополнительной услуге', () => {
    cy.get('.additional-options-section__card').first().click()
    cy.get('.additional-option-modal__cta').click()
    cy.get('.callback-modal').should('be.visible')
    submitCallbackForm('Дополнительно к потолкам', 'Освещение')
  })

  it('отправляет заявку из калькулятора каталога', () => {
    cy.get('.ceiling-types-section__card').first().click()
    cy.get('.catalog-modal__quiz input').eq(0).type('18')
    cy.get('.catalog-modal__quiz input').eq(1).type('6')
    cy.get('.catalog-modal__quiz input').eq(2).type('3')
    cy.get('.catalog-modal__request input[type="text"]').type('Тест сайта')
    cy.get('.catalog-modal__request input[type="tel"]').type('+7 000 000-00-00')
    cy.get('.catalog-modal__request textarea').type('Проверка калькулятора')
    cy.get('.catalog-modal__submit').click().should('be.disabled')

    cy.wait('@lead').then(({ request }) => {
      expect(request.body).to.include({
        area: 18,
        comment: 'Проверка калькулятора',
        curtainMeters: 3,
        lights: 6,
        name: 'Тест сайта',
        phone: '+7 000 000-00-00',
        selectedType: 'Глянцевые потолки',
        source: 'Калькулятор / Виды потолков',
      })
      expect(request.body.submittedAt).to.be.a('string')
    })

    cy.contains('.catalog-modal__message', 'Спасибо! Заявка отправлена').should('be.visible')
    cy.get('.catalog-modal__form input').should('have.value', '')
    cy.get('.catalog-modal__form textarea').should('have.value', '')
    cy.get('@consoleError').should('not.have.been.called')
  })
})
