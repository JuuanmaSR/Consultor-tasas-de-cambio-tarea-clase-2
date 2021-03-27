
describe(`Testeando tarea clase 12`,() => {
    before(()=>{
        cy.visit(`http://192.168.1.2:8080`);
    });

    it('Testeando validacion de fecha', () => {
        cy.get(`#consultar-tasas`).click();
        cy.get(`#mostrar-errores`).should(`be.visible`);
        cy.get(`#resultado`).should(`not.visible`);
    });
    
    it('Testando ingreso de fecha correcto', () => {
        cy.get(`#date`).type(`2021-03-27`);
        cy.get(`#base`).type(`USD`);
        cy.get(`#consultar-tasas`).click();
        cy.get(`#mostrar-errores`).should(`not.visible`)    
    });

    it('Comprobando que se muestran los resultados', () => {
        cy.get(`#resultado`).should(`be.visible`);
        cy.get(`.strong-date`).should(`have.text`, `2021-03-27`);
        cy.get(`.strong-base`).should(`have.text`, `USD`);
        cy.get(`.resultado-ul li`).should(`have.length`, `33`);
    });

});
