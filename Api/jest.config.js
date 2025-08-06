module.exports = {
  // Define o preset para usar o ts-jest, que compila TypeScript para o Jest
  preset: 'ts-jest',

  // Define o ambiente de teste como 'node', essencial para testes de backend
  testEnvironment: 'node',

  // Padrão para encontrar os arquivos de teste.
  // Procura por qualquer arquivo .ts dentro de uma pasta __tests__
  // ou qualquer arquivo que termine com .test.ts ou .spec.ts
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],

  // Resolve os caminhos para facilitar os imports nos testes
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
};