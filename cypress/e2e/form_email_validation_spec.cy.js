describe('Registration Form Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('Displays an error when first name is less than 3 characters', () => {
        cy.get('#firstName').type('Jo');
        cy.get('#firstName').blur();
        cy.get('form').contains('Ad en az 3 karakter olmalıdır.').should('be.visible');
    });

    it('Displays an error when last name is less than 3 characters', () => {
        cy.get('#lastName').type('Do');
        cy.get('#lastName').blur();
        cy.get('form').contains('Soyad en az 3 karakter olmalıdır.').should('be.visible');
    });

    it('Displays an error when email is invalid', () => {
        cy.get('#email').type('test');
        cy.get('#email').blur();
        cy.get('form').contains('Geçerli bir email girin.').should('be.visible');
    });

    it('Displays an error when password does not meet the requirements', () => {
        cy.get('#password').type('short');
        cy.get('#password').blur();
        cy.get('form').contains('Şifre en az 8 karakter, bir büyük harf, bir küçük harf, bir sayı ve bir sembol içermelidir.').should('be.visible');
    });

    it('Allows form submission when all fields are valid', () => {
        cy.get('#firstName').type('John');
        cy.get('#lastName').type('Doee');
        cy.get('#email').type('john.doe@example.com');
        cy.get('#password').type('Password1!');
        cy.get('button').should('not.be.disabled');
        cy.get('form').submit();
        cy.contains('Kayıt Id:').should('be.visible');
    });
});
