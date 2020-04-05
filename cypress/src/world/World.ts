import PageObject from "../pageobject/_base/PageObject";

export type Newable<T> = { new (...args: any[]): T; };

let pageHierarchy: Map<string,PageObject> = new Map<string,PageObject>()

export function on<T>(page: Newable<T> ) : T {
    let pageName :string = page.name
    if(pageHierarchy.get(pageName)===undefined){
        pageHierarchy.set(pageName,new page())  
    }
    return pageHierarchy.get(pageName) as T
}

export function visit(page:typeof PageObject ) : void {
    cy.visit(page.url)
}



