Cypress.Commands.add('myCustomCommand', (message) =>{
    expect(cy.title().should('eq','Sign In | Liquid Cryptocurrency Exchange'))
})