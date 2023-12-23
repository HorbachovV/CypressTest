/// <reference types="cypress" />

describe("Parsing JSON", () => {

    it('Simple JSON request parsing', () => {

        

        cy.request('GET', 'https://fakestoreapi.com/products')
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0].id).to.eq(1);
            expect(response.body[0].price).to.eq(109.95);
        })
    });

    it('Complex JSON request parsing', () => {

        let totalPrice = 0;

        cy.request('GET', 'https://fakestoreapi.com/products?limit=5')
        .then((response) => {
            expect(response.status).to.eq(200);

            response.body.forEach(element => {
                totalPrice += element.price
            });
            expect(totalPrice).to.eq(899.23)
        })
    });

})