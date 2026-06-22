function submitCallbackForm(expectedSource: string, expectedOption = '') {
  cy.get('.callback-modal__form input[type="text"]').type('Тест сайта')
  cy.get('.callback-modal__form input[type="tel"]').type('+7 000 000-00-00')
  cy.get('.callback-modal__form textarea').type('Проверка формы')
  cy.get('.callback-modal__submit').click().should('be.disabled')

  cy.wait('@lead').then(({ request }) => {
    const payload = new URLSearchParams(request.body)
    const message = payload.get('text') || ''

    expect(payload.get('chat_id')).not.to.equal('')
    expect(message).to.include('💬 Комментарий: Проверка формы')
    expect(message).to.include('👤 Имя: Тест сайта')
    expect(message).to.include('📞 Телефон: +7 000 000-00-00')
    expect(message).to.include(`📍 Источник: ${expectedSource}`)

    if (expectedOption)
      expect(message).to.include(`🔧 Выбранное решение: ${expectedOption}`)
  })

  cy.contains('.callback-modal__message', 'Спасибо! Заявка отправлена').should('be.visible')
  cy.get('.callback-modal__form input').should('have.value', '')
  cy.get('.callback-modal__form textarea').should('have.value', '')
  cy.get('@consoleError').should('not.have.been.called')
}

describe('lead forms', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://api.telegram.org/bot*/sendMessage', {
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
      const payload = new URLSearchParams(request.body)
      const message = payload.get('text') || ''

      expect(message).to.include('📐 Площадь: 18 м²')
      expect(message).to.include('💬 Комментарий: Проверка калькулятора')
      expect(message).to.include('📏 Гардина: 3 м')
      expect(message).to.include('💡 Светильники: 6')
      expect(message).to.include('👤 Имя: Тест сайта')
      expect(message).to.include('📞 Телефон: +7 000 000-00-00')
      expect(message).to.include('🏠 Тип потолка: Глянцевые потолки')
      expect(message).to.include('📍 Источник: Калькулятор / Виды потолков')
    })

    cy.contains('.catalog-modal__message', 'Спасибо! Заявка отправлена').should('be.visible')
    cy.get('.catalog-modal__form input').should('have.value', '')
    cy.get('.catalog-modal__form textarea').should('have.value', '')
    cy.get('@consoleError').should('not.have.been.called')
  })
})
