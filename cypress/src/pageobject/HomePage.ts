import PageObject from "./_base/PageObject";

class HomePage extends PageObject {
    static url: string  = ""

    doSomething(){
        cy.log('do something here ....');
    }
}

export default HomePage