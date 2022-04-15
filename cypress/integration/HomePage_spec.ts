const appId = process.env.REACT_APP_EDAMAN_API_ID
const appKey = process.env.REACT_APP_EDAMAN_API_KEY

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display a header, background image and form', () => {
    cy.get('form')
      .should('be.visible')

    cy.get('h1')
      .contains('Recip-Eco')

    cy.get('img')
      .should('have.class', 'background-image')
      .should('have.attr', 'src')
      .and('contain', 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80')
  })

  it('should see a form that contains one input, an add ingredient button, a search button, and clear ingredients button', () => {
    cy.get('form')
      .contains('What ingredients would you like to use?')

    cy.get('input')
      .should('have.attr', 'placeholder')
      .and('contain', 'example: chicken')

    cy.get('button')
      .first()
      .should('have.class', 'clear-ingredients')

    cy.get('button')
      .last()
      .should('have.class', 'search-btn')

    cy.get('button')
      .should('have.class', 'add-input-btn')
      .and('contain', 'Add Ingredient')
  })

  it('should contain a list of ingredients that I am searching for. (On page load, there are none.)', () => {
    cy.get('.ingredients-to-search')
      .contains('Ingredient list: none')
  })

  it('should update the input field to reflect the ingredient that I typed', () => {
    cy.get('input')
      .type('chicken')
      .should('have.value', 'chicken')
  })

  it('should add the text from my input field into the list of ingredients when I click the "Add Ingredient" button', () => {
    cy.get('input')
      .type('fish')
      .should('have.value', 'fish')

    cy.get('.add-input-btn')
      .click()
    
    cy.get('.ingredients-to-search')
      .contains('Ingredient list: fish')

    cy.get('input')
      .type('avocado')
      .should('have.value', 'avocado')

    cy.get('.add-input-btn')
      .click()

    cy.get('.ingredients-to-search')
      .contains('Ingredient list: fish, avocado')

  })

  it('should see a grid of images with recipe titles, calories, and button to see recipe details after I click on Find Recipes', () => {
    cy.intercept(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${appId}&app_key=${appKey}`)
    
    cy.get('input')
      .type('chicken')

    cy.get('.add-input-btn')
      .click()

    cy.get('.search-btn')
      .click()

    cy.get('.recipe-cards').children('article')
      .should('have.length', 20)
      .contains('h3')
      .and('contain', 'cal')
      .contains('p')
    
    cy.get('img')
      .should('have.attr', 'src')
      // add alt to img

    cy.get('button')
      .contains('View')
  })

  // it('should update the URL path to include my query parameters when I click on Find Recipes (E.g. localhost:3000/?ingredients=chicken&cheese***)', () => {

  // })

})