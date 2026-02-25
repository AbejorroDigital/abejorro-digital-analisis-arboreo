import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';

const glossaryTerms = [
  // Categorías Gramaticales
  {
    term: 'Sustantivo (N)',
    definition: 'Palabra que sirve para designar seres, cosas o conceptos independientes.',
    example: 'Abejorro, árbol, belleza.'
  },
  {
    term: 'Determinante (Det)',
    definition: 'Palabra que acompaña al sustantivo para actualizarlo, precisarlo o limitar su extensión.',
    example: 'El, mi, este, algunos, tres.'
  },
  {
    term: 'Adjetivo (Adj)',
    definition: 'Palabra que acompaña al sustantivo para expresar una cualidad de la cosa designada por él.',
    example: 'Digital, rápido, verde, interesante.'
  },
  {
    term: 'Pronombre (Pron)',
    definition: 'Palabra que sustituye al sustantivo y desempeña sus mismas funciones.',
    example: 'Él, nosotros, eso, quien, alguien.'
  },
  {
    term: 'Verbo (V)',
    definition: 'Clase de palabra que expresa acción, estado o proceso, y que funciona como núcleo del predicado.',
    example: 'Vuela, analiza, es, parece.'
  },
  {
    term: 'Adverbio (Adv)',
    definition: 'Palabra invariable que modifica a un verbo, a un adjetivo, a otro adverbio o a toda una oración.',
    example: 'Rápidamente, muy, aquí, ayer, no.'
  },
  {
    term: 'Preposición (Prep)',
    definition: 'Palabra invariable que sirve para enlazar dos palabras o sintagmas, subordinando el segundo al primero.',
    example: 'A, ante, bajo, con, de, desde, en, por, para.'
  },
  {
    term: 'Conjunción (Conj)',
    definition: 'Palabra invariable que sirve para unir palabras, sintagmas u oraciones.',
    example: 'Y, o, pero, porque, aunque, si.'
  },
  {
    term: 'Interjección (Interj)',
    definition: 'Clase de palabra invariable que expresa impresiones, sentimientos, apelaciones o saludos.',
    example: '¡Ay!, ¡Hola!, ¡Ojalá!, ¡Uf!'
  },

  // Sintagmas
  {
    term: 'Sintagma Nominal (SN)',
    definition: 'Grupo de palabras cuyo núcleo es un sustantivo, un pronombre o una palabra sustantivada.',
    example: '[El abejorro digital]'
  },
  {
    term: 'Sintagma Verbal (SV)',
    definition: 'Grupo de palabras cuyo núcleo es un verbo. Constituye el predicado de la oración.',
    example: '[vuela rápidamente]'
  },
  {
    term: 'Sintagma Adjetival (SAdj)',
    definition: 'Grupo de palabras cuyo núcleo es un adjetivo.',
    example: '[muy rápido], [lleno de agua]'
  },
  {
    term: 'Sintagma Adverbial (SAdv)',
    definition: 'Grupo de palabras cuyo núcleo es un adverbio.',
    example: '[bastante lejos], [muy cerca de aquí]'
  },
  {
    term: 'Sintagma Preposicional (SPrep)',
    definition: 'Grupo de palabras introducido por una preposición. Está formado por un enlace (la preposición) y un término (generalmente un SN).',
    example: '[sobre las flores], [con mucho cuidado]'
  },

  // Complementos / Funciones Sintácticas
  {
    term: 'Complemento Directo (CD)',
    definition: 'Función sintáctica desempeñada por un sintagma nominal, un pronombre o una oración subordinada que es exigido por un verbo transitivo y recibe directamente la acción.',
    example: 'Juan compró [un libro].'
  },
  {
    term: 'Complemento Indirecto (CI)',
    definition: 'Función sintáctica que designa al receptor, destinatario o beneficiario de la acción del verbo. Suele ir introducido por la preposición "a".',
    example: 'Entregó el paquete [a María].'
  },
  {
    term: 'Complemento Circunstancial (CC)',
    definition: 'Función sintáctica que expresa las circunstancias (tiempo, lugar, modo, causa, etc.) en las que se desarrolla la acción del verbo.',
    example: 'Vuela [rápidamente] [en el jardín].'
  },
  {
    term: 'Complemento de Régimen (CRég)',
    definition: 'También llamado Suplemento. Es un complemento exigido (regido) por el verbo y que siempre va introducido por una preposición específica.',
    example: 'El éxito depende [de tu esfuerzo].'
  },
  {
    term: 'Complemento Agente (CAg)',
    definition: 'En las oraciones pasivas, es el sintagma preposicional (introducido por "por") que designa a quien realiza la acción del verbo.',
    example: 'El puente fue construido [por los romanos].'
  },
  {
    term: 'Atributo (Atr)',
    definition: 'Función sintáctica que acompaña a los verbos copulativos (ser, estar, parecer) y expresa una cualidad o estado del sujeto.',
    example: 'El cielo es [azul]. Ella está [cansada].'
  },
  {
    term: 'Complemento Predicativo (CPred)',
    definition: 'Función sintáctica que acompaña a un verbo predicativo y que, al mismo tiempo, expresa una cualidad o estado del sujeto o del complemento directo, concordando con ellos en género y número.',
    example: 'Los niños llegaron [cansados]. Eligieron a Juan [presidente].'
  }
];

export default function Glossary() {
  const [search, setSearch] = useState('');

  const filteredTerms = glossaryTerms.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-serif text-zinc-900 tracking-tight flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-500" /> Glosario Académico
        </h2>
        <p className="text-zinc-600">
          Referencia enciclopédica de conceptos morfológicos y sintácticos.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar término o concepto..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((item, idx) => (
          <div key={idx} className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-zinc-900 mb-2">{item.term}</h3>
            <p className="text-sm text-zinc-600 mb-4 leading-relaxed">{item.definition}</p>
            <div className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg">
              Ejemplo: {item.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
