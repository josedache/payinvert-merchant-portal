// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

import { mount } from "cypress/react";
import "../../src/index.css";
import TestingProvider from "../../src/providers/TestingProvider";


Cypress.Commands.add("mount", (component, options) => {
  const wrapper = <TestingProvider>{component}</TestingProvider>;

  return mount(wrapper, options);
});


// Example use:
// cy.mount(<MyComponent />)
