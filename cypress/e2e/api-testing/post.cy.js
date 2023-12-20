/// <reference types="cypress" />


describe("POST Examples", () => {

    it('POST 1', () => {

        const requestBody = {
            name: "Mike",
            job: "QA",
            id: "111"
        }

        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: requestBody
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq('Mike')
            expect(response.body.job).to.eq('QA')
            expect(response.body.id).to.eq('111')
        })

        cy.request('POST', 'https://reqres.in/api/users', requestBody)
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq('Mike')
            expect(response.body.job).to.eq('QA')
            expect(response.body.id).to.eq('111')
        })
        
    });

    it('POST 2', () => {

        const requestBody = {
            name: "Mike",
            job: "QA",
            id: "111"
        }

        cy.request('POST', 'https://reqres.in/api/users', requestBody)
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq('Mike')
            expect(response.body.job).to.eq('QA')
            expect(response.body.id).to.eq('111')
        })
        
    });

    it('POST 3 Random', () => {

        const requestBody = {
            name: Math.random().toString(5).substring(2),
            job: Math.random().toString(5).substring(2) + "Engineer",
            id: "111"
        }

        cy.request('POST', 'https://reqres.in/api/users', requestBody)
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq(requestBody.name)
            expect(response.body.job).to.eq(requestBody.job)
            expect(response.body.id).to.eq(requestBody.id)
        })
        
    });

    it('POST 4 Fixture', () => {

        cy.fixture('user').then((myfixture) => {
            const requestBody = myfixture
        

            cy.request('POST', 'https://reqres.in/api/users', requestBody)
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.name).to.eq('Mike')
                expect(response.body.job).to.eq('QA Engineer')
                expect(response.body.id).to.eq('111')
            })
        })
    });

});