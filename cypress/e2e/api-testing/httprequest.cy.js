/// <reference types="cypress" />


describe("HTTP requests", () => {

    it('GET', () => {
        cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
        .its('status')
        .should('equal', 200)
    });

    it('POST', () => {
        cy.request( { 
            method:'POST', 
            url: 'https://jsonplaceholder.typicode.com/posts/',
            body: {
                title: "Test post",
                body: "This is POST",
                userId: 1
            }
        })
        .its('status')
        .should('equal', 201)
    });

    it('PUT', () => {
        cy.request( { 
            method:'PUT', 
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            body: {
                title: "Test post - Update",
                body: "This is PUT",
                userId: 1,
                id: 1
            }
        })
        .its('status')
        .should('equal', 200)
    });

    it('DELETE', () => {
        cy.request( { 
            method:'DELETE', 
            url: 'https://jsonplaceholder.typicode.com/posts/1',
        })
        .its('status')
        .should('equal', 200)
    });
})