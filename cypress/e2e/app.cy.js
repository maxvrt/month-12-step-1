describe('Приложение поднялось', ()=> {
  it('доступен по localhost', ()=>{
    cy.visit('http://localhost:3000')
  })
})
