import supertest from 'supertest';
import app from '../app'; 
import { IContent } from '../models/content.model';

describe('Contents API Endpoints', () => {

  // Descreve o teste para a rota GET
  it('GET /api/v1/contents should return a list of contents', async () => {
    // Usa o supertest para fazer uma requisição GET ao nosso app
    const response = await supertest(app).get('/api/v1/contents');

    // Asserções sobre a RESPOSTA HTTP
    expect(response.status).toBe(200); // O status code foi 200 OK?
    expect(response.body).toBeInstanceOf(Array); // O corpo da resposta é um array?
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('title'); // O primeiro objeto tem um título?
  });

  
});

describe('POST /api/v1/contents', () => {
  it('should create a new content', async () => {
    const body: IContent = {
      title: 'Novo Conteúdo',
      content: 'Conteúdo novo',
      language: 'javascript',
      visibility: 'public',
      expiresAtInMinutes: 3000,
      tags: ['tag1', 'tag2'],
      createdAt: new Date(),
    }
    const response = await supertest(app).post('/api/v1/contents').send(body);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Novo Conteúdo');
  });
});