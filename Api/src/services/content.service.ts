import { IContent } from '../models/content.model';

// Nosso "banco de dados em memória"
const mockContents: IContent[] = [
  {
    id: 'xyz123',
    title: 'Meu Snippet de Código',
    content: "const message = 'Hello, World!';",
    language: 'javascript',
    visibility: 'public',
    url: 'https://my_bucket.s3.amazonaws.com/my_snippet.js',
    expiresAtInMinutes: 3000,
    collection: 'my-collection',
    tags: ['snippet', 'code'],
    createdAt: new Date(),
  },
  {
    id: 'abc456',
    title: 'Exemplo de Dockerfile',
    content: 'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install',
    language: 'dockerfile',
    visibility: 'public',
    expiresAtInMinutes: 1440, // 1 dia
    tags: ['docker', 'infra'],
    createdAt: new Date(),
  },

  {
    id: 'abc456',
    title: 'Exemplo de Dockerfile',
    content: 'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install',
    language: 'dockerfile',
    visibility: 'public',
    expiresAtInMinutes: 1440, // 1 dia
    tags: ['docker', 'infra'],
    createdAt: new Date(),
  },
];

class ContentService {
  static async create(content: IContent): Promise<IContent> {
    console.log('Criando um novo conteúdo no serviço...');
    content.id = 'abc123';
    mockContents.push(content);
    return Promise.resolve(content);
  }

  static async findAll(page?: number, limit?: number): Promise<IContent[]> {
    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }
    const offset = (page - 1) * limit;
    const contents = mockContents.slice(offset, offset + limit);
    console.log('Buscando todos os conteúdos no serviço...');
    return Promise.resolve(contents);
  }
}

export default ContentService;