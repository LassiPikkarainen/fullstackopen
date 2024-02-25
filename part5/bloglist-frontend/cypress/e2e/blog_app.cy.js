describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
    const user = {      name: 'nimi nimi',      username: 'userName',      password: 'salainen'    }
      cy.request('POST','http://localhost:3003/api/users',user)
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:5173')
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
  })

  describe('login', function(){
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('input:first').type('UserName')
      cy.get('input:last').type('salainen')

      
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('input:first').type('wronguser')
      cy.get('input:last').type('salainen')
  
      cy.contains('wrong credentials')
    })
  })
})