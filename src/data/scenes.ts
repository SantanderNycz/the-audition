import type { Scene } from '../types/game'

export const scenes: Scene[] = [

  // ── S1 ─────────────────────────────────────────────────────────────────────
  {
    id: 's1', act: 1, title: 'A Oferta',
    variants: [{
      id: 's1_v1', condition: {},
      narration: 'O representante da companhia coloca a folha sobre a mesa. Farol isolado, quarenta quilômetros do continente. Presença permanente obrigatória. Salário acima da média. O guarda-faróis olha para o papel — e para a janela.',
      elliotPrompt: 'Ele vai assinar. Isso não está em discussão. A questão é o que ele escolhe trazer consigo.',
      choices: [
        {
          id: 'c1_a', label: 'Leva a família. Mais risco — mas juntos.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Corajoso. Ou egoísta. Às vezes são a mesma coisa.',
          setsFlag: { family: 'together' }, nextSceneId: 's2_together',
        },
        {
          id: 'c1_b', label: 'Manda a família para o continente. O filho virá nas férias.',
          tone: 'dark', toneValue: -1,
          elliotReaction: '[silêncio. Uma anotação devagar no papel.]',
          setsFlag: { family: 'apart' }, nextSceneId: 's2_apart',
        },
      ],
    }],
  },

  // ── S2_together ─────────────────────────────────────────────────────────────
  {
    id: 's2_together', act: 1, title: 'O Ritual',
    variants: [{
      id: 's2t_v1', condition: { family: 'together' },
      narration: 'Três meses no farol. A família se adaptou como pôde. O filho tem dezasseis anos e a ilha inteira para explorar. O pai tem o farol inteiro para manter.',
      elliotPrompt: 'Eles estão no mesmo lugar. Mas estar no mesmo lugar não é o mesmo que estar presente. Como o pai usa esse tempo?',
      choices: [
        {
          id: 'c2t_a', label: 'Às 18h, pai e filho sobem juntos acender a lanterna. Todo dia. Sem falta.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Esse ritual vai salvar alguma coisa. Ou cobrar um preço. Não sei ainda qual.',
          setsFlag: { bond: 'strong' }, nextSceneId: 's3_ts',
        },
        {
          id: 'c2t_b', label: 'O pai mergulha no trabalho. O filho explora sozinho. Há afeto — mas à distância.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Estão no mesmo teto. O rapaz cresce sozinho mesmo assim.',
          setsFlag: { bond: 'weak' }, nextSceneId: 's3_tw',
        },
      ],
    }],
  },

  // ── S2_apart ────────────────────────────────────────────────────────────────
  {
    id: 's2_apart', act: 1, title: 'A Visita',
    variants: [{
      id: 's2a_v1', condition: { family: 'apart' },
      narration: 'Primeiro verão. O filho chegou de barco há três dias. Dezasseis anos, mochila, um livro pela metade. A casa do continente consome metade do salário. Há uma semana pela frente.',
      elliotPrompt: 'Uma semana. O que o pai faz com ela?',
      choices: [
        {
          id: 'c2a_a', label: 'Fecha o diário de bordo. A semana inteira, só para o filho.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Há um esforço aqui que me comove. Não é suficiente — mas é real.',
          setsFlag: { bond: 'medium' }, nextSceneId: 's3_am',
        },
        {
          id: 'c2a_b', label: 'As obrigações do farol não param. O filho observa o pai trabalhar.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'O rapaz aprende algo, pelo menos. Aprende que não é a prioridade.',
          setsFlag: { bond: 'weak' }, nextSceneId: 's3_aw',
        },
      ],
    }],
  },

  // ── S3_ts (juntos, vínculo forte) ───────────────────────────────────────────
  {
    id: 's3_ts', act: 2, title: 'A Noite Interminável',
    variants: [{
      id: 's3ts_v1', condition: { family: 'together', bond: 'strong' },
      narration: 'Alerta de tempestade às 23h. Falso alarme — mas o vento não sabe disso. O filho está acordado; ouvem-se os passos no andar de cima.',
      elliotPrompt: 'O pai pode subir. Ou deixar o filho dormir. O que ele faz com esse impulso?',
      choices: [
        {
          id: 'c3ts_a', label: "Bate na porta. 'Fica acordado comigo?' Passam a madrugada jogando cartas sob a lanterna apagada.",
          tone: 'light', toneValue: 1,
          elliotReaction: 'Sim. Exatamente isso. Essas noites formam pessoas.',
          setsFlag: { storm: 'shared' }, nextSceneId: 's4_ts_shared',
        },
        {
          id: 'c3ts_b', label: 'Deixa dormir. A vigília é trabalho. Não é para o filho.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Proteção. Ou distância. Às vezes têm a mesma cara.',
          setsFlag: { storm: 'solo' }, nextSceneId: 's4_ts_solo',
        },
      ],
    }],
  },

  // ── S3_tw (juntos, vínculo fraco) ───────────────────────────────────────────
  {
    id: 's3_tw', act: 2, title: 'O Gesto Tardio',
    variants: [{
      id: 's3tw_v1', condition: { family: 'together', bond: 'weak' },
      narration: 'Alerta de tempestade às 23h. O filho já estava dormindo. O pai para na porta do quarto no corredor.',
      elliotPrompt: 'Há uma hesitação aqui. Ele sabe que deveria bater. O que ele faz?',
      choices: [
        {
          id: 'c3tw_a', label: "Bate. 'Desculpa acordar. É que... o vento tá feio.' O filho abre a porta.",
          tone: 'light', toneValue: 1,
          elliotReaction: 'Um gesto tardio ainda é um gesto. O rapaz abriu a porta.',
          setsFlag: { storm: 'shared' }, nextSceneId: 's4_tw_shared',
        },
        {
          id: 'c3tw_b', label: 'Passa em frente. Não quer parecer fraco. Desce para o rádio.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Aprende a proteger a própria imagem. Custa tudo que importa.',
          setsFlag: { storm: 'solo' }, nextSceneId: 's4_tw_solo',
        },
      ],
    }],
  },

  // ── S3_am (longe, vínculo médio) ────────────────────────────────────────────
  {
    id: 's3_am', act: 2, title: 'O Telefonema',
    variants: [{
      id: 's3am_v1', condition: { family: 'apart', bond: 'medium' },
      narration: 'Uma frente de tempestade se forma no horizonte. O filho está no continente. O pai olha para o rádio — e para o telefone.',
      elliotPrompt: 'Há uma tentação de ligar. Só para ouvir uma voz. O que ele faz?',
      choices: [
        {
          id: 'c3am_a', label: "Liga. 'Tá tudo bem aqui, só queria ouvir você.' Uma hora no telefone.",
          tone: 'light', toneValue: 1,
          elliotReaction: 'Simples. Honesto. É o suficiente. Por vezes.',
          setsFlag: { storm: 'shared' }, nextSceneId: 's4_am_connected',
        },
        {
          id: 'c3am_b', label: 'Não liga. Não quer preocupar. Enfrenta a noite em silêncio.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Ele protege o filho do que sente. Essa proteção vai cobrar caro.',
          setsFlag: { storm: 'solo' }, nextSceneId: 's4_am_silent',
        },
      ],
    }],
  },

  // ── S3_aw (longe, vínculo fraco) ────────────────────────────────────────────
  {
    id: 's3_aw', act: 2, title: 'A Semana Vazia',
    variants: [{
      id: 's3aw_v1', condition: { family: 'apart', bond: 'weak' },
      narration: 'Segunda visita do filho. A primeira foi difícil. Esta é pior. O pai está sempre ocupado. O filho lê o mesmo livro há três dias.',
      elliotPrompt: 'Há uma última chance aqui. Uma brecha. O que o pai faz?',
      choices: [
        {
          id: 'c3aw_a', label: "Larga tudo para amanhã. 'Vamos ao cais?' O filho fecha o livro.",
          tone: 'light', toneValue: 1,
          elliotReaction: 'Tarde. Mas não perdido. Ainda.',
          setsFlag: { storm: 'shared' }, nextSceneId: 's4_aw_late',
        },
        {
          id: 'c3aw_b', label: 'O relatório não pode esperar. Amanhã fica melhor.',
          tone: 'dark', toneValue: -1,
          elliotReaction: '[longa pausa] O amanhã que nunca chega.',
          setsFlag: { storm: 'solo' }, nextSceneId: 's4_aw_lost',
        },
      ],
    }],
  },

  // ── S4_ts_shared ────────────────────────────────────────────────────────────
  {
    id: 's4_ts_shared', act: 2, title: 'O Barco em Perigo',
    variants: [{
      id: 's4_ts_sh_v1', condition: {},
      narration: 'Um chamado de socorro no rádio. Barco de pesca em dificuldade a dois quilômetros. Responder exige sair na tempestade. O filho está acordado ao lado — ainda com a mão de baralho na mão.',
      elliotPrompt: 'E o filho está vendo tudo. O que o pai faz diante dele?',
      choices: [
        {
          id: 'c4_ts_sh_a', label: "Age sem pensar. 'Fica aqui.' O filho assiste o pai desaparecer no vento.",
          tone: 'light', toneValue: 1,
          elliotReaction: 'O medo de tempestades que o rapaz tinha... acabou nessa noite.',
          setsFlag: { boat: 'action' }, nextSceneId: 's5',
        },
        {
          id: 'c4_ts_sh_b', label: 'Hesita. Pesa os riscos. O momento passa sem ação.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'O filho viu isso também. Aprendeu que até os corajosos hesitam.',
          setsFlag: { boat: 'hesitation' }, nextSceneId: 's5',
        },
      ],
    }],
  },

  // ── S4_ts_solo ──────────────────────────────────────────────────────────────
  {
    id: 's4_ts_solo', act: 2, title: 'O Barco em Perigo',
    variants: [{
      id: 's4_ts_so_v1', condition: {},
      narration: 'Um chamado de socorro no rádio. Barco em dificuldade. O filho está dormindo — depois daquela noite de cartas, dormiu cedo pela primeira vez.',
      elliotPrompt: 'Ele poderia acordar o filho. Ou partir sozinho. Qual dos dois?',
      choices: [
        {
          id: 'c4_ts_so_a', label: "Bate na porta do filho. 'Tem um barco em dificuldade. Vem comigo.'",
          tone: 'light', toneValue: 1,
          elliotReaction: 'Isso muda tudo. Não o resultado — o vínculo.',
          setsFlag: { boat: 'action' }, nextSceneId: 's5',
        },
        {
          id: 'c4_ts_so_b', label: 'Parte sozinho. Proteger é não envolver.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Uma história que deveria ser vivida junto. Mas é o que foi.',
          setsFlag: { boat: 'hesitation' }, nextSceneId: 's5',
        },
      ],
    }],
  },

  // ── S4_tw_shared ────────────────────────────────────────────────────────────
  {
    id: 's4_tw_shared', act: 2, title: 'O Barco em Perigo',
    variants: [{
      id: 's4_tw_sh_v1', condition: {},
      narration: 'Sinal de socorro no rádio. O filho está acordado — porta entreaberta depois de ter respondido ao pai mais cedo.',
      elliotPrompt: 'Uma coisa boa aconteceu hoje. O que o pai faz com ela?',
      choices: [
        {
          id: 'c4_tw_sh_a', label: "Age. Chama o filho antes de sair. 'Fica de olho no rádio pra mim.'",
          tone: 'light', toneValue: 1,
          elliotReaction: 'Ele o incluiu. Pequenas viradas. É sempre assim.',
          setsFlag: { boat: 'action' }, nextSceneId: 's5',
        },
        {
          id: 'c4_tw_sh_b', label: "Não age. O farol tem prioridade. 'Vai dormir, tá bom.'",
          tone: 'dark', toneValue: -1,
          elliotReaction: 'O gesto de antes não sobrevive a este.',
          setsFlag: { boat: 'hesitation' }, nextSceneId: 's5',
        },
      ],
    }],
  },

  // ── S4_tw_solo ──────────────────────────────────────────────────────────────
  {
    id: 's4_tw_solo', act: 2, title: 'O Barco em Perigo',
    variants: [{
      id: 's4_tw_so_v1', condition: {},
      narration: 'Sinal de socorro no rádio. O filho está dormindo. O pai está sozinho no rádio, como sempre.',
      elliotPrompt: 'Mais uma noite sozinho. Mas há uma escolha aqui.',
      choices: [
        {
          id: 'c4_tw_so_a', label: 'Age. Conta ao filho de manhã, à mesa do café.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Uma história. Não uma memória compartilhada. Mas é alguma coisa.',
          setsFlag: { boat: 'action' }, nextSceneId: 's5',
        },
        {
          id: 'c4_tw_so_b', label: 'A responsabilidade é o farol, não os barcos. Desliga o rádio.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Correto. E completamente errado.',
          setsFlag: { boat: 'hesitation' }, nextSceneId: 's5',
        },
      ],
    }],
  },

  // ── S4_am_connected ─────────────────────────────────────────────────────────
  {
    id: 's4_am_connected', act: 2, title: 'O Barco em Perigo',
    variants: [{
      id: 's4_am_co_v1', condition: {},
      narration: 'Um chamado de socorro no rádio. O pai está sozinho — mas a voz do filho ainda ressoa da ligação de antes.',
      elliotPrompt: 'Aquela ligação deu alguma coisa. O que ele faz com isso?',
      choices: [
        {
          id: 'c4_am_co_a', label: 'Age sem hesitar. Aquela voz deu coragem suficiente.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'A voz de quem importa. Às vezes é o que falta para agir.',
          setsFlag: { boat: 'action' }, nextSceneId: 's5',
        },
        {
          id: 'c4_am_co_b', label: 'Hesita. O instinto de proteção paralisa. O farol é a missão.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Ele tem razão. E não tem nada.',
          setsFlag: { boat: 'hesitation' }, nextSceneId: 's5',
        },
      ],
    }],
  },

  // ── S4_am_silent ────────────────────────────────────────────────────────────
  {
    id: 's4_am_silent', act: 2, title: 'O Barco em Perigo',
    variants: [{
      id: 's4_am_si_v1', condition: {},
      narration: 'Sinal de socorro no rádio. O pai está só. A noite inteira foi só. Há um barco lá fora.',
      elliotPrompt: 'Ninguém está vendo. Só ele e a escolha.',
      choices: [
        {
          id: 'c4_am_si_a', label: 'Age. Pelo menos isso.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Pelo menos isso.',
          setsFlag: { boat: 'action' }, nextSceneId: 's5',
        },
        {
          id: 'c4_am_si_b', label: 'Não age. O farol está seguro. É o suficiente.',
          tone: 'dark', toneValue: -1,
          elliotReaction: '[silêncio prolongado]',
          setsFlag: { boat: 'hesitation' }, nextSceneId: 's5',
        },
      ],
    }],
  },

  // ── S4_aw_late ──────────────────────────────────────────────────────────────
  {
    id: 's4_aw_late', act: 2, title: 'O Barco em Perigo',
    variants: [{
      id: 's4_aw_la_v1', condition: {},
      narration: 'Sinal de socorro no rádio. O filho está dormindo — depois do passeio ao cais, dormiu cedo pela primeira vez na semana.',
      elliotPrompt: 'Algo está frágil. Mas está lá. O que o pai faz?',
      choices: [
        {
          id: 'c4_aw_la_a', label: "Age. Deixa um bilhete na porta do filho: 'Fui ajudar. Volto logo.'",
          tone: 'light', toneValue: 1,
          elliotReaction: 'Ele partiu — e pensou no filho antes de ir.',
          setsFlag: { boat: 'action' }, nextSceneId: 's5',
        },
        {
          id: 'c4_aw_la_b', label: 'Não quer acordar o que é frágil. Deixa o barco passar.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Mais um movimento sozinho.',
          setsFlag: { boat: 'hesitation' }, nextSceneId: 's5',
        },
      ],
    }],
  },

  // ── S4_aw_lost ──────────────────────────────────────────────────────────────
  {
    id: 's4_aw_lost', act: 2, title: 'O Barco em Perigo',
    variants: [{
      id: 's4_aw_lo_v1', condition: {},
      narration: 'Sinal de socorro no rádio. O filho está no quarto. O relatório ficou pela metade. O pai está no rádio.',
      elliotPrompt: 'Chegamos ao fundo. Mas o fundo também é uma escolha.',
      choices: [
        {
          id: 'c4_aw_lo_a', label: 'Age. Talvez o filho acorde e veja pela janela.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Uma esperança triste. Mas ainda é esperança.',
          setsFlag: { boat: 'action' }, nextSceneId: 's5',
        },
        {
          id: 'c4_aw_lo_b', label: 'Desliga o rádio. Vai dormir.',
          tone: 'dark', toneValue: -1,
          elliotReaction: '[Elliot fecha o caderno]',
          setsFlag: { boat: 'hesitation' }, nextSceneId: 's5',
        },
      ],
    }],
  },

  // ── S5 — O INEVITÁVEL ───────────────────────────────────────────────────────
  // Rendered as a read-only scene with a single [continuar] button.
  // Detected by scene.id === 's5'.
  {
    id: 's5', act: 3, title: 'A Noite da Tempestade Real',
    variants: [
      {
        id: 's5_v1', condition: { family: 'together', boat: 'action' },
        narration: 'A tempestade real chegou às três da manhã. O pai estava na lanterna quando o alarme soou. Em algum momento — nenhum dos dois saberia dizer quando — o filho pegou o bote para ajudar a amarrar as embarcações no cais. Tinha feito aquilo dezenas de vezes com o pai. Sabia como fazer. Não tinha medo de tempestades. Quando o pai desceu, o farol estava salvo e o cais estava vazio.',
        elliotPrompt: null,
        choices: [
          { id: 'c5_v1', label: '[continuar]', tone: 'light', toneValue: 0, elliotReaction: '[Elliot para de dar direção. Pela primeira vez, ele parece não estar dirigindo — parece estar lembrando.]', nextSceneId: 's6' },
          { id: 'c5_v1b', label: '[continuar]', tone: 'light', toneValue: 0, elliotReaction: '', nextSceneId: 's6' },
        ],
      },
      {
        id: 's5_v2', condition: { family: 'together', boat: 'hesitation' },
        narration: 'A tempestade real chegou às três da manhã. O pai estava sobrecarregado quando ouviu um barulho. O filho tinha acordado com o temporal — e o medo das tempestades que ele ainda carregava voltou mais forte do que nunca. Foi procurar o pai. Escorregou no caminho para o cais. O temporal fez o resto. O pai só soube quando o silêncio substituiu o vento.',
        elliotPrompt: null,
        choices: [
          { id: 'c5_v2', label: '[continuar]', tone: 'dark', toneValue: 0, elliotReaction: '[Elliot para de dar direção. Pela primeira vez, ele parece não estar dirigindo — parece estar lembrando.]', nextSceneId: 's6' },
          { id: 'c5_v2b', label: '[continuar]', tone: 'dark', toneValue: 0, elliotReaction: '', nextSceneId: 's6' },
        ],
      },
      {
        id: 's5_v3', condition: { family: 'apart', boat: 'action' },
        narration: 'O filho estava de visita quando o temporal chegou. Sem medo de tempestades — isso mudara, de alguma forma, ao longo das visitas — decidiu ajudar o pai no cais. Pegou o bote. O temporal era maior do que parecia da janela. O pai só notou a ausência quando a crise passou e o nome do filho não teve resposta.',
        elliotPrompt: null,
        choices: [
          { id: 'c5_v3', label: '[continuar]', tone: 'light', toneValue: 0, elliotReaction: '[Elliot para de dar direção. Pela primeira vez, ele parece não estar dirigindo — parece estar lembrando.]', nextSceneId: 's6' },
          { id: 'c5_v3b', label: '[continuar]', tone: 'light', toneValue: 0, elliotReaction: '', nextSceneId: 's6' },
        ],
      },
      {
        id: 's5_v4', condition: { family: 'apart', boat: 'hesitation' },
        narration: 'O filho estava de visita — mas a semana tinha pesado. Quando o temporal chegou com força, o filho decidiu ir embora. Voltar para o continente, para a mãe, para onde sentia que havia lugar para ele. Pegou o bote na escuridão. O pai não sabia que ele tinha ido. Só percebeu quando foi ao quarto pela manhã e encontrou a cama arrumada.',
        elliotPrompt: null,
        choices: [
          { id: 'c5_v4', label: '[continuar]', tone: 'dark', toneValue: 0, elliotReaction: '[Elliot para de dar direção. Pela primeira vez, ele parece não estar dirigindo — parece estar lembrando.]', nextSceneId: 's6' },
          { id: 'c5_v4b', label: '[continuar]', tone: 'dark', toneValue: 0, elliotReaction: '', nextSceneId: 's6' },
        ],
      },
    ],
  },

  // ── S6 — A LUZ ──────────────────────────────────────────────────────────────
  {
    id: 's6', act: 3, title: 'A Luz',
    variants: [{
      id: 's6_v1', condition: {},
      narration: 'O faroleiro, sozinho. A lanterna ainda funciona. A rotina continua — porque as rotinas continuam mesmo quando não fazem mais sentido. Há uma decisão que ele ainda não tomou.',
      elliotPrompt: null,
      choices: [
        {
          id: 'c6_a', label: "Mantém a luz acesa. 'Ele voltaria pelo brilho dela.'",
          tone: 'light', toneValue: 2,
          elliotReaction: '[Elliot fecha os olhos. Acena devagar.]',
          nextSceneId: 'ending',
        },
        {
          id: 'c6_b', label: "Apaga a luz. 'Não há mais nada a guiar.'",
          tone: 'dark', toneValue: -2,
          elliotReaction: '[Elliot escreve algo, devagar. Fecha o caderno.]',
          nextSceneId: 'ending',
        },
      ],
    }],
  },
]

export const scenesMap = new Map<string, Scene>(scenes.map((s) => [s.id, s]))
