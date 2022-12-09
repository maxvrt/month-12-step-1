describe('Корректная работа recursion', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/recursion')
  });
  it('Проверка дизейбла кнопки2', ()=> {
    cy.get('input').then((i) => {
      if (i.is('not.be.empty')) {
        cy.get('button').should('be.enabled');
      } else {
        cy.get('button').should('be.disabled');
      }
    });
  });
  it('Проверка разворота строки', ()=> {
    cy.get('input').type('111000');
    cy.get('button').eq(1).click();
    cy.get('[class*=circle_default]').should('have.length', 6).as('circles');
    cy.get('@circles').eq(0).should('have.text', '1').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(1).should('have.text', '1').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(2).should('have.text', '1').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(3).should('have.text', '0').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(4).should('have.text', '0').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(5).should('have.text', '0').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.wait(1000);
    cy.get('@circles').eq(0).should('have.text', '0').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.get('@circles').eq(1).should('have.text', '1').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(2).should('have.text', '1').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(3).should('have.text', '0').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(4).should('have.text', '0').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(5).should('have.text', '1').and('have.css', 'border').and('match', /(210, 82, 225)/);
  });
});
