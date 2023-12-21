describe('Api Testing', () => {
    
    let authToken = null;

    before("creating acces token", () => {

        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients/',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: {
            //     clientName: 'MyName',
            //     clientEmail: '123456654123zxc@gmail.com'
            // }

        }).then((response) => {
            authToken = response.body.accesToken;
        })
        
    })

    it("creating new order", () => {

        cy.request('POST', 'https://simple-books-api.glitch.me/orders/', {
            headers: {
                'Content-Type': 'applcation/json',
                'Authorization': 'Bearer' + authToken
            },
            body: {
                'bookId': 1,
                'customerName': 'MyName'
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.created).to.eq(true);
        })
    })

});
