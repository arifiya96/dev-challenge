/// <reference types="cypress" />

describe("Test for exercise 3", () => {
  //Make sure link works before each test
  beforeEach(() => {
    cy.visit("/");
  });

  it("Check that all the components are there", () => {
    //Check the title exists
    cy.get('[data-testid=search-title]');
    //Check input box exists
    cy.get('[data-testid=search-input]');
    //Check source filter options
    cy.get('[data-testid=region-filter]')
    cy.get('[data-testid=article-source-filter]');
    //Check there is at least 1 source in dropdown filter
    cy.get('[data-testid=article-source-filter]').click();
    cy.get('[data-testid=article-source]');
  })

  it("Test filter components for default", () => {
    //Check if you can filter by source on click with BBC example (assuming BBC = most popular source in UK so it will always appear)
    cy.get('[data-testid=article-source-filter]').click();
    cy.get('[data-testid=article-source]').contains('BBC News').click();
  })

  //Going to pretend I am an Indonesian person looking for the top articles in my country
  it("Filter by region - Indonesia", () => {
    //Select Indonesia from region filter dropdown
    cy.get('[data-testid=region-filter]').click();
    cy.get('[data-testid=region-source]').contains('Indonesia').click();
  })

  //Curious to see what articles exist about Indonesia, I type Indonesia into the search bar
  it("Look at all articles about Indonesia", () => {
    //Type 'Indonesia' into search box
    cy.get('[data-testid=search-input]').type('Indonesia');
    //Check articles have loaded
    cy.get('[data-testid=external-link-article]');
  })
})
