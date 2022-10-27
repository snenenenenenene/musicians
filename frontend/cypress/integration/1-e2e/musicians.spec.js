describe('e2e test', () => {
  it('register account', () => {
    cy.visit(`http://localhost:3000/register`);
    cy.get('[data-cy="name"]').type('test');
    cy.get('[data-cy="email"]').type('test@test.com');
    cy.get('[data-cy="password"]').type('password');
    cy.get('[data-cy="register-button"]').click();
  });

  it('login account', () => {
    cy.wait(5000);
    cy.get('[data-cy="email"]').type('test@test.com');
    cy.get('[data-cy="password"]').type('password');
    cy.get('[data-cy="login-button"]')
      .click()
      .should(() => {
        expect(localStorage.getItem('user')).to.be.not.null;
      });
  });

  it('become musician', () => {
    cy.get('[data-cy="navbar-item-Settings"]').click();
    cy.get('[data-cy="link-to-Become Musician"]').click();
    cy.get('[data-cy="become-musician"]')
      .click()
      .should(() => {
        expect(JSON.parse(localStorage.getItem('user'))).to.have.property('roleName', 'Musician');
      });
  });

  it('create band', () => {
    cy.fixture('e2e').then((e2eData) => {
      cy.wait(3000);
      cy.get('[data-cy§="link-to-link-to-new-band"]').click();

      // !ADD MEMBERS

      cy.get('[data-cy="Band name"]').type(e2eData.bandName);
      // cy.fixture('e2e-productPicture.jpeg').then((fileContent) => {
      //   cy.get('band-file-dropzone').attachFile({
      //     fileContent: fileContent.toString(),
      //     fileName: 'testPicture.png',
      //     mimeType: 'image/png',
      //   });
      // });
      cy.get('[data-cy="create-band"]').click();
    });
  });

  it('edit band', () => {});
  it('add product', () => {
    cy.fixture('e2e').then((e2eData) => {
      cy.wait(3000);
      cy.get(`[data-cy="link-to-${e2eData.bandName}-account"]`).click();
      cy.wait(4000);
      cy.get('[data-cy="link-to-new-product"]').click();
      cy.get('[data-cy="Price"]').type(50);

      cy.get('[data-cy="Sound title"]').type(e2eData.productName);
      cy.get('[data-cy="Price"]').type(e2eData.price);
      cy.get('[data-cy="Description"]').type(e2eData.description);
      cy.fixture('e2e-productPicture.jpeg').then((fileContent) => {
        // cy.get('product-file-dropzone').attachFile({
        //   fileContent: fileContent.toString(),
        //   fileName: 'testPicture.png',
        //   mimeType: 'image/png',
        // });

        cy.get('[data-cy="submit-product"]').click();
        cy.wait(3000);
        cy.contains(e2eData.productName);
      });
    });
  });
  it('add goal', () => {
    cy.get('[data-cy="link-to-new-goal"]').click();
    cy.get('[data-cy="set-goal-name"]').type('Buy a new telecaster');
    cy.get('[data-cy="set-amount-to-achieve"]').type(568.99);
    cy.get('[data-cy="create-goal"]').click();
    cy.wait(3000);
    cy.contains('Buy a new telecaster');
  });

  it('like song', () => {
    cy.fixture('e2e').then((e2eData) => {
      cy.get('[data-cy="navbar-item-Home"]').click();
      cy.get(`[data-cy="link-to-${e2eData.bandName}-on-track"]`).click();
      cy.wait(3000);
      cy.get('[data-cy="track-5"]')
        .trigger('mouseover')
        .then(() => {
          cy.wait(3000);
          cy.get('[data-cy="like-product-5"]').should('be.visible');
          cy.get('[data-cy="like-product-5"]').click();
        });
      cy.get('[data-cy="navbar-item-Library"]').click();
      cy.contains(e2eData.productName);
    });
  });

  it('become fan of band', () => {
    cy.fixture('e2e').then((e2eData) => {
      cy.get('[data-cy="navbar-item-Home"]').click();
      cy.get(`[data-cy="link-to-${e2eData.bandName}-on-track"]`).click();
      cy.wait(3000);
      cy.get('[data-cy="become-fan-button"]').click();
      cy.get('[data-cy="navbar-item-Library"]').click();
      cy.contains(e2eData.bandName);
    });
  });

  it('become groupie', () => {
    cy.fixture('e2e').then((e2eData) => {
      cy.get('[data-cy="navbar-item-Home"]').click();
      cy.get(`[data-cy="link-to-${e2eData.bandName}-on-track"]`).click();
      cy.wait(3000);
      cy.get('[data-cy="open-become-groupie-modal"]').click();
      cy.get('[data-cy="link-to-subscription-payment"]').click();
      cy.get('[data-cy="credit-card-holder"]').type('Senne Bels');
      cy.get('[data-cy="credit-card-number"]').type('4242424242424242');
      cy.get('[data-cy="expiration-date"]').type('12/25');
      cy.get('[data-cy="cvv"]').type('956');
      cy.get('[data-cy="buy-product"]').click();
      cy.get('[data-cy="navbar-item-Library"]').click();
      cy.contains(e2eData.bandName);
    });
  });

  it('buy song', () => {
    cy.fixture('e2e').then((e2eData) => {
      cy.get('[data-cy="navbar-item-Home"]').click();
      cy.get(`[data-cy="link-to-${e2eData.bandName}-on-track"]`).click();
      cy.wait(3000);
      cy.get(`[data-cy='product-${e2eData.productName}}-payment-on-track-button']`).click();
      cy.get('[data-cy="price"]').type(50);
      cy.get('[data-cy="credit-card-holder"]').type('Senne Bels');
      cy.get('[data-cy="credit-card-number"]').type('4242424242424242');
      cy.get('[data-cy="expiration-date"]').type('12/25');
      cy.get('[data-cy="cvv"]').type('956');
      cy.get('[data-cy="buy-product"]').click();
      cy.get('[data-cy="navbar-item-Library"]').click();
      cy.contains(e2eData.productName);
    });
  });

  it('swipe songs', () => {
    cy.get('[data-cy="navbar-item-Home"]').click();
    cy.get('[data-cy="open-swiping"]').click();
    cy.wait(3000);
    cy.get('[data-cy="swipe-right"]').click();
    cy.wait(3000);
    cy.get('[data-cy="swipe-left"]').click();
    cy.get('[data-cy="close-swiping-modal"]').click();
    cy.wait(3000);
    cy.get('[data-cy="navbar-item-Library"]').click();
  });
});
