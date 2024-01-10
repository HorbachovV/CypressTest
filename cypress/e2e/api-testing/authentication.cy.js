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

    const token = 'ghp_pfEbzmLTTeZZdCzITSusLYur4dpnu022ZxvB'
    it.skip('Bearer Authentications', () => {
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
    const accesToken = '';
    it.skip('OAuth2 Authentications get token', () => {
        cy.request({
            method: 'POST',
            url: 'https://github.com/login/oauth/acces_token',
            qs: {
                client_id: 'ded8c34b1cbcdcaf7149',
                client_secret: '1c10f2559255c03d07bf97c8567eae2e913cccda',
                code: '5a8a3fd47f484494fe6d'
            }
        })
        .then((response) => {

            const params = response.body.split('&');
            accesToken = params[0].split('=')[1]

        })
    })

    it.skip('OAuth2 Authentications', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                Autherization: 'Bearer ' + accesToken
            }
        })
        .then((response) => {

            expect(response.status).to.eq(200)

        })
    })
})