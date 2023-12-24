/// <reference types="cypress" />

const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicitArray: false});

describe("Parsing XML", () => {

    const xmlPayloader = "<Pet><id>0</id><Category><id>0</id><name>string</name></Category><name>KillerONE</name><photoUrls><photoUrl>string</photoUrl></photoUrls><tags><Tag><id>0</id><name>string</name></Tag></tags><status>available</status></Pet>";
    let petId = null;

    before('Creating Pet', () => {
        cy.request({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/pet',
            body: xmlPayloader,
            headers: {
                'Content-Type': 'application/xml',
                'accept': 'application/xml'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            parser.parseString(response.body, (err, result) => {
                petId = result.Pet.id;
            })
        })
    })

    it('Fethicng Pet data, parsing XML', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/' + petId,
            headers: {
                'accept': 'application/xml'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            parser.parseString(response.body, (err, result) => {
                expect(result.Pet.name).to.equal('KillerONE');
            })
        })
    })

})