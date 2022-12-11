describe('Корректная работа queue', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000/queue')
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
  it('Проверка добавления в queue', ()=> {
    cy.get('[class*=circle_circle]').should('have.length', 7).as('circles');
    cy.get('[class*=circle_head]').should('have.length', 7).as('heads');
    cy.get('[class*=circle_tail60]').should('have.length', 7).as('tails');
    cy.get('@heads').eq(0).should('have.text', '');
    cy.get('@tails').eq(0).should('have.text', '');
    cy.get('input').type('5');
    cy.get('button').eq(1).click();
    cy.get('@circles').eq(0).should('have.text', '5').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.get('@heads').eq(0).should('have.text', 'top');
    cy.get('@tails').eq(0).should('have.text', 'tail');
    cy.wait(500);
    cy.get('@circles').eq(0).should('have.text', '5').and('have.css', 'border').and('match', /(0, 50, 255)/);

    cy.get('input').type('{backspace}4');
    cy.get('button').eq(1).click();
    cy.get('@circles').eq(1).should('have.text', '4').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.get('@heads').eq(1).should('have.text', '');
    cy.get('@tails').eq(1).should('have.text', 'tail');
    cy.wait(500);
    cy.get('@circles').eq(1).should('have.text', '4').and('have.css', 'border').and('match', /(0, 50, 255)/);

    cy.get('input').type('{backspace}3');
    cy.get('button').eq(1).click();
    cy.get('@circles').eq(2).should('have.text', '3').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.get('@heads').eq(2).should('have.text', '');
    cy.get('@tails').eq(2).should('have.text', 'tail');
    cy.wait(500);
    cy.get('@circles').eq(2).should('have.text', '3').and('have.css', 'border').and('match', /(0, 50, 255)/);
  });
  it('Проверка удаления из queue', ()=> {
    cy.get('[class*=circle_circle]').should('have.length', 7).as('circles');
    cy.get('[class*=circle_head]').should('have.length', 7).as('heads');
    cy.get('[class*=circle_tail60]').should('have.length', 7).as('tails');
    cy.get('input').type('5');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('{backspace}4');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('{backspace}3');
    cy.get('button').eq(1).click();
    cy.wait(500);
    // кнопка удаления
    cy.get('button').eq(2).click();
    cy.get('@circles').eq(0).should('have.text', '5').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('@circles').eq(0).should('have.text', '').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@heads').eq(0).should('have.text', '');
    cy.get('@tails').eq(0).should('have.text', '');
    cy.get('button').eq(2).click();
    cy.get('@circles').eq(1).should('have.text', '4').and('have.css', 'border').and('match', /(210, 82, 225)/);
    cy.wait(500);
    cy.get('@circles').eq(1).should('have.text', '').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@heads').eq(1).should('have.text', '');
    cy.get('@tails').eq(1).should('have.text', '');
  });
  it('Проверка очистки', ()=> {
    cy.get('[class*=circle_circle]').should('have.length', 7).as('circles');
    cy.get('[class*=circle_head]').should('have.length', 7).as('heads');
    cy.get('[class*=circle_tail60]').should('have.length', 7).as('tails');
    cy.get('input').type('5');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('{backspace}4');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('{backspace}3');
    cy.get('button').eq(1).click();
    cy.wait(500);
    // кнопка очистки
    cy.get('button').eq(3).click();
    cy.wait(500);
    cy.get('@circles').eq(2).should('have.text', '').and('have.css', 'border').and('match', /(0, 50, 255)/);
    cy.get('@circles').eq(3).should('have.text', '').and('have.css', 'border').and('match', /(0, 50, 255)/);
  });

});
