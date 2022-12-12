describe('Корректная работа list', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/list')
  });
  it('Проверка дизейбла кнопки', ()=> {
    cy.get('input').eq(0).then((i) => {
      if (expect(i).to.be.empty) {
        cy.get('button').eq(1).should('be.disabled');
        cy.get('button').eq(2).should('be.disabled');
      } else {
        cy.get('button').eq(1).should('be.enabled');
        cy.get('button').eq(2).should('be.enabled');
      }
    });
    cy.get('input').eq(1).then((i) => {
      if (expect(i).to.be.empty) {
        cy.get('button').eq(5).should('be.disabled');
        cy.get('button').eq(6).should('be.disabled');
      } else {
        cy.get('button').eq(5).should('be.enabled');
        cy.get('button').eq(6).should('be.enabled');
      }
    });
  });
  it('Проверка списка и добавления в список', ()=> {
    cy.get('[class*=circle_circle]').should('have.length', 4).as('circles');
    cy.get('[class*=circle_head]').should('have.length', 4).as('heads');
    cy.get('[class*=circle_tail60]').should('have.length', 4).as('tails');
    cy.get('@circles').eq(0).should('have.text', '0');
    cy.get('@circles').eq(3).should('have.text', '1');
    cy.get('@heads').eq(0).should('have.text', 'head');
    cy.get('@tails').eq(3).should('have.text', 'tail');

    // добавление в head
    cy.get('input').eq(0).type('5');
    cy.get('button').eq(1).click();
    cy.get('[class*=circle_small]').should('have.length', 1).as('small_circle');
    cy.get('@small_circle').eq(0).should('have.text', '5').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('@circles').eq(0).should('have.text', '5').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.get('@heads').eq(0).should('have.text', 'head');
    cy.wait(500);
    cy.get('@circles').eq(0).should('have.text', '5').and('have.css', 'border').and('match', /(0, 50, 255)/);

    // добавление в tail
    cy.get('input').eq(0).type('5');
    cy.get('button').eq(2).click();
    cy.get('[class*=circle_small]').should('have.length', 1).as('small_circle');
    cy.get('@small_circle').eq(0).should('have.text', '5').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('[class*=circle_circle]').should('have.length', 6).as('circles');
    cy.get('@circles').eq(5).should('have.text', '5').and('have.css', 'border').and('match', /(127, 224, 81)/);
    cy.get('[class*=circle_tail60]').should('have.length', 6).as('tails');
    cy.get('@tails').eq(5).should('have.text', 'tail');
    cy.wait(1000);
    cy.get('@circles').eq(5).should('have.text', '5').and('have.css', 'border').and('match', /(0, 50, 255)/);

    // добавление по индексу
    cy.get('input').eq(0).type('44');
    cy.get('input').eq(1).type('4');
    cy.get('button').eq(5).click();
    cy.get('[class*=circle_small]').should('have.length', 1).as('small_circle');
    cy.get('@small_circle').eq(0).should('have.text', '44').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(2000);
    cy.get('@small_circle').eq(0).should('have.text', '44').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('[class*=circle_circle]').should('have.length', 7).as('circles');
    cy.get('@circles').eq(4).should('have.text', '44').and('have.css', 'border').and('match', /(210, 82, 225)/);
  });
  it('Проверка удаления из списка', ()=> {
    cy.get('[class*=circle_circle]').should('have.length', 4).as('circles');
    cy.get('[class*=circle_head]').should('have.length', 4).as('heads');
    cy.get('[class*=circle_tail60]').should('have.length', 4).as('tails');
    // удаление из head
    cy.get('button').eq(3).click();
    cy.get('[class*=circle_small]').should('have.length', 1).as('small_circle');
    cy.get('@circles').eq(0).should('have.text', '');
    cy.get('@small_circle').eq(0).should('have.text', '0').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('[class*=circle_circle]').should('have.length', 3).as('circles');
    cy.get('@circles').eq(0).should('have.text', '34');

    // удаление из tail
    cy.get('button').eq(4).click();
    cy.get('[class*=circle_small]').should('have.length', 1).as('small_circle');
    cy.get('@circles').eq(2).should('have.text', '');
    cy.get('@small_circle').eq(0).should('have.text', '1').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('[class*=circle_circle]').should('have.length', 2).as('circles');
    cy.get('@circles').eq(1).should('have.text', '8');

    // удаление по индексу
    cy.get('input').eq(1).type('1');
    cy.get('button').eq(6).click();
    cy.wait(1000);
    cy.get('[class*=circle_small]').should('have.length', 1).as('small_circle');
    cy.get('@small_circle').eq(0).should('have.text', '8').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(1000);
    cy.get('[class*=circle_circle]').should('have.length', 1).as('circles');
    cy.get('@circles').eq(0).should('have.text', '34').and('have.css', 'border').and('match', /(0, 50, 255)/);
  });
});
