
declare namespace Cypress {
    interface Chainable<Subject = any> {
      myCustomCommand(message:string): Chainable<any>;
    }
}