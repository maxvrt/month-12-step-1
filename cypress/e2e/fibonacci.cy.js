describe('Корректная работа fibonacci', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/fibonacci')
  });
  it('Проверка дизейбла кнопки', ()=> {
    cy.get('input').then((i) => {
      if (i.is('not.be.empty')) {
        cy.get('button').eq(1).should('be.enabled');
      } else {
        cy.get('button').eq(1).should('be.disabled');
      }
    });
  });
  it('Проверка fibonacci', ()=> {
    cy.get('input').type('5');
    cy.get('button').eq(1).click();
    cy.wait(4000);
    cy.get('[class*=circle_default]').should('have.length', 6).as('circles');
    cy.get('@circles').eq(0).should('have.text', '0').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(1).should('have.text', '1').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(2).should('have.text', '1').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(3).should('have.text', '2').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(4).should('have.text', '3').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(5).should('have.text', '5').and('have.css', 'border').and('match', /(0, 50, 255)/);
  });
});
