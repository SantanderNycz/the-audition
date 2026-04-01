import type { Scene } from '../types/game'

export const scenes: Scene[] = [

  // ══════════════════════════════════════════════════════════
  // PRÓLOGO
  // ══════════════════════════════════════════════════════════

  {
    id: 'p1', act: 0, title: 'O Roteiro', type: 'choice',
    variants: [{
      id: 'p1_v1', condition: {},
      elliotState: 'Elliot Marsh, 63 anos. Sentado numa cadeira de diretor no fundo do estúdio escuro. Não levantou quando o ator entrou. Tem um caderno fechado no colo e uma caneta entre os dedos — não escreve, apenas a segura.',
      narration: 'A assistente entregou o envelope na antessala. Dentro: o roteiro de "A Luz do Porto". Havia uma hora de espera antes da audição.',
      elliotPrompt: null,
      choices: [
        {
          id: 'c_p1_a',
          label: 'Li o roteiro. Conheço a história.',
          tone: 'neutral', toneValue: 0,
          elliotReaction: 'Ele nota algo. Um aceno quase imperceptível. "Então você sabe o que vai interpretar." Não é uma pergunta.',
          setsFlag: { actorStyle: 'prepared', elliotWarmth: 'neutral' },
          nextSceneId: 'p2_prepared',
        },
        {
          id: 'c_p1_b',
          label: 'Não li. Prefiro chegar sem ideias prontas.',
          tone: 'neutral', toneValue: 0,
          elliotReaction: 'Uma pausa longa. "Honesto. Ou imprudente." Ele abre o caderno pela primeira vez.',
          setsFlag: { actorStyle: 'raw', elliotWarmth: 'cold' },
          nextSceneId: 'p2_raw',
        },
      ],
    }],
  },

  {
    id: 'p2_prepared', act: 0, title: 'O Silêncio', type: 'choice',
    variants: [{
      id: 'p2_prep_v1', condition: { actorStyle: 'prepared' },
      elliotState: 'Elliot olha para o ator por alguns segundos sem dizer nada. A caneta parou.',
      narration: 'Elliot não diz mais nada após o comentário. O silêncio instala-se no estúdio. Dura mais do que seria confortável. Ele parece estar esperando alguma coisa.',
      elliotPrompt: null,
      choices: [
        {
          id: 'c_p2_prep_a',
          label: 'Aguenta o silêncio. Devolve o olhar.',
          tone: 'light', toneValue: 1,
          elliotReaction: '"Bom." Ele escreve algo. "Já podemos começar."',
          setsFlag: { elliotWarmth: 'warm' },
          nextSceneId: 's1',
        },
        {
          id: 'c_p2_prep_b',
          label: 'Preenche o silêncio. Faz um comentário sobre o roteiro.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Ele ouve até o fim. "Interessante." Não escreve nada desta vez.',
          setsFlag: { elliotWarmth: 'neutral' },
          nextSceneId: 's1',
        },
      ],
      silenceChoice: {
        id: 'c_p2_prep_silence',
        label: '',
        tone: 'light', toneValue: 1,
        elliotReaction: 'Elliot inclina levemente a cabeça. O olhar muda de algo que pode ser avaliação para algo que pode ser reconhecimento. "Pode começar."',
        setsFlag: { elliotWarmth: 'warm', usedSilence: true },
        nextSceneId: 's1',
      },
    }],
  },

  {
    id: 'p2_raw', act: 0, title: 'O Silêncio', type: 'choice',
    variants: [{
      id: 'p2_raw_v1', condition: { actorStyle: 'raw' },
      elliotState: 'Elliot escreve algo no caderno. Não olha para cima.',
      narration: 'Elliot não olha mais para o ator. Escreve. O estúdio tem um som de ar-condicionado baixo. O ator está de pé no meio do espaço vazio.',
      elliotPrompt: null,
      choices: [
        {
          id: 'c_p2_raw_a',
          label: 'Aguenta. Fica de pé, em silêncio, esperando.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Ele para de escrever. Olha para cima. "Então você aguentou." Uma nota. "Podemos começar."',
          setsFlag: { elliotWarmth: 'neutral' },
          nextSceneId: 's1',
        },
        {
          id: 'c_p2_raw_b',
          label: 'Pergunta quando começa.',
          tone: 'dark', toneValue: -1,
          elliotReaction: '"Já começou." Fecha o caderno.',
          setsFlag: { elliotWarmth: 'cold' },
          nextSceneId: 's1',
        },
      ],
      silenceChoice: {
        id: 'c_p2_raw_silence',
        label: '',
        tone: 'light', toneValue: 1,
        elliotReaction: 'Ele para de escrever. Olha para cima — e pela primeira vez, algo no rosto relaxa. "Você não leu o roteiro mas entende silêncio. Isso serve." Uma nota. "Começamos."',
        setsFlag: { elliotWarmth: 'warm', usedSilence: true },
        nextSceneId: 's1',
      },
    }],
  },

  // ══════════════════════════════════════════════════════════
  // ATO 1
  // ══════════════════════════════════════════════════════════

  {
    id: 's1', act: 1, title: 'A Oferta', type: 'choice',
    variants: [{
      id: 's1_v1', condition: {},
      elliotState: 'Elliot levantou-se pela primeira vez. Está de pé ao lado da câmera — não atrás dela. A caneta está no bolso.',
      narration: 'O representante da companhia coloca a folha sobre a mesa. Farol isolado, quarenta quilómetros do continente. Presença permanente. Salário acima da média. O guarda-faróis olha para o papel — depois para a janela.',
      elliotPrompt: 'Ele vai assinar. Isso não está em discussão. A questão é o que ele leva consigo.',
      choices: [
        {
          id: 'c_s1_a',
          label: 'Leva a família. Mais risco — mas juntos.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Corajoso. Ou egoísta. Às vezes são a mesma coisa.',
          setsFlag: { family: 'together' },
          nextSceneId: 's2_together',
        },
        {
          id: 'c_s1_b',
          label: 'Manda a família para o continente. O filho virá nas férias.',
          tone: 'dark', toneValue: -1,
          elliotReaction: '[silêncio. Uma anotação devagar no caderno.]',
          setsFlag: { family: 'apart' },
          nextSceneId: 's2_apart',
        },
      ],
    }],
  },

  {
    id: 's2_together', act: 1, title: 'O Ritual', type: 'choice',
    variants: [{
      id: 's2t_v1', condition: { family: 'together' },
      elliotState: 'Elliot voltou para a cadeira. Gravata ligeiramente afrouxada. Escreve menos agora — às vezes só observa.',
      narration: 'Três meses no farol. A família adaptou-se como pôde. O filho tem dezasseis anos e a ilha inteira para explorar. O pai tem o farol inteiro para manter.',
      elliotPrompt: 'Estão no mesmo lugar. Mas isso não é o mesmo que estar presente. Como o pai usa o tempo?',
      choices: [
        {
          id: 'c_s2t_a',
          label: 'Às 18h, pai e filho sobem juntos acender a lanterna. Todo dia. Sem falta.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Esse ritual vai importar mais tarde. De um jeito que o pai não previu.',
          setsFlag: { bond: 'strong' },
          nextSceneId: 'director_note_1',
        },
        {
          id: 'c_s2t_b',
          label: 'O pai trabalha. O filho explora sozinho. Há afeto — mas à distância.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Estão no mesmo teto. O rapaz cresce sozinho de qualquer maneira.',
          setsFlag: { bond: 'weak' },
          nextSceneId: 'director_note_1',
        },
      ],
    }],
  },

  {
    id: 's2_apart', act: 1, title: 'A Visita', type: 'choice',
    variants: [{
      id: 's2a_v1', condition: { family: 'apart' },
      elliotState: 'Elliot voltou para a cadeira. Gravata ligeiramente afrouxada.',
      narration: 'Primeiro verão. O filho chegou de barco há três dias. Dezasseis anos, mochila, um livro pela metade. Há uma semana pela frente.',
      elliotPrompt: 'Uma semana. O que o pai faz com ela?',
      choices: [
        {
          id: 'c_s2a_a',
          label: 'Fecha o diário de bordo. A semana inteira é do filho.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Há um esforço aqui que me comove. Não é suficiente — mas é real.',
          setsFlag: { bond: 'medium' },
          nextSceneId: 'director_note_1',
        },
        {
          id: 'c_s2a_b',
          label: 'As obrigações do farol não param. O filho observa o pai trabalhar.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'O rapaz aprende algo. Aprende que não é a prioridade.',
          setsFlag: { bond: 'weak' },
          nextSceneId: 'director_note_1',
        },
      ],
    }],
  },

  // ══════════════════════════════════════════════════════════
  // MECÂNICA #1 — ELLIOT PARA (nota 1)
  // ══════════════════════════════════════════════════════════

  {
    id: 'director_note_1', act: 1, title: 'Nota de Direção', type: 'director',
    variants: [
      {
        id: 'dn1_warm', condition: { elliotWarmth: 'warm' },
        elliotState: 'Elliot está de pé agora. Braços cruzados, mas postura aberta. Os óculos foram tirados — estão na mão.',
        narration: 'Elliot levanta a mão. A cena para.',
        elliotPrompt: '"Não. Mais devagar aqui. Esse homem não tem pressa — ele tem medo. E o medo não grita. Ele fica muito quieto." Uma pausa. "Consegue fazer isso?"',
        choices: [
          {
            id: 'c_dn1_w_follow',
            label: 'Seguir a nota. Refazer a cena com mais contenção.',
            tone: 'neutral', toneValue: 0,
            elliotReaction: 'Ele assente uma vez. Escreve algo breve. "Melhor."',
            setsFlag: { resistedNote: false },
            nextSceneId: 's3_router',
          },
          {
            id: 'c_dn1_w_resist',
            label: 'Resistir. "Eu entendi diferente essa cena — o medo dele é ativo, não passivo."',
            tone: 'light', toneValue: 1,
            elliotReaction: 'Ele fica imóvel por um momento. Depois: "Mostre-me." Pela primeira vez, parece genuinamente curioso.',
            setsFlag: { resistedNote: true },
            nextSceneId: 's3_router',
          },
        ],
      },
      {
        id: 'dn1_cold', condition: { elliotWarmth: 'cold' },
        elliotState: 'Elliot está sentado. Caderno aberto. Caneta em movimento.',
        narration: 'Elliot levanta os olhos do caderno. A cena para.',
        elliotPrompt: '"Pare." Uma palavra. "Esse homem não teria feito isso assim." Silêncio. "Tente de novo."',
        choices: [
          {
            id: 'c_dn1_c_follow',
            label: 'Aceitar a correção sem questionar. Refazer.',
            tone: 'neutral', toneValue: 0,
            elliotReaction: 'Ele volta ao caderno. "Continue."',
            setsFlag: { resistedNote: false },
            nextSceneId: 's3_router',
          },
          {
            id: 'c_dn1_c_resist',
            label: '"Com respeito — acho que fiz exatamente o que o texto pede."',
            tone: 'dark', toneValue: -1,
            elliotReaction: 'Uma pausa longa. "O texto pede o que eu escrevi. Não o que você leu." Ele fecha o caderno por um momento.',
            setsFlag: { resistedNote: true },
            nextSceneId: 's3_router',
          },
        ],
      },
      {
        id: 'dn1_neutral', condition: {},
        elliotState: 'Elliot está na cadeira, postura neutra. Caneta entre os dedos, parada.',
        narration: 'Elliot levanta a mão. A cena para.',
        elliotPrompt: '"Um momento." Ele se levanta pela primeira vez desde que a cena começou. "Esse homem guarda coisas. Não as esconde — guarda. Há diferença." Ele aguarda.',
        choices: [
          {
            id: 'c_dn1_n_follow',
            label: 'Assentir e incorporar a nota na próxima tomada.',
            tone: 'neutral', toneValue: 0,
            elliotReaction: '"Isso." Ele senta. "Pode continuar."',
            setsFlag: { resistedNote: false },
            nextSceneId: 's3_router',
          },
          {
            id: 'c_dn1_n_resist',
            label: '"Posso tentar — mas para mim, guardar e esconder nascem do mesmo lugar nesse homem."',
            tone: 'light', toneValue: 1,
            elliotReaction: 'Ele olha fixo por alguns segundos. "Argumente isso na cena, então. Vamos ver." É quase um desafio. Não é hostil.',
            setsFlag: { resistedNote: true },
            nextSceneId: 's3_router',
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // ATO 2 — S3 (4 ramos)
  // ══════════════════════════════════════════════════════════

  {
    id: 's3_ts', act: 2, title: 'A Noite Interminável', type: 'choice',
    variants: [{
      id: 's3ts_v1', condition: {},
      elliotState: 'Óculos de volta. Elliot está de pé, mas encostado na parede — não na cadeira. Uma postura mais informal que ainda não existia.',
      narration: 'Alerta de tempestade às 23h. Falso alarme — mas o vento não sabe disso. O filho está acordado; ouvem-se os passos no andar de cima.',
      elliotPrompt: 'O pai pode subir. Ou deixar o filho com a noite. O que faz com esse impulso?',
      choices: [
        {
          id: 'c_s3ts_a',
          label: '"Fica acordado comigo?" Passam a madrugada jogando cartas sob a lanterna apagada.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Sim. Exatamente assim. Essas noites formam pessoas.',
          setsFlag: { storm: 'shared' },
          nextSceneId: 'question_break',
        },
        {
          id: 'c_s3ts_b',
          label: 'Deixa dormir. A vigília é trabalho. Não é para o filho.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Proteção. Ou distância. Às vezes têm a mesma cara.',
          setsFlag: { storm: 'solo' },
          nextSceneId: 'question_break',
        },
      ],
      silenceChoice: {
        id: 'c_s3ts_silence',
        label: '',
        tone: 'light', toneValue: 1,
        elliotReaction: 'Elliot para de escrever. Olha para a cena um longo momento. "Isso. O pai não sabe o que fazer — então não faz nada, e isso é uma escolha." Uma nota longa.',
        setsFlag: { storm: 'shared', usedSilence: true },
        nextSceneId: 'question_break',
      },
    }],
  },

  {
    id: 's3_tw', act: 2, title: 'O Gesto Tardio', type: 'choice',
    variants: [{
      id: 's3tw_v1', condition: {},
      elliotState: 'Elliot está sentado de lado na cadeira — um cotovelo no encosto. A caneta parou há duas cenas.',
      narration: 'Alerta de tempestade às 23h. O filho dorme. O pai para na porta do quarto no corredor.',
      elliotPrompt: 'Ele sabe que deveria bater. Há uma hesitação. O que ele faz?',
      choices: [
        {
          id: 'c_s3tw_a',
          label: '"Desculpa acordar. É que... o vento tá feio." O filho abre a porta.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Um gesto tardio ainda é um gesto. O rapaz abriu a porta.',
          setsFlag: { storm: 'shared' },
          nextSceneId: 'question_break',
        },
        {
          id: 'c_s3tw_b',
          label: 'Passa em frente. Não quer parecer fraco. Desce para o rádio.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Aprende a proteger a própria imagem. Paga com tudo que importa.',
          setsFlag: { storm: 'solo' },
          nextSceneId: 'question_break',
        },
      ],
    }],
  },

  {
    id: 's3_am', act: 2, title: 'O Telefonema', type: 'choice',
    variants: [{
      id: 's3am_v1', condition: {},
      elliotState: 'Elliot tem o caderno fechado no colo. Não abriu há algum tempo.',
      narration: 'Uma frente de tempestade no horizonte. O filho está no continente. O pai olha para o telefone.',
      elliotPrompt: 'Há uma tentação de ligar. Só para ouvir uma voz conhecida. O que faz?',
      choices: [
        {
          id: 'c_s3am_a',
          label: '"Tá tudo bem aqui, só queria ouvir você." Uma hora no telefone.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Simples. Honesto. Por vezes é o suficiente.',
          setsFlag: { storm: 'shared' },
          nextSceneId: 'question_break',
        },
        {
          id: 'c_s3am_b',
          label: 'Não liga. Não quer preocupar. Enfrenta a noite em silêncio.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Protege o filho do que sente. Essa proteção vai cobrar caro.',
          setsFlag: { storm: 'solo' },
          nextSceneId: 'question_break',
        },
      ],
      silenceChoice: {
        id: 'c_s3am_silence',
        label: '',
        tone: 'neutral', toneValue: 0,
        elliotReaction: '"O personagem também não sabe o que fazer. Está bem. Continue assim."',
        setsFlag: { usedSilence: true },
        nextSceneId: 'question_break',
      },
    }],
  },

  {
    id: 's3_aw', act: 2, title: 'A Semana Vazia', type: 'choice',
    variants: [{
      id: 's3aw_v1', condition: {},
      elliotState: 'Elliot está com o caderno aberto mas não escreve. O olhar é diferente agora — menos analítico.',
      narration: 'Segunda visita do filho. A primeira foi difícil. Esta é pior. O pai está sempre ocupado. O filho lê o mesmo livro há três dias.',
      elliotPrompt: 'Há uma última brecha aqui. Uma fresta. O que o pai faz?',
      choices: [
        {
          id: 'c_s3aw_a',
          label: 'Larga tudo para amanhã. "Vamos ao cais?" O filho fecha o livro.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Tarde. Mas não perdido. Ainda.',
          setsFlag: { storm: 'shared' },
          nextSceneId: 'question_break',
        },
        {
          id: 'c_s3aw_b',
          label: 'O relatório não pode esperar. O filho pode esperar. Amanhã fica melhor.',
          tone: 'dark', toneValue: -1,
          elliotReaction: '[pausa longa] O amanhã que nunca chega.',
          setsFlag: { storm: 'solo' },
          nextSceneId: 'question_break',
        },
      ],
    }],
  },

  // ══════════════════════════════════════════════════════════
  // MECÂNICA #2 — A PERGUNTA
  // ══════════════════════════════════════════════════════════

  {
    id: 'question_break', act: 2, title: 'A Pergunta', type: 'question',
    variants: [
      {
        id: 'qb_warm', condition: { elliotWarmth: 'warm' },
        elliotState: 'Elliot está de pé, de costas, ajustando algo no set. Os ombros estão mais baixos do que quando a sessão começou.',
        narration: 'Há uma pausa natural na cena. Elliot está de costas. Uma janela de silêncio.',
        elliotPrompt: null,
        choices: [
          {
            id: 'c_qb_w_1',
            label: '"Esse roteiro é autobiográfico, não é?"',
            tone: 'light', toneValue: 0,
            elliotReaction: 'Ele não se vira imediatamente. Quando o faz, o olhar é diferente — não é raiva, não é surpresa. É algo mais parecido com alívio. "Continue a cena." É tudo que diz.',
            setsFlag: { brokeCharacter: true },
            nextSceneId: 's4_router',
          },
          {
            id: 'c_qb_w_2',
            label: '"O senhor tem um filho?"',
            tone: 'light', toneValue: 0,
            elliotReaction: 'Uma pausa longa. Ele se vira. "Tinha." Volta para a cadeira sem mais nada. Senta. Abre o caderno.',
            setsFlag: { brokeCharacter: true },
            nextSceneId: 's4_router',
          },
          {
            id: 'c_qb_w_3',
            label: '"Pode me falar sobre a luz? A metáfora dela?"',
            tone: 'neutral', toneValue: 0,
            elliotReaction: '"A luz não é metáfora." Uma pausa. "É o que sobra quando não há mais nada para fazer." Ele senta. "Continue."',
            setsFlag: { brokeCharacter: true },
            nextSceneId: 's4_router',
          },
          {
            id: 'c_qb_w_skip',
            label: '[Continuar a cena sem perguntar nada]',
            tone: 'neutral', toneValue: 0,
            elliotReaction: '',
            nextSceneId: 's4_router',
          },
        ],
      },
      {
        id: 'qb_cold', condition: { elliotWarmth: 'cold' },
        elliotState: 'Elliot está na cadeira. Postura fechada. O caderno está aberto mas a caneta não se move.',
        narration: 'Uma pausa natural na cena. O set está quieto.',
        elliotPrompt: null,
        choices: [
          {
            id: 'c_qb_c_1',
            label: '"Esse roteiro tem peso pessoal para o senhor?"',
            tone: 'dark', toneValue: 0,
            elliotReaction: '"Todos os roteiros têm." Fecha o caderno. "Continue."',
            setsFlag: { brokeCharacter: true },
            nextSceneId: 's4_router',
          },
          {
            id: 'c_qb_c_2',
            label: '"O filho no roteiro — existiu de verdade?"',
            tone: 'light', toneValue: 1,
            elliotReaction: 'Silêncio. Um silêncio diferente de todos os outros dessa sessão. Quando ele fala: "Não faça essa pergunta de novo." Mas a caneta foi para baixo. E não voltou.',
            setsFlag: { brokeCharacter: true },
            nextSceneId: 's4_router',
          },
          {
            id: 'c_qb_c_3',
            label: '"O que o senhor quer que eu sinta nessa cena?"',
            tone: 'neutral', toneValue: 0,
            elliotReaction: '"Não quero que você sinta nada. Quero que o personagem sinta." Uma pausa. "Continue."',
            nextSceneId: 's4_router',
          },
          {
            id: 'c_qb_c_skip',
            label: '[Continuar a cena sem perguntar nada]',
            tone: 'neutral', toneValue: 0,
            elliotReaction: '',
            nextSceneId: 's4_router',
          },
        ],
      },
      {
        id: 'qb_neutral', condition: {},
        elliotState: 'Elliot está na cadeira. Postura neutra. Observa.',
        narration: 'Uma pausa natural. Uma janela.',
        elliotPrompt: null,
        choices: [
          {
            id: 'c_qb_n_1',
            label: '"Por que esse roteiro, agora?"',
            tone: 'light', toneValue: 0,
            elliotReaction: '"Porque agora é tarde o suficiente para conseguir terminar." Ele abre o caderno. "Continue."',
            setsFlag: { brokeCharacter: true },
            nextSceneId: 's4_router',
          },
          {
            id: 'c_qb_n_2',
            label: '"O senhor dirigiria esse filme diferente antes?"',
            tone: 'neutral', toneValue: 0,
            elliotReaction: '"Sim." Só isso.',
            setsFlag: { brokeCharacter: true },
            nextSceneId: 's4_router',
          },
          {
            id: 'c_qb_n_3',
            label: '"A luz no título — apaga ou mantém?"',
            tone: 'neutral', toneValue: 0,
            elliotReaction: '"Depende de quem assistir." Uma pausa. "Por isso preciso de você aqui."',
            setsFlag: { brokeCharacter: true },
            nextSceneId: 's4_router',
          },
          {
            id: 'c_qb_n_skip',
            label: '[Continuar sem perguntar]',
            tone: 'neutral', toneValue: 0,
            elliotReaction: '',
            nextSceneId: 's4_router',
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // S4 — O BARCO EM PERIGO (8 variantes)
  // ══════════════════════════════════════════════════════════

  {
    id: 's4_ts_shared', act: 2, title: 'O Barco em Perigo', type: 'choice',
    variants: [{
      id: 's4_ts_sh_v1', condition: {},
      elliotState: 'Elliot está sentado, postura concentrada. O caderno aberto no colo.',
      narration: 'Um chamado de socorro no rádio. Barco de pesca em dificuldade a dois quilómetros. Responder exige sair na tempestade. O filho está acordado ao lado — ainda com a mão de baralho na mão.',
      elliotPrompt: 'O filho está vendo tudo. O que o pai faz diante dele?',
      choices: [
        {
          id: 'c4_ts_sh_a',
          label: 'Age sem pensar. "Fica aqui." O filho assiste o pai desaparecer no vento.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'O medo de tempestades que o rapaz tinha... acabou nessa noite.',
          setsFlag: { boat: 'action' },
          nextSceneId: 'director_note_2',
        },
        {
          id: 'c4_ts_sh_b',
          label: 'Hesita. Pesa os riscos. O momento passa sem ação.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'O filho viu isso também. Aprendeu que até os corajosos hesitam.',
          setsFlag: { boat: 'hesitation' },
          nextSceneId: 'director_note_2',
        },
      ],
    }],
  },

  {
    id: 's4_ts_solo', act: 2, title: 'O Barco em Perigo', type: 'choice',
    variants: [{
      id: 's4_ts_so_v1', condition: {},
      elliotState: 'Elliot está sentado, postura concentrada. O caderno aberto no colo.',
      narration: 'Um chamado de socorro no rádio. Barco em dificuldade. O filho está dormindo — depois daquela noite de cartas, dormiu cedo pela primeira vez.',
      elliotPrompt: 'Poderia acordar o filho. Ou partir sozinho. Qual dos dois?',
      choices: [
        {
          id: 'c4_ts_so_a',
          label: 'Bate na porta do filho. "Tem um barco em dificuldade. Vem comigo."',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Isso muda tudo. Não o resultado — o vínculo.',
          setsFlag: { boat: 'action' },
          nextSceneId: 'director_note_2',
        },
        {
          id: 'c4_ts_so_b',
          label: 'Parte sozinho. Proteger é não envolver.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Uma história que deveria ser vivida junto. Mas é o que foi.',
          setsFlag: { boat: 'hesitation' },
          nextSceneId: 'director_note_2',
        },
      ],
    }],
  },

  {
    id: 's4_tw_shared', act: 2, title: 'O Barco em Perigo', type: 'choice',
    variants: [{
      id: 's4_tw_sh_v1', condition: {},
      elliotState: 'Elliot está sentado, postura concentrada. O caderno aberto no colo.',
      narration: 'Sinal de socorro no rádio. O filho está acordado — porta entreaberta depois de ter respondido ao pai mais cedo.',
      elliotPrompt: 'Uma coisa boa aconteceu hoje. O que o pai faz com ela?',
      choices: [
        {
          id: 'c4_tw_sh_a',
          label: 'Age. Chama o filho antes de sair. "Fica de olho no rádio pra mim."',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Ele o incluiu. Pequenas viradas. É sempre assim.',
          setsFlag: { boat: 'action' },
          nextSceneId: 'director_note_2',
        },
        {
          id: 'c4_tw_sh_b',
          label: 'Não age. O farol tem prioridade. "Vai dormir, tá bom."',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'O gesto de antes não sobrevive a este.',
          setsFlag: { boat: 'hesitation' },
          nextSceneId: 'director_note_2',
        },
      ],
    }],
  },

  {
    id: 's4_tw_solo', act: 2, title: 'O Barco em Perigo', type: 'choice',
    variants: [{
      id: 's4_tw_so_v1', condition: {},
      elliotState: 'Elliot está sentado, postura concentrada. O caderno aberto no colo.',
      narration: 'Sinal de socorro no rádio. O filho está dormindo. O pai está sozinho no rádio, como sempre.',
      elliotPrompt: 'Mais uma noite sozinho. Mas há uma escolha aqui.',
      choices: [
        {
          id: 'c4_tw_so_a',
          label: 'Age. Conta ao filho de manhã, à mesa do café.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Uma história. Não uma memória compartilhada. Mas é alguma coisa.',
          setsFlag: { boat: 'action' },
          nextSceneId: 'director_note_2',
        },
        {
          id: 'c4_tw_so_b',
          label: 'A responsabilidade é o farol, não os barcos. Desliga o rádio.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Correto. E completamente errado.',
          setsFlag: { boat: 'hesitation' },
          nextSceneId: 'director_note_2',
        },
      ],
    }],
  },

  {
    id: 's4_am_connected', act: 2, title: 'O Barco em Perigo', type: 'choice',
    variants: [{
      id: 's4_am_co_v1', condition: {},
      elliotState: 'Elliot está sentado, postura concentrada. O caderno aberto no colo.',
      narration: 'Um chamado de socorro no rádio. O pai está sozinho — mas a voz do filho ainda ressoa da ligação de antes.',
      elliotPrompt: 'Aquela ligação deu alguma coisa. O que ele faz com isso?',
      choices: [
        {
          id: 'c4_am_co_a',
          label: 'Age sem hesitar. Aquela voz deu coragem suficiente.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'A voz de quem importa. Às vezes é o que falta para agir.',
          setsFlag: { boat: 'action' },
          nextSceneId: 'director_note_2',
        },
        {
          id: 'c4_am_co_b',
          label: 'Hesita. O instinto de proteção paralisa. O farol é a missão.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Ele tem razão. E não tem nada.',
          setsFlag: { boat: 'hesitation' },
          nextSceneId: 'director_note_2',
        },
      ],
    }],
  },

  {
    id: 's4_am_silent', act: 2, title: 'O Barco em Perigo', type: 'choice',
    variants: [{
      id: 's4_am_si_v1', condition: {},
      elliotState: 'Elliot está sentado, postura concentrada. O caderno aberto no colo.',
      narration: 'Sinal de socorro no rádio. O pai está só. A noite inteira foi só. Há um barco lá fora.',
      elliotPrompt: 'Ninguém está vendo. Só ele e a escolha.',
      choices: [
        {
          id: 'c4_am_si_a',
          label: 'Age. Pelo menos isso.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Pelo menos isso.',
          setsFlag: { boat: 'action' },
          nextSceneId: 'director_note_2',
        },
        {
          id: 'c4_am_si_b',
          label: 'Não age. O farol está seguro. É o suficiente.',
          tone: 'dark', toneValue: -1,
          elliotReaction: '[silêncio prolongado]',
          setsFlag: { boat: 'hesitation' },
          nextSceneId: 'director_note_2',
        },
      ],
    }],
  },

  {
    id: 's4_aw_late', act: 2, title: 'O Barco em Perigo', type: 'choice',
    variants: [{
      id: 's4_aw_la_v1', condition: {},
      elliotState: 'Elliot está sentado, postura concentrada. O caderno aberto no colo.',
      narration: 'Sinal de socorro no rádio. O filho está dormindo — depois do passeio ao cais, dormiu cedo pela primeira vez na semana.',
      elliotPrompt: 'Algo está frágil. Mas está lá. O que o pai faz?',
      choices: [
        {
          id: 'c4_aw_la_a',
          label: 'Age. Deixa um bilhete na porta do filho: "Fui ajudar. Volto logo."',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Ele partiu — e pensou no filho antes de ir.',
          setsFlag: { boat: 'action' },
          nextSceneId: 'director_note_2',
        },
        {
          id: 'c4_aw_la_b',
          label: 'Não quer acordar o que é frágil. Deixa o barco passar.',
          tone: 'dark', toneValue: -1,
          elliotReaction: 'Mais um movimento sozinho.',
          setsFlag: { boat: 'hesitation' },
          nextSceneId: 'director_note_2',
        },
      ],
    }],
  },

  {
    id: 's4_aw_lost', act: 2, title: 'O Barco em Perigo', type: 'choice',
    variants: [{
      id: 's4_aw_lo_v1', condition: {},
      elliotState: 'Elliot está sentado, postura concentrada. O caderno aberto no colo.',
      narration: 'Sinal de socorro no rádio. O filho está no quarto. O relatório ficou pela metade. O pai está no rádio.',
      elliotPrompt: 'Chegamos ao fundo. Mas o fundo também é uma escolha.',
      choices: [
        {
          id: 'c4_aw_lo_a',
          label: 'Age. Talvez o filho acorde e veja pela janela.',
          tone: 'light', toneValue: 1,
          elliotReaction: 'Uma esperança triste. Mas ainda é esperança.',
          setsFlag: { boat: 'action' },
          nextSceneId: 'director_note_2',
        },
        {
          id: 'c4_aw_lo_b',
          label: 'Desliga o rádio. Vai dormir.',
          tone: 'dark', toneValue: -1,
          elliotReaction: '[Elliot fecha o caderno]',
          setsFlag: { boat: 'hesitation' },
          nextSceneId: 'director_note_2',
        },
      ],
    }],
  },

  // ══════════════════════════════════════════════════════════
  // MECÂNICA #3 — ELLIOT PARA (nota 2, condicional)
  // Exibida se: (toneScore >= 3 && resistedNote)
  //          OU (toneScore <= -3 && !resistedNote)
  // Senão: avança direto para S5
  // ══════════════════════════════════════════════════════════

  {
    id: 'director_note_2', act: 2, title: 'Nota de Direção', type: 'director',
    variants: [
      {
        id: 'dn2_high', condition: { resistedNote: true },
        elliotState: 'Elliot está de pé. Os óculos estão na mão há muito tempo. A gravata está solta. Ele parece menor do que quando a sessão começou — de uma maneira que não é fraqueza.',
        narration: 'Elliot para a cena. Desta vez, não vem até o centro do set — fica onde está.',
        elliotPrompt: '"Eu escrevi essa cena de um jeito. Você está fazendo de outro." Uma pausa. "O seu jeito tem algo que o meu não tinha." Ele olha para o caderno. Depois para o ator. "Continue como você entendeu."',
        choices: [
          {
            id: 'c_dn2_h_accept',
            label: 'Aceitar. Continuar com a própria leitura.',
            tone: 'light', toneValue: 1,
            elliotReaction: 'Ele assente. Senta devagar. Não escreve nada. Só assiste.',
            nextSceneId: 's5',
          },
          {
            id: 'c_dn2_h_defer',
            label: 'Recuar. "Prefiro seguir o que o senhor escreveu."',
            tone: 'neutral', toneValue: 0,
            elliotReaction: 'Um instante de algo no rosto que não é raiva — é quase decepção. "Como quiser. Continue."',
            nextSceneId: 's5',
          },
        ],
      },
      {
        id: 'dn2_low', condition: {},
        elliotState: 'Elliot está sentado. Caderno no colo. Caneta na mão — mas não escreve há algum tempo.',
        narration: 'Elliot para a cena. Fica onde está.',
        elliotPrompt: '"Há algo aqui que ainda não chegou." Uma pausa. "Não sei se é o texto ou o ator." Ele olha para o caderno. "Tente de novo. A partir do início dessa cena."',
        choices: [
          {
            id: 'c_dn2_l_retry',
            label: 'Recomeçar a cena do início, com mais risco.',
            tone: 'light', toneValue: 1,
            elliotReaction: '"Isso." Ele escreve algo. "Era isso."',
            nextSceneId: 's5',
          },
          {
            id: 'c_dn2_l_maintain',
            label: 'Manter a leitura. "Acredito no que fiz."',
            tone: 'dark', toneValue: -1,
            elliotReaction: 'Ele fecha o caderno. "Então vamos continuar assim." Não é aprovação.',
            nextSceneId: 's5',
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // ATO 3
  // ══════════════════════════════════════════════════════════

  {
    id: 's5', act: 3, title: 'A Noite da Tempestade Real', type: 'advance',
    variants: [
      {
        id: 's5_v1', condition: { family: 'together', boat: 'action' },
        elliotState: 'Elliot não está mais dirigindo. Está sentado, os óculos na mão, o caderno fechado no colo. Olha para o set sem expressão identificável.',
        narration: 'A tempestade real chegou às três da manhã. O pai estava na lanterna quando o alarme soou. Em algum momento — nenhum dos dois saberia dizer quando — o filho pegou o bote para ajudar a amarrar as embarcações no cais. Tinha feito aquilo dezenas de vezes com o pai. Sabia como fazer. Não tinha medo de tempestades. Quando o pai desceu, o farol estava salvo e o cais estava vazio.',
        elliotPrompt: null,
        choices: [{
          id: 'c5_v1', label: '[continuar]', tone: 'neutral', toneValue: 0,
          elliotReaction: '[Elliot para de dar direção. Pela primeira vez, ele parece não estar dirigindo — parece estar lembrando.]',
          nextSceneId: 's6',
        }],
      },
      {
        id: 's5_v2', condition: { family: 'together', boat: 'hesitation' },
        elliotState: 'Elliot não está mais dirigindo. Está sentado, os óculos na mão, o caderno fechado no colo. Olha para o set sem expressão identificável.',
        narration: 'A tempestade real chegou às três da manhã. O pai estava sobrecarregado quando ouviu um barulho. O filho tinha acordado com o temporal — e o medo das tempestades que ele ainda carregava voltou mais forte do que nunca. Foi procurar o pai. Escorregou no caminho para o cais. O temporal fez o resto. O pai só soube quando o silêncio substituiu o vento.',
        elliotPrompt: null,
        choices: [{
          id: 'c5_v2', label: '[continuar]', tone: 'neutral', toneValue: 0,
          elliotReaction: '[Elliot para de dar direção. Pela primeira vez, ele parece não estar dirigindo — parece estar lembrando.]',
          nextSceneId: 's6',
        }],
      },
      {
        id: 's5_v3', condition: { family: 'apart', boat: 'action' },
        elliotState: 'Elliot não está mais dirigindo. Está sentado, os óculos na mão, o caderno fechado no colo. Olha para o set sem expressão identificável.',
        narration: 'O filho estava de visita quando o temporal chegou. Sem medo de tempestades — isso mudara, de alguma forma, ao longo das visitas — decidiu ajudar o pai no cais. Pegou o bote. O temporal era maior do que parecia da janela. O pai só notou a ausência quando a crise passou e o nome do filho não teve resposta.',
        elliotPrompt: null,
        choices: [{
          id: 'c5_v3', label: '[continuar]', tone: 'neutral', toneValue: 0,
          elliotReaction: '[Elliot para de dar direção. Pela primeira vez, ele parece não estar dirigindo — parece estar lembrando.]',
          nextSceneId: 's6',
        }],
      },
      {
        id: 's5_v4', condition: { family: 'apart', boat: 'hesitation' },
        elliotState: 'Elliot não está mais dirigindo. Está sentado, os óculos na mão, o caderno fechado no colo. Olha para o set sem expressão identificável.',
        narration: 'O filho estava de visita — mas a semana tinha pesado. Quando o temporal chegou com força, o filho decidiu ir embora. Voltar para o continente, para a mãe, para onde sentia que havia lugar para ele. Pegou o bote na escuridão. O pai não sabia que ele tinha ido. Só percebeu quando foi ao quarto pela manhã e encontrou a cama arrumada.',
        elliotPrompt: null,
        choices: [{
          id: 'c5_v4', label: '[continuar]', tone: 'neutral', toneValue: 0,
          elliotReaction: '[Elliot para de dar direção. Pela primeira vez, ele parece não estar dirigindo — parece estar lembrando.]',
          nextSceneId: 's6',
        }],
      },
    ],
  },

  {
    id: 's6', act: 3, title: 'A Luz', type: 'choice',
    variants: [
      {
        id: 's6_light', condition: { lightPath: true },
        elliotState: 'A gravata está completamente solta. Elliot não fez anotações nas últimas duas cenas.',
        narration: 'O faroleiro, sozinho. A lanterna ainda funciona. A rotina continua — porque as rotinas continuam mesmo quando não fazem mais sentido. Há uma decisão que ele ainda não tomou.',
        elliotPrompt: null,
        choices: [
          {
            id: 'c6_a', label: 'Mantém a luz acesa. "Ele voltaria pelo brilho dela."',
            tone: 'light', toneValue: 2,
            elliotReaction: '[Elliot fecha os olhos. Acena devagar.]',
            nextSceneId: 'ending',
          },
          {
            id: 'c6_b', label: 'Apaga a luz. "Não há mais nada a guiar."',
            tone: 'dark', toneValue: -2,
            elliotReaction: '[Elliot escreve algo, devagar. Fecha o caderno.]',
            nextSceneId: 'ending',
          },
        ],
      },
      {
        id: 's6_dark', condition: {},
        elliotState: 'Elliot está com os óculos postos de volta. O caderno está aberto. Não olha para o set.',
        narration: 'O faroleiro, sozinho. A lanterna ainda funciona. A rotina continua — porque as rotinas continuam mesmo quando não fazem mais sentido. Há uma decisão que ele ainda não tomou.',
        elliotPrompt: null,
        choices: [
          {
            id: 'c6_a2', label: 'Mantém a luz acesa. "Ele voltaria pelo brilho dela."',
            tone: 'light', toneValue: 2,
            elliotReaction: '[Elliot fecha os olhos. Acena devagar.]',
            nextSceneId: 'ending',
          },
          {
            id: 'c6_b2', label: 'Apaga a luz. "Não há mais nada a guiar."',
            tone: 'dark', toneValue: -2,
            elliotReaction: '[Elliot escreve algo, devagar. Fecha o caderno.]',
            nextSceneId: 'ending',
          },
        ],
      },
    ],
  },
]

export const scenesMap = new Map<string, Scene>(scenes.map((s) => [s.id, s]))
