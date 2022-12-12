describe('Корректная работа route', ()=>{
  beforeEach(()=>{
    cy.visit('http://localhost:3000')
  });
  it('открытие стартовой страницы', ()=> {
    cy.contains('МБОУ');
  });
  it('открытие реверса строки', ()=> {
    cy.get('a[href*="/recursion"]').click();
    cy.contains('Максимум');
  });
  it('открытие fibonacci', ()=> {
    cy.get('a[href*="/fibonacci"]').click();
    cy.contains('Максимальное');
  });
  it('открытие sorting', ()=> {
    cy.get('a[href*="/sorting"]').click();
    cy.contains('Выбор');
  });
  it('открытие stack', ()=> {
    cy.get('a[href*="/stack"]').click();
    cy.contains('Стек');
  });
  it('открытие queue', ()=> {
    cy.get('a[href*="/queue"]').click();
    cy.contains('Очередь');
  });
  it('открытие list', ()=> {
    cy.get('a[href*="/list"]').click();
    cy.contains('Связный');
  });
})
