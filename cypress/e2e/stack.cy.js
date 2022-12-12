describe('Корректная работа stack', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/stack')
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
  it('Проверка добавления в стэк', ()=> {
    cy.get('input').type('5');
    cy.get('button').eq(1).click();
    cy.get('[class*=circle_circle]').should('have.length', 1).as('circles');
    cy.get('@circles').eq(0).should('have.text', '5').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('@circles').eq(0).should('have.text', '5').and('have.css', 'border').and('match', /(0, 50, 255)/);

    cy.get('input').type('4');
    cy.get('button').eq(1).click();
    cy.get('[class*=circle_circle]').should('have.length', 2).as('circles');
    cy.get('@circles').eq(1).should('have.text', '4').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('@circles').eq(1).should('have.text', '4').and('have.css', 'border').and('match', /(0, 50, 255)/);

    cy.get('input').type('3');
    cy.get('button').eq(1).click();
    cy.get('[class*=circle_circle]').should('have.length', 3).as('circles');
    cy.get('@circles').eq(2).should('have.text', '3').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('@circles').eq(2).should('have.text', '3').and('have.css', 'border').and('match', /(0, 50, 255)/);
  });
  it('Проверка удаления из стэка', ()=> {
    cy.get('input').type('5');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('4');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('3');
    cy.get('button').eq(1).click();
    cy.get('[class*=circle_circle]').should('have.length', 3).as('circles');
    cy.get('button').eq(2).click();
    cy.get('@circles').eq(2).should('have.text', '3').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('[class*=circle_circle]').should('have.length', 2).as('circles');
  });
  it('Проверка очистки стэка', ()=> {
    cy.get('input').type('5');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('4');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('3');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('[class*=circle_circle]').should('have.length', 3);
    cy.get('button').eq(3).click();
    cy.wait(500);
    cy.get('[class*=circle_circle]').should('have.length', 0);
  });
});
