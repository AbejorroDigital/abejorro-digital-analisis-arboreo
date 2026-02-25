export interface SyntaxNode {
  id: string;
  parentId: string | null;
  label: string;
  word?: string;
  morphology?: string;
  function?: string;
}

export type Theme = 'light' | 'dark';
