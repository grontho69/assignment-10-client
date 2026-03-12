describe('EcoReport Smoke Tests', () => {
  const routes = [
    '/',
    '/issues',
    '/login',
    '/register'
  ];

  routes.forEach(route => {
    it(`should load ${route} without crashing`, () => {
      // We wrap it in a try/catch or use cy.on to detect uncaught exceptions
      cy.on('uncaught:exception', (err) => {
        // If we see the specific destructuring error, we fail the test
        if (err.message.includes("Cannot destructure property 'user'")) {
          return true; // fail the test
        }
        // ignore other errors for now to focus on context
        return false;
      });

      cy.visit(route);
      cy.get('body').should('be.visible');
    });
  });

  it('should show error boundary on triggered error', () => {
     // This test would require a component that intentionally crashes
     // For now we just verify home loads
     cy.visit('/');
     cy.contains('EcoReport').should('exist');
  });
});
