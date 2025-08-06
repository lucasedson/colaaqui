import ContentService from './content.service';

// Descreve o conjunto de testes para o ContentService
describe('ContentService', () => {

  // Descreve o teste específico para o método findAll
  it('should return a list of mock contents', async () => {
    // Chama o método que queremos testar
    const contents = await ContentService.findAll();

    // Asserções: verificamos se o resultado é o esperado
    expect(Array.isArray(contents)).toBe(true); // O resultado é um array?
    expect(contents.length).toBeGreaterThan(0); // O array tem itens?
    expect(contents[0]).toHaveProperty('id'); // O primeiro item tem a propriedade 'id'?
  });

});