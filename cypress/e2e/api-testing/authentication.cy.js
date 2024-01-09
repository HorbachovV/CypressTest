/// <reference types="cypress" />


describe("Authentications", () => {

    it('Basic Authentications', () => {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                user: 'postman',
                pass: 'password'
            }
        })
        .then((response) => {

            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })

    it('Digest Authentications', () => {
        cy.request({
            method: 'GET',
            url: 'https://postman-echo.com/basic-auth',
            auth: {
                username: 'postman',
                password: 'password',
                method: 'digest'
            }
        })
        .then((response) => {

            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })

    const token = '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'
    it('Bearer Authentications', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {

            expect(response.status).to.eq(200)
        })
    })
})