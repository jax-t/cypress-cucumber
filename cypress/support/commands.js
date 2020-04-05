Cypress.Commands.add('myCustomCommand', (message) =>{
    expect(cy.title().should('eq','test123213'))
})