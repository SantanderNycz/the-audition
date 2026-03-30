import PDFDocument from 'pdfkit'
import { createWriteStream } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = join(__dirname, '..', 'the-audition-projeto.pdf')

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 60, bottom: 60, left: 65, right: 65 },
  info: {
    Title: 'The Audition — Documentação do Projeto',
    Author: 'The Audition',
    Subject: 'Jogo narrativo interativo',
  },
})

const stream = createWriteStream(OUTPUT)
doc.pipe(stream)

// ── Paleta ──────────────────────────────────────────────────────────────────
const C = {
  black: '#0a0a0a',
  dark: '#1a1a2e',
  gold: '#c9a84c',
  silver: '#a0a0b8',
  warm: '#f5f0e8',
  dim: '#6b6b8a',
  white: '#ffffff',
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function pageWidth() { return doc.page.width - doc.page.margins.left - doc.page.margins.right }

function rule(color = C.gold, opacity = 0.4) {
  doc.save().opacity(opacity).moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.margins.left + pageWidth(), doc.y).strokeColor(color).lineWidth(0.5).stroke().restore()
  doc.moveDown(0.4)
}

function heading1(text) {
  doc.moveDown(0.6)
  doc.font('Helvetica-Bold').fontSize(18).fillColor(C.warm).text(text, { align: 'left' })
  doc.moveDown(0.2)
  rule(C.gold, 0.5)
  doc.moveDown(0.3)
}

function heading2(text) {
  doc.moveDown(0.5)
  doc.font('Helvetica-Bold').fontSize(13).fillColor(C.gold).text(text)
  doc.moveDown(0.15)
}

function heading3(text) {
  doc.moveDown(0.3)
  doc.font('Helvetica-BoldOblique').fontSize(11).fillColor(C.silver).text(text)
  doc.moveDown(0.1)
}

function body(text, opts = {}) {
  doc.font('Helvetica').fontSize(10.5).fillColor(C.warm).text(text, { lineGap: 3, ...opts })
  doc.moveDown(0.3)
}

function dim(text) {
  doc.font('Helvetica-Oblique').fontSize(10).fillColor(C.silver).text(text, { lineGap: 2 })
  doc.moveDown(0.25)
}

function quote(text) {
  const x = doc.page.margins.left + 18
  const w = pageWidth() - 18
  doc.save()
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.margins.left, doc.y + 40)
    .strokeColor(C.gold).opacity(0.35).lineWidth(2).stroke()
    .restore()
  doc.font('Helvetica-Oblique').fontSize(10.5).fillColor(C.silver).text(text, x, doc.y, { width: w, lineGap: 3 })
  doc.moveDown(0.4)
}

function tag(label, value) {
  const startX = doc.page.margins.left
  doc.font('Helvetica-Bold').fontSize(10).fillColor(C.gold).text(label + '  ', startX, doc.y, { continued: true })
  doc.font('Helvetica').fontSize(10).fillColor(C.warm).text(value, { lineGap: 2 })
  doc.moveDown(0.15)
}

function bullet(text, indent = 0) {
  const bx = doc.page.margins.left + indent
  const tx = bx + 14
  doc.font('Helvetica').fontSize(10.5).fillColor(C.gold).text('·', bx, doc.y, { continued: true, width: 14 })
  doc.font('Helvetica').fontSize(10.5).fillColor(C.warm).text(text, tx, doc.y - doc.currentLineHeight(), { width: pageWidth() - indent - 14, lineGap: 2 })
  doc.moveDown(0.15)
}

function newPage() { doc.addPage() }

// ═══════════════════════════════════════════════════════════════════════════
// CAPA
// ═══════════════════════════════════════════════════════════════════════════
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

// Linha decorativa superior
doc.save().opacity(0.3).moveTo(65, 120).lineTo(doc.page.width - 65, 120).strokeColor(C.gold).lineWidth(0.5).stroke().restore()

doc.moveDown(8)
doc.font('Helvetica').fontSize(10).fillColor(C.gold).opacity(0.7).text('UM JOGO NARRATIVO INTERATIVO', { align: 'center', characterSpacing: 3 })
doc.opacity(1)
doc.moveDown(0.6)
doc.font('Helvetica-Bold').fontSize(42).fillColor(C.warm).text('THE AUDITION', { align: 'center', characterSpacing: 2 })
doc.moveDown(0.3)
doc.font('Helvetica-Oblique').fontSize(16).fillColor(C.silver).text('"A Luz do Porto"', { align: 'center' })

doc.moveDown(2)
doc.save().opacity(0.3).moveTo(65, doc.y).lineTo(doc.page.width - 65, doc.y).strokeColor(C.gold).lineWidth(0.5).stroke().restore()
doc.moveDown(1.5)

doc.font('Helvetica').fontSize(11).fillColor(C.silver).text('Documentação completa do projeto', { align: 'center' })
doc.moveDown(0.3)
doc.font('Helvetica').fontSize(10).fillColor(C.dim).text('Para análise no NotebookLM', { align: 'center' })

// Stack na capa
doc.moveDown(4)
doc.font('Helvetica').fontSize(9).fillColor(C.dim).text('Vite  ·  React  ·  TypeScript  ·  Tailwind CSS', { align: 'center', characterSpacing: 1 })

// ═══════════════════════════════════════════════════════════════════════════
// PÁG 2 — VISÃO GERAL
// ═══════════════════════════════════════════════════════════════════════════
newPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

heading1('1. Visão Geral do Projeto')

body(
  'The Audition é um jogo narrativo interativo construído com tecnologias web modernas, sem dependências de motores de jogo externos. O projeto une ficção cinematográfica com design de escolhas dramáticas, explorando como decisões cotidianas acumulam peso emocional ao longo do tempo.'
)

body(
  'O jogador assume o papel de um ator que chega para uma audição num estúdio de cinema. Ele irá interpretar cenas do roteiro "A Luz do Porto", um filme dirigido por Elliot Marsh — um homem de 63 anos com um peso invisível nos ombros. A cada cena, o ator faz escolhas de interpretação. Elliot reage. O roteiro avança.'
)

body(
  'O que o jogador descobre apenas no final: o roteiro é um espelho da vida real de Elliot. Cada cena que ele interpretou era uma versão ficcionada dos anos que o diretor passou num farol com — ou longe de — seu filho. O filho sempre morre. Não importa o caminho. O que muda é o porquê.'
)

heading2('Proposta Central')

quote('"Algumas histórias não têm saída. Só têm versões."')

body('A inevitabilidade da tragédia é o motor emocional do jogo. O design das escolhas não ilude o jogador com a promessa de salvar o filho — ilude com a promessa de entender o pai.')

heading2('Stack Tecnológica')

tag('Framework:', 'Vite + React 18 + TypeScript')
tag('Estilo:', 'Tailwind CSS — sem bibliotecas de animação externas')
tag('Lógica:', 'Estado puro com useReducer — sem motor de jogo externo')
tag('Fontes:', 'Playfair Display (serifada, narração) + Inter (UI)')
tag('Efeitos:', 'CSS transitions, grain via SVG inline, vignette radial gradient')

// ═══════════════════════════════════════════════════════════════════════════
// PÁG 3 — CONCEITO E NARRATIVA
// ═══════════════════════════════════════════════════════════════════════════
newPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

heading1('2. Conceito e Narrativa')

heading2('O Contexto: A Audição')

body('O jogador não é o personagem central da história — é o intérprete dele. Esta distância entre o ator e o papel é intencional: ela cria uma camada de ambiguidade moral. Quando o ator escolhe como o guarda-faróis age, está ele revelando o personagem — ou a si mesmo?')

body('A pré-cena é uma cutscene narrativa: sala de espera com cadeiras de plástico e cartazes antigos, uma assistente sem sorriso, um corredor de silêncio. O diretor Elliot Marsh não se levanta quando o ator entra. Entrega um envelope amarelado e pergunta: "Você leu o roteiro?"')

heading2('Elliot Marsh')

body('Diretor de cinema, 63 anos. Carreia nas falas curtas, nas pausas, nas anotações que ele faz sem olhar para cima. Elliot não dirige o ator — ele dirige a memória. As suas reações às escolhas revelam, gradualmente, que ele não está avaliando uma performance. Está revivendo algo.')

dim('Exemplos de reações de Elliot ao longo do jogo:')
quote('"Corajoso. Ou egoísta. Às vezes são a mesma coisa." — após a escolha de levar a família')
quote('"Exato. Essas noites é que formam as pessoas." — após a cena das cartas')
quote('"[Elliot para de dar direção. Pela primeira vez, ele parece não estar dirigindo — parece estar lembrando.]" — Cena 5')

heading2('A Luz do Porto — O Roteiro dentro do Jogo')

body('O roteiro fictício conta a história de um guarda-faróis que aceita um trabalho num farol isolado a quarenta quilômetros do continente. A história acompanha os anos de sua relação com o filho — marcados por presença ou ausência, por gestos que chegam tarde ou que nunca chegam.')

body('Nas referências bibliográficas do roteiro (visíveis quando o jogador abre o envelope na intro), entre títulos acadêmicos plausíveis, aparece uma entrada anômala:')

quote('"O Códice Meridiano" — sem autor, sem editora, sem data.')

body('Esta é uma referência intencional a um universo expandido. Para quem joga os outros títulos da série, o Códice Meridiano é um artefato de peso. Aqui, sua presença é sutil — mas não aleatória. Harlan Voss, prefeito mencionado no final luminoso do jogo como financiador do filme e das "pesquisas", tem conexão com o Códice.')

heading2('O Que Nunca Muda')

body('Independente de todas as escolhas do jogador — quão próximo ou distante pai e filho estiveram, quão corajoso ou hesitante o guarda foi — o filho morre na tempestade final. O barco vira. Isso sempre ia acontecer.')

body('O que as escolhas determinam é a versão da morte: por amor, por medo, por coragem mal-aplicada, por abandono silencioso. O jogo não pune nem recompensa a escolha em si — pune e recompensa o acúmulo.')

// ═══════════════════════════════════════════════════════════════════════════
// PÁG 4 — ESTRUTURA DE CENAS
// ═══════════════════════════════════════════════════════════════════════════
newPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

heading1('3. Estrutura de Cenas — A Árvore de Decisão')

body('O jogo possui 4 níveis de ramificação binária, gerando 16 caminhos possíveis antes da convergência. Após a convergência, há uma escolha final que determina um dos 4 finais.')

heading2('Diagrama da Árvore')

// Diagrama textual
const treeLines = [
  '  S1 (A Oferta)',
  '  ├─ A: Leva família → S2_together (O Ritual)',
  '  │   ├─ A: Ritual às 18h → S3_ts (A Noite Interminável)',
  '  │   │   ├─ A: Joga cartas → S4_ts_shared → S5',
  '  │   │   └─ B: Vigília solo → S4_ts_solo   → S5',
  '  │   └─ B: Trabalha distante → S3_tw (O Gesto Tardio)',
  '  │       ├─ A: Bate na porta → S4_tw_shared → S5',
  '  │       └─ B: Passa em frente → S4_tw_solo → S5',
  '  └─ B: Manda família → S2_apart (A Visita)',
  '      ├─ A: Semana só pro filho → S3_am (O Telefonema)',
  '      │   ├─ A: Liga pro filho → S4_am_connected → S5',
  '      │   └─ B: Silêncio → S4_am_silent      → S5',
  '      └─ B: Filho observa pai → S3_aw (A Semana Vazia)',
  '          ├─ A: Vai ao cais → S4_aw_late    → S5',
  '          └─ B: Amanhã → S4_aw_lost         → S5',
  '',
  '  S5 (A Noite da Tempestade Real) ← Todos os caminhos convergem aqui',
  '  └─ [continuar] → S6 (A Luz)',
  '      ├─ A: Mantém a luz (+2) → Ending calculado por toneScore',
  '      └─ B: Apaga a luz  (-2) → Ending calculado por toneScore',
]

doc.font('Courier').fontSize(9).fillColor(C.silver)
for (const line of treeLines) {
  doc.text(line, doc.page.margins.left, doc.y, { lineGap: 1 })
}
doc.moveDown(0.5)

heading2('Resumo Numérico')
tag('Cenas na árvore:', '17 nós (S1, 2×S2, 4×S3, 8×S4, S5, S6)')
tag('Caminhos únicos possíveis:', '16 (2⁴)')
tag('Variantes de S5:', '4 (determinadas por flags family + boat)')
tag('Finais:', '4 (calculados por toneScore)')
tag('Escolhas com peso narrativo:', '4 × (±1) + S6 (±2) = range -6 a +6')

// ═══════════════════════════════════════════════════════════════════════════
// PÁG 5 — CENAS EM DETALHE
// ═══════════════════════════════════════════════════════════════════════════
newPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

heading1('4. As Cenas em Detalhe')

heading2('ATO 1 — A Decisão')

heading3('S1 · A Oferta')
body('Cena única de abertura. O guarda-faróis recebe a proposta de trabalho. A escolha não é se aceitar — é o que trazer consigo.')
bullet('Opção A (light, +1): Leva a família. Mais risco — mas juntos. → flag family: together')
bullet('Opção B (dark, -1): Manda a família para o continente. O filho virá nas férias. → flag family: apart')

heading3('S2 — Dois Ramos')
dim('S2_together · O Ritual (se family: together)')
body('Três meses no farol. Pai e filho estão no mesmo lugar — mas isso não garante presença.')
bullet('Opção A (light, +1): Ritual diário às 18h, acender a lanterna juntos. → bond: strong → S3_ts')
bullet('Opção B (dark, -1): Pai trabalha, filho explora sozinho. → bond: weak → S3_tw')

dim('S2_apart · A Visita (se family: apart)')
body('Primeiro verão. O filho chegou de barco. Uma semana pela frente.')
bullet('Opção A (light, +1): Fecha o diário de bordo. Semana inteira só para o filho. → bond: medium → S3_am')
bullet('Opção B (dark, -1): As obrigações do farol não param. → bond: weak → S3_aw')

heading2('ATO 2 — A Vida no Farol')

heading3('S3 — Quatro Ramos (falso alarme de tempestade)')
dim('S3_ts · A Noite Interminável (together + strong)')
bullet('A (light): Bate na porta, joga cartas de madrugada. → storm: shared → S4_ts_shared')
bullet('B (dark): Deixa o filho dormir. Vigília solitária. → storm: solo → S4_ts_solo')

dim('S3_tw · O Gesto Tardio (together + weak)')
bullet('A (light): Bate na porta mesmo hesitando. → storm: shared → S4_tw_shared')
bullet('B (dark): Passa em frente. Desce para o rádio. → storm: solo → S4_tw_solo')

dim('S3_am · O Telefonema (apart + medium)')
bullet('A (light): Liga só para ouvir a voz do filho. → storm: shared → S4_am_connected')
bullet('B (dark): Não liga. Enfrenta a noite em silêncio. → storm: solo → S4_am_silent')

dim('S3_aw · A Semana Vazia (apart + weak)')
bullet('A (light): Larga tudo. "Vamos ao cais?" → storm: shared → S4_aw_late')
bullet('B (dark): O relatório não pode esperar. → storm: solo → S4_aw_lost')

// ═══════════════════════════════════════════════════════════════════════════
// PÁG 6 — S4, S5, S6
// ═══════════════════════════════════════════════════════════════════════════
newPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

heading3('S4 — Oito Variantes: O Barco em Perigo')
body('Todas as 8 variantes de S4 têm a mesma premissa: um sinal de socorro no rádio. Responder exige sair na tempestade. A diferença está no contexto emocional estabelecido pelos ramos anteriores — o filho está acordado ao lado? dormindo? no continente? — e em como essa escolha vai ecoar em S5.')

const s4variants = [
  ['S4_ts_shared', 'Filho acorda do lado com mão de baralho na mão. O pai age ou hesita diante dele.'],
  ['S4_ts_solo', 'Filho dorme. Pai pode chamá-lo ou partir sozinho.'],
  ['S4_tw_shared', 'Filho está acordado pela primeira vez (depois do gesto tardio).'],
  ['S4_tw_solo', 'Filho dorme. Solidão total.'],
  ['S4_am_connected', 'Voz do filho ainda ressoa da ligação. Coragem ou paralisia?'],
  ['S4_am_silent', 'Noite de silêncio total. Só ele e a escolha.'],
  ['S4_aw_late', 'Filho dorme depois do passeio ao cais (momento frágil).'],
  ['S4_aw_lost', 'Filho no quarto, relatório pela metade. O fundo.'],
]

for (const [id, desc] of s4variants) {
  doc.font('Courier').fontSize(9).fillColor(C.gold).text(id, doc.page.margins.left, doc.y, { continued: true })
  doc.font('Helvetica').fontSize(9.5).fillColor(C.warm).text('  ' + desc, { lineGap: 1 })
}
doc.moveDown(0.5)

body('Em todas as variantes: Opção A (boat: action, +1) → age. Opção B (boat: hesitation, -1) → não age. Todas avançam para S5.')

heading2('ATO 3 — O Inevitável')

heading3('S5 · A Noite da Tempestade Real — Convergência')
body('Cena sem escolha. Todos os 16 caminhos chegam aqui. A UI exibe apenas um botão [continuar]. O texto é determinado pelas flags family e boat.')

const s5variants = [
  ['family: together + boat: action', 'O filho foi ajudar no cais por iniciativa própria, sem medo. O pai só notou a ausência depois.'],
  ['family: together + boat: hesitation', 'O filho acordou com o temporal. O medo de tempestades voltou. Foi procurar o pai. Escorregou no cais.'],
  ['family: apart + boat: action', 'O filho estava de visita. Foi ajudar no cais. O temporal era maior do que parecia.'],
  ['family: apart + boat: hesitation', 'O filho decidiu ir embora naquela noite. Pegou o bote na escuridão. O pai só descobriu pela manhã.'],
]

for (const [cond, text] of s5variants) {
  doc.font('Courier').fontSize(8.5).fillColor(C.gold).text(cond, doc.page.margins.left, doc.y)
  doc.font('Helvetica-Oblique').fontSize(9.5).fillColor(C.silver).text(text, doc.page.margins.left + 14, doc.y, { width: pageWidth() - 14, lineGap: 2 })
  doc.moveDown(0.35)
}

body('Após o [continuar], a reação de Elliot aparece como stage direction: "[Elliot para de dar direção. Pela primeira vez, ele parece não estar dirigindo — parece estar lembrando.]"')

heading3('S6 · A Luz — A Escolha Final')
body('Meses depois da tragédia. O guarda-faróis, sozinho. A lanterna funciona. A rotina continua.')
bullet('Opção A (light, +2): Mantém a luz acesa. "Ele voltaria pelo brilho dela."')
bullet('Opção B (dark, -2): Apaga a luz. "Não há mais nada a guiar."')
body('Esta escolha é a mais pesada em valor (+2/-2). É o veredicto emocional do jogador sobre o que fazer com a perda.')

// ═══════════════════════════════════════════════════════════════════════════
// PÁG 7 — SISTEMA DE FLAGS E PONTUAÇÃO
// ═══════════════════════════════════════════════════════════════════════════
newPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

heading1('5. Sistema de Flags')

body('O sistema de flags funciona como memória narrativa. Cada escolha pode definir um valor em uma das quatro flags. Essas flags determinam qual variante de texto o jogador vê nas cenas seguintes.')

const flags = [
  ['family', "'together' | 'apart'", 'Definido em S1. Determina qual ramo de S2 o jogador entra e qual variante de S5 ele verá.'],
  ['bond', "'strong' | 'medium' | 'weak'", 'Definido em S2. Determina qual ramo de S3 o jogador entra.'],
  ['storm', "'shared' | 'solo'", 'Definido em S3. Registro da noite do falso alarme (atualmente não condiciona cenas posteriores, mas existe no estado).'],
  ['boat', "'action' | 'hesitation'", 'Definido em S4. Junto com family, determina qual variante de S5 o jogador vê.'],
]

for (const [name, type, desc] of flags) {
  doc.font('Courier-Bold').fontSize(10).fillColor(C.gold).text(name, doc.page.margins.left, doc.y)
  doc.font('Courier').fontSize(9).fillColor(C.dim).text(type, doc.page.margins.left, doc.y)
  doc.font('Helvetica').fontSize(10).fillColor(C.warm).text(desc, doc.page.margins.left + 14, doc.y - doc.currentLineHeight() * 0.5, { width: pageWidth() - 14, lineGap: 2 })
  doc.moveDown(0.5)
}

body('A função resolveVariant() em storyEngine.ts itera as variants de uma cena de cima para baixo, retornando a primeira onde TODOS os campos de condition batem com as flags atuais. Uma condition vazia {} sempre bate e funciona como fallback.')

heading1('6. Sistema de Pontuação — toneScore')

body('Cada escolha tem um toneValue: +1 (light) ou -1 (dark) para S1–S4, e +2/-2 para S6. S5 tem toneValue 0 (não é uma escolha real).')

const scoreTable = [
  ['S1', '±1', 'Decisão sobre a família'],
  ['S2', '±1', 'Como o pai usa o tempo'],
  ['S3', '±1', 'A noite do falso alarme'],
  ['S4', '±1', 'O barco em perigo'],
  ['S5', '0', 'Convergência (sem peso)'],
  ['S6', '±2', 'A luz — peso dobrado'],
]

for (const [scene, value, desc] of scoreTable) {
  doc.font('Courier').fontSize(10).fillColor(C.gold).text(scene.padEnd(6), doc.page.margins.left, doc.y, { continued: true, width: 45 })
  doc.font('Courier').fontSize(10).fillColor(C.warm).text(value.padEnd(6), { continued: true, width: 40 })
  doc.font('Helvetica').fontSize(10).fillColor(C.silver).text(desc)
  doc.moveDown(0.1)
}
doc.moveDown(0.3)

tag('Score máximo:', '+6  (todas as escolhas light)')
tag('Score mínimo:', '-6  (todas as escolhas dark)')
doc.moveDown(0.3)

heading2('Os Quatro Finais')

const endings = [
  ['ending_light_a', '≥ 5', 'Final Luminoso A — Elliot chora. Discurso completo. Nome do jogador aparece sozinho.'],
  ['ending_light_b', '≥ 3', 'Final Luminoso B — Elliot em silêncio. Texto mais curto. Nome do jogador aparece.'],
  ['ending_dark_a', '≥ 1', 'Final Sombrio A — Elliot aplaude sozinho, lento. Uma luz permanece acesa.'],
  ['ending_dark_b', '< 1', 'Final Sombrio B — Elliot sai antes do fim. A assistente transmite agradecimento.'],
]

for (const [id, threshold, desc] of endings) {
  doc.font('Courier').fontSize(9.5).fillColor(C.gold).text(id + '  ', doc.page.margins.left, doc.y, { continued: true, width: 160 })
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(C.warm).text('(toneScore ' + threshold + ')', { continued: true, width: 100 })
  doc.font('Helvetica').fontSize(9.5).fillColor(C.silver).text('  ' + desc, { lineGap: 2 })
  doc.moveDown(0.3)
}

// ═══════════════════════════════════════════════════════════════════════════
// PÁG 8 — OS 4 FINAIS EM DETALHE
// ═══════════════════════════════════════════════════════════════════════════
newPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

heading1('7. Os Quatro Finais em Detalhe')

heading2('ending_light_a — O Retorno (toneScore ≥ 5)')
body('O final mais luminoso. Requer quase todas as escolhas de luz. Elliot chora durante a última tomada, sem disfarçar. Em seguida, fundo preto e um discurso em texto (estilo legenda de documentário):')
quote('"Esse filme não teria existido sem um ator que entendeu, sem que eu precisasse explicar, que algumas luzes não deveriam se apagar. Você me devolveu o meu filho.\n\nAgradeço ao prefeito Harlan Voss, pelo apoio financeiro e pelas pesquisas que tornaram este filme possível.\n\nE acima de tudo: obrigado, [NOME DO JOGADOR]."')
body('O nome que o jogador digitou na intro aparece sozinho na tela, em fonte grande. A menção a Harlan Voss é discreta mas intencional — ele financiou o filme e as "pesquisas". Para quem joga os outros títulos da série, fica implícito que o interesse era o Códice Meridiano.')

heading2('ending_light_b — A Existência (toneScore ≥ 3)')
body('Elliot assiste em silêncio. Não chora. Não escreve nada. O texto é mais contido:')
quote('"O filme existe. Se deveria existir — não tenho certeza. Mas existe.\n\nObrigado, [NOME DO JOGADOR]."')
body('O nome do jogador aparece. Há uma ambiguidade: o filme "existir" é suficiente?')

heading2('ending_dark_a — A Palma Solitária (toneScore ≥ 1)')
body('Elliot levanta devagar da cadeira. Bate palmas sozinho, lento, sem pressa. Diz: "É exatamente isso. Obrigado." Sai. As luzes do estúdio apagam uma a uma. Antes da última — uma permanece acesa. Sem créditos. Silêncio. O jogo fica alguns segundos no escuro antes de exibir o botão de recomeçar.')
body('A luz que permanece é ambígua: é a do farol? É a esperança residual? O jogo não responde.')

heading2('ending_dark_b — A Saída (toneScore < 1)')
body('Elliot sai antes do fim da última cena. Sem avisar. A assistente atravessa o estúdio em direção ao ator:')
quote('"Ele pediu para agradecer."')
body('Não há aplauso. Não há discurso. Não há nome na tela. É o único final onde Elliot literalmente não consegue ficar até o fim.')

// ═══════════════════════════════════════════════════════════════════════════
// PÁG 9 — ARQUITETURA DE CÓDIGO
// ═══════════════════════════════════════════════════════════════════════════
newPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

heading1('8. Arquitetura de Código')

heading2('src/types/game.ts — A Espinha Dorsal')
body('Define todos os tipos TypeScript do sistema. Os mais importantes:')
bullet('Tone: "light" | "dark" — classificação moral de cada escolha')
bullet('Flag — objeto com family, bond, storm, boat para rastrear o estado narrativo')
bullet('Choice — id, label, tone, toneValue, elliotReaction, setsFlag?, nextSceneId')
bullet('SceneVariant — id, condition (Partial<Flag>), narration, elliotPrompt, choices[2]')
bullet('Scene — id, act, title, variants[] (pode ter 1 ou 4+ variantes)')
bullet('GameState — playerName, currentSceneId, toneScore, flags, choiceLog, phase, endingId?')
bullet('GameAction — START_GAME | MAKE_CHOICE | RESOLVE_ENDING | RESTART')

heading2('src/engine/storyEngine.ts')
bullet('resolveVariant(scene, flags) — itera variants, retorna a primeira onde todos os campos de condition batem com flags. condition:{} é fallback universal.')
bullet('resolveEnding(toneScore) — retorna EndingId com base nos 4 thresholds')
bullet('mergeFlags(current, incoming) — spread simples: {...current, ...incoming}')
bullet('ACT_TITLES — mapa de número de ato para string de título')

heading2('src/data/scenes.ts')
body('Array com as 17 cenas do jogo + export scenesMap (Map<string, Scene>) para lookup O(1) por ID. Cada cena tem seu id de roteamento no campo nextSceneId das escolhas. O nextSceneId "ending" é o gatilho para finalizar o jogo.')

heading2('src/data/endings.ts')
body('Array com os 4 objetos Ending: id, minScore, elliotScene (texto de ação do diretor), narrativeText (com placeholder {playerName}), showPlayerName. A função getEnding(id) busca pelo id com fallback para o último.')

heading2('src/hooks/useGameState.ts')
body('useReducer com initialState (phase: "intro", currentSceneId: "s1"). O reducer lida com:')
bullet('START_GAME — reseta o estado e seta playerName + phase: "playing"')
bullet('MAKE_CHOICE — atualiza toneScore, mergeFlags, appenda ao choiceLog. Se nextSceneId === "ending", calcula endingId e muda phase para "ending". Caso contrário, avança currentSceneId.')
bullet('RESOLVE_ENDING — calcula endingId manualmente (usado quando necessário externamente)')
bullet('RESTART — reseta para initialState completo')

heading2('Componentes de Cena')
bullet('Intro.tsx — 7 etapas (waiting-room → name-input → called → studio → envelope → envelope-open → title-card). Auto-avança da title-card após 3.2s.')
bullet('ScenePlayer.tsx — Resolve variant, detecta S5 por scene.id === "s5" (modo leitura com botão único). Fases locais: "reading" (choices) e "reacting" (elliotReaction + continuar). Stage directions [em colchetes] recebem estilo itálico diferenciado de diálogos normais.')
bullet('EndingLight.tsx — Suporta ending_light_a (créditos longos + playerName grande) e ending_light_b (texto curto). Interpolação de {playerName} no narrativeText.')
bullet('EndingDark.tsx — Suporta ending_dark_a (palmas + luzes apagando, uma permanece) e ending_dark_b (Elliot sai, assistente chega).')

heading2('Componentes UI')
bullet('StudioLayout.tsx — Fundo escuro + vignette radial + grain SVG inline + scanlines + spotlight animado (flicker)')
bullet('FadeWrapper.tsx — Wrapper com fade in via opacity transition. Key prop garante remount entre cenas.')
bullet('ChoiceButton.tsx — Label A/B em dourado + texto da escolha. Slide-up animado com delay por índice.')
bullet('DialogueBubble.tsx — Borda esquerda dourada + label "Elliot Marsh" + texto em itálico serif.')

// ═══════════════════════════════════════════════════════════════════════════
// PÁG 10 — TEMAS E INTENÇÕES ARTÍSTICAS
// ═══════════════════════════════════════════════════════════════════════════
newPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

heading1('9. Temas e Intenções Artísticas')

heading2('Paternidade e Ausência')
body('A história central não é sobre o filho que morre — é sobre o pai que escolhe como viver ao lado da vida do filho. As escolhas no jogo não são sobre heroísmo ou vilania; são sobre presença versus distância, sobre o pequeno gesto que acontece ou não acontece às 23h de uma noite qualquer.')

body('O jogo propõe que ausência não é apenas física. O guarda-faróis pode levar a família para o farol e ainda assim estar ausente. Pode estar a quarenta quilômetros e ainda assim ser presença real por uma ligação de telefone.')

heading2('O Inevitável e a Escolha')
body('A morte do filho é inevitável — mas o jogador não sabe disso até a Cena 5. Ele joga acreditando que suas escolhas podem mudar o desfecho. Quando a convergência chega e o barco vira independente de tudo, há uma desorientação intencional.')

quote('"Isso sempre ia acontecer."')

body('Esta linha — que aparece como narração em S5 — é a revelação central do jogo. Não como crueldade de design, mas como espelho de como algumas perdas funcionam: o caminho importa, mesmo que o destino seja o mesmo.')

heading2('A Culpa e Suas Versões')
body('Cada variante de S5 distribui a culpa de forma diferente:')
bullet('Morreu por amor (foi ajudar, não tinha medo) — família unida, pai corajoso')
bullet('Morreu por medo acumulado (acordou em pânico, foi buscar o pai) — família unida, pai hesitante')
bullet('Morreu por coragem emprestada (imitou o pai que viu agir) — família separada, pai corajoso')
bullet('Morreu fugindo (foi embora naquela noite, ressentido) — família separada, pai ausente')
body('Nenhuma versão é "boa". Mas elas são profundamente diferentes em termos do que o pai terá que carregar.')

heading2('A Luz como Metáfora')
body('O farol é a metáfora central do jogo. Uma luz que guia — e que inevitavelmente expõe ao perigo quem ela atrai. O trabalho do guarda-faróis é manter a luz acesa para salvar vidas alheias, enquanto a vida que mais importa a ele está em algum lugar no escuro.')

body('A última escolha do jogo — manter ou apagar a luz — é a pergunta definitiva: depois de perder tudo, você ainda serve de guia para os outros?')

heading2('Elliot como Espelho do Jogador')
body('Ao longo do jogo, o jogador acha que está sendo avaliado por Elliot. No final, percebe que Elliot estava usando o jogo para se avaliar. As reações do diretor às escolhas do ator não eram notas de performance — eram confissões disfarçadas de direção.')

body('O que o jogador escolheu para o personagem ficcionado revela, retroativamente, o que Elliot fez (ou não fez) na vida real. O jogo se torna um espelho duplo: o ator interpreta o diretor; o diretor assiste o ator fazer escolhas que ele mesmo fez.')

heading2('O Códice Meridiano — Camada de Universo Expandido')
body('A referência ao Códice Meridiano nas bibliografias do roteiro é uma pista para jogadores atentos. O Códice é um artefato recorrente no universo de jogos ao qual The Audition pertence. Harlan Voss, citado no final luminoso como "prefeito que financiou o filme e as pesquisas", tem interesse documentado no Códice.')

body('A presença desta referência em The Audition não é necessária para a compreensão do jogo — mas abre uma camada de leitura para quem conhece os outros títulos: o filme "A Luz do Porto" foi financiado não por amor à arte, mas por um interesse que transcende Elliot, o filho, e o farol.')

// ═══════════════════════════════════════════════════════════════════════════
// PÁG 11 — NOTAS DE DESIGN E GLOSSÁRIO
// ═══════════════════════════════════════════════════════════════════════════
newPage()
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0a0a0a')

heading1('10. Notas de Design')

heading2('Por que as opções A e B alternam entre light e dark')
body('No roteiro original, as opções A e B não seguem um padrão fixo de qual representa o caminho de luz. Isso é intencional: o jogador não pode aprender um padrão mecânico ("A é sempre o bom"). Cada cena exige leitura de texto.')

heading2('Por que S5 não tem escolha')
body('A Cena 5 é o momento em que o jogo deixa de fingir que as escolhas controlam o resultado. Após quatro níveis de ramificação, a convergência é um dispositivo narrativo declarado: "isso sempre ia acontecer". Dar uma escolha aqui seria uma mentira de design.')

heading2('Por que S6 tem peso duplo (+2/-2)')
body('A última escolha — manter ou apagar a luz — é a resposta do personagem (e do jogador) à tragédia. É a pergunta "o que você faz com a perda". Dar peso duplo significa que ela pode ser o fator de desempate entre finais luminosos e sombrios, mas também que uma série de escolhas de luz não garante automaticamente o final mais luminoso se o personagem apaga a luz no fim.')

heading2('O nome do jogador')
body('Pedir o nome antes do jogo e usá-lo no final luminoso (especificamente no discurso de Elliot) cria uma quebra de distância emocional. O jogador, que estava interpretando um ator que estava interpretando um personagem, de repente é chamado pelo próprio nome. A ficção colapsa em um único momento.')

heading2('Paleta Visual e Atmosfera')
body('A identidade visual do jogo é deliberadamente cinematográfica e fechada: fundo quase preto (#0a0a0a), dourado envelhecido para acentos, prata para textos secundários, Playfair Display para narração (serifada, formal, literária), Inter para UI (limpa, sem peso emocional). Grain, vignette e scanlines evocam película antiga sem usar imagens.')

heading2('Glossário Rápido')

const glossary = [
  ['toneScore', 'Pontuação acumulada de todas as escolhas. Range: -6 a +6.'],
  ['Flag', 'Objeto de estado narrativo que rastreia o caminho percorrido.'],
  ['variant', 'Versão de texto de uma cena, ativada por condições de flag.'],
  ['condition', 'Objeto parcial de flags que uma variante exige para ser exibida.'],
  ['resolveVariant', 'Função que encontra a variante correta para a cena e o estado atual.'],
  ['light/dark', 'Classificação de tom de uma escolha. Não é moral — é emocional.'],
  ['S5', 'Cena de convergência. Todos os 16 caminhos chegam aqui.'],
  ['ending_light_a/b', 'Finais com toneScore alto. O nome do jogador aparece.'],
  ['ending_dark_a/b', 'Finais com toneScore baixo. Sem nome, sem discurso completo.'],
  ['Códice Meridiano', 'Artefato do universo expandido. Referenciado nas bibliografias do roteiro.'],
  ['Harlan Voss', 'Prefeito que financiou o filme. Mencionado no ending_light_a. Interesse: o Códice.'],
]

for (const [term, def] of glossary) {
  doc.font('Courier-Bold').fontSize(9.5).fillColor(C.gold).text(term + '  ', doc.page.margins.left, doc.y, { continued: true })
  doc.font('Helvetica').fontSize(9.5).fillColor(C.silver).text(def, { lineGap: 2 })
  doc.moveDown(0.15)
}

// ── Rodapé da última página ─────────────────────────────────────────────────
doc.moveDown(1)
rule(C.gold, 0.2)
doc.font('Helvetica').fontSize(9).fillColor(C.dim).text('The Audition  ·  Documentação gerada para NotebookLM  ·  Vite + React + TypeScript + Tailwind CSS', { align: 'center' })

// ── Finaliza ─────────────────────────────────────────────────────────────────
doc.end()

stream.on('finish', () => {
  console.log('PDF gerado com sucesso:', OUTPUT)
})

stream.on('error', (err) => {
  console.error('Erro ao gerar PDF:', err)
  process.exit(1)
})
