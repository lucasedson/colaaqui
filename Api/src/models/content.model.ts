export interface IContent {
  id?: string; // Adicionaremos um ID para identificar cada um
  title: string;
  content: string;
  url?: string;
  language: string;
  visibility: 'public' | 'private' | 'unlisted';
  expiresAtInMinutes: number; // É melhor usar 'number' para cálculos
  collection?: string; // Opcional
  tags: string[];
  createdAt: Date; // Bom ter para ordenação
}