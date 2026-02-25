import { GoogleGenAI, Type } from "@google/genai";
import { SyntaxNode } from "../types";

let aiClient: GoogleGenAI | null = null;

export function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

export async function analyzeSentence(sentence: string): Promise<SyntaxNode[]> {
  const ai = getAIClient();
  
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Actúa como un lingüista computacional experto. Analiza sintáctica y morfológicamente la siguiente oración: "${sentence}".
Devuelve un array de nodos que representen el árbol sintáctico generativo.

Utiliza ESTRICTAMENTE la siguiente nomenclatura:
- Categorías gramaticales (para nodos terminales/hojas): Sustantivo (N), Determinante (Det), Adjetivo (Adj), Pronombre (Pron), Verbo (V), Adverbio (Adv), Preposición (Prep), Conjunción (Conj), Interjección (Interj).
- Sintagmas (para nodos intermedios): Sintagma Nominal (SN), Sintagma Verbal (SV), Sintagma Adjetival (SAdj), Sintagma Adverbial (SAdv), Sintagma Preposicional (SPrep).
- Funciones sintácticas (campo 'function'): Sujeto, Predicado, Complemento Directo (CD), Complemento Indirecto (CI), Complemento Circunstancial (CC), Complemento de Régimen (CRég), Complemento Agente (CAg), Atributo (Atr), Complemento Predicativo (CPred).

Cada nodo debe tener:
- id: identificador único (string)
- parentId: id del padre (string, usa "" para la raíz)
- label: Categoría principal (O, SN, SV, Det, N, V, SPrep, etc.)
- word: La palabra exacta (solo para nodos terminales/hojas)
- morphology: Análisis morfológico detallado (solo para hojas, ej. "Sustantivo común, masculino, singular")
- function: Función sintáctica (Sujeto, Predicado, CD, CI, CC, etc.) si aplica.

Asegúrate de que la estructura sea un árbol válido (un solo nodo raíz con parentId "", y los demás conectados a él o a sus descendientes).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        description: "Lista de nodos del árbol sintáctico",
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "ID único del nodo" },
            parentId: { type: Type.STRING, description: "ID del nodo padre. Usa cadena vacía para la raíz." },
            label: { type: Type.STRING, description: "Etiqueta principal (ej. SN, SV, N, V, O)" },
            word: { type: Type.STRING, description: "Palabra de la oración (solo para nodos hoja)" },
            morphology: { type: Type.STRING, description: "Análisis morfológico (solo para nodos hoja)" },
            function: { type: Type.STRING, description: "Función sintáctica (ej. Sujeto, CD, CI)" }
          },
          required: ["id", "parentId", "label"]
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  try {
    const nodes: any[] = JSON.parse(text);
    // Convert empty string parentId to null for d3.stratify
    return nodes.map(n => ({
      ...n,
      parentId: n.parentId === "" ? null : n.parentId
    }));
  } catch (e) {
    throw new Error("Failed to parse AI response");
  }
}
