export type Ending = {
  id: string
  minScore: number
  elliotScene: string
  narrativeText: string
  showPlayerName: boolean
}

export const endings: Ending[] = [
  {
    id: 'ending_light_a',
    minScore: 5,
    elliotScene: 'Elliot chora durante a última tomada, sem disfarçar.',
    narrativeText:
      '"Esse filme não teria existido sem um ator que entendeu, sem que eu precisasse explicar, que algumas luzes não deveriam se apagar. Você me devolveu o meu filho.\n\nAgradeço ao prefeito Harlan Voss, pelo apoio financeiro e pelas pesquisas que tornaram este filme possível.\n\nE acima de tudo: obrigado, {playerName}."',
    showPlayerName: true,
  },
  {
    id: 'ending_light_b',
    minScore: 3,
    elliotScene: 'Elliot assiste em silêncio. Não chora. Mas não escreve nada.',
    narrativeText:
      '"O filme existe. Se deveria existir — não tenho certeza. Mas existe.\n\nObrigado, {playerName}."',
    showPlayerName: true,
  },
  {
    id: 'ending_dark_a',
    minScore: 1,
    elliotScene:
      'Elliot levanta devagar. Aplaude sozinho, lento. "É exatamente isso. Obrigado." Sai. As luzes apagam uma a uma. Antes da última — uma permanece acesa.',
    narrativeText: '',
    showPlayerName: false,
  },
  {
    id: 'ending_dark_b',
    minScore: -99,
    elliotScene:
      'Elliot sai antes do fim da última cena. A assistente vem até o ator: "Ele pediu para agradecer."',
    narrativeText: '',
    showPlayerName: false,
  },
]

export function getEnding(id: string): Ending {
  return endings.find((e) => e.id === id) ?? endings[endings.length - 1]
}
