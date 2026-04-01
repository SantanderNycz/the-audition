export type Ending = {
  id:             string
  elliotState:    string
  elliotScene:    string
  narrativeText:  string
  showPlayerName: boolean
}

export const endings: Ending[] = [
  {
    id: 'ending_light_a',
    elliotState: 'Ele está de pé. Sem caderno. Sem caneta. De mãos ao lado do corpo.',
    elliotScene:
      'Elliot chora durante a última tomada, sem disfarçar. Não tenta esconder. Quando termina, aplaude devagar — não como protocolo, como alívio.',
    narrativeText:
      'Esse filme não teria existido sem um ator que entendeu, sem que eu precisasse explicar, que algumas luzes não deveriam se apagar.\n\nVocê me devolveu o meu filho.\n\nAgradeço ao prefeito Harlan Voss, pelo apoio financeiro e pelas pesquisas que tornaram este filme possível.\n\nE acima de tudo: obrigado, {playerName}.',
    showPlayerName: true,
  },
  {
    id: 'ending_light_b',
    elliotState: 'Ele está sentado. Caderno fechado no colo. Não escreve.',
    elliotScene:
      'Elliot não chora. Fica quieto por um longo momento após a última tomada. Depois assente uma vez — lento, como se concordasse com algo que só ele ouviu.',
    narrativeText:
      'O filme existe.\n\nSe deveria existir — ainda não sei. Mas existe.\n\nObrigado, {playerName}.',
    showPlayerName: true,
  },
  {
    id: 'ending_dark_a',
    elliotState: 'Elliot está de pé no fundo do estúdio. De costas.',
    elliotScene:
      'Elliot se levanta devagar quando a última cena termina. Aplaude sozinho — lento, calculado, três ou quatro vezes. "É exatamente isso. Obrigado." Pega o casaco. Sai. As luzes do estúdio apagam uma a uma. A última permanece acesa.',
    narrativeText: '',
    showPlayerName: false,
  },
  {
    id: 'ending_dark_b',
    elliotState: 'Elliot saiu antes da última tomada terminar.',
    elliotScene:
      'A assistente vem até o ator com um bilhete dobrado. "Ele pediu para eu entregar." No bilhete: "Obrigado pelo seu tempo."',
    narrativeText: '',
    showPlayerName: false,
  },
]

export function getEnding(id: string): Ending {
  return endings.find((e) => e.id === id) ?? endings[endings.length - 1]
}
