import PageObject from "./_base/PageObject";

class SignInPage extends PageObject{

    static url: string  = "/sign-in"

    private email_txtField: string = '#sign-in--1--email';
    private password_txtField: string = '#sign-in--1--password';
    private submitEmailPass_btn: string = '#sign-in--1--submit';
    

    signIn(email: string, password: string, secret: string){
        cy.get(this.email_txtField).type(email);
        cy.get(this.password_txtField).type(password);
        cy.get(this.submitEmailPass_btn).click();
    }
}

export default SignInPage