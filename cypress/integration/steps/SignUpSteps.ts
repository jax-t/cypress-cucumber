const {Given,Then} = require("cypress-cucumber-preprocessor/steps");
import SignInPage from '../../src/pageobject/SignInPage'
import HomePage from '../../src/pageobject/HomePage'
import PageObject from '../../src/pageobject/_base/PageObject'
import { visit, on } from '../../src/world/World'
/// <reference path="../support/index.d.ts" />

Given('I open sign in page', () => {
    visit(SignInPage)
})