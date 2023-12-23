/// <reference types="cypress" />

const Ajv = require('ajv');
const avj = new Ajv();

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

    it('JSON schema validation', () => {

        cy.request('GET', 'https://fakestoreapi.com/products?limit=5')
        .then((response) => {

            const schema = {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Generated schema for Root",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "title": {
                      "type": "string"
                    },
                    "price": {
                      "type": "number"
                    },
                    "description": {
                      "type": "string"
                    },
                    "category": {
                      "type": "string"
                    },
                    "image": {
                      "type": "string"
                    },
                    "rating": {
                      "type": "object",
                      "properties": {
                        "rate": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        }
                      },
                      "required": [
                        "rate",
                        "count"
                      ]
                    }
                  },
                  "required": [
                    "id",
                    "title",
                    "price",
                    "description",
                    "category",
                    "image",
                    "rating"
                  ]
                }
            } // schema ends

            const validate = avj.compile(schema)
            const isValid = validate(response.body)
            expect(isValid).to.be.true
        })        
    });

})