export const siteContent = {
  name: 'Joyce Soares de Lima',
  title: 'Advogada e educadora',
  email: 'conecteadv@gmail.com',
  /** Ex.: 'OAB/SP 123.456'. Obrigatório antes da publicação aberta (Provimento CFOAB 205/2021). */
  oab: null as string | null,
  /** Retrato da Joyce para a seção “Sobre”. Coloque o arquivo em public/assets/ e preencha, por exemplo:
   *  { src: './assets/joyce.webp', width: 900, height: 1200, alt: 'Retrato de Joyce Soares de Lima.' } */
  portrait: null as { src: string; width: number; height: number; alt: string } | null,
  hero: {
    heading: 'Advocacia com escuta, diálogo e responsabilidade social.',
    description: 'Atuação jurídica com escuta ativa, diálogo e compreensão dos elementos humanos, sociais e jurídicos envolvidos em cada situação.',
  },
  audiences: [
    { id: 'pessoas', label: 'Para você', description: 'Consumo, família, bancos e previdência: o direito nas situações do dia a dia.' },
    { id: 'empresas', label: 'Para empresas', description: 'Contratos, tributos e organização societária com clareza e responsabilidade.' },
  ],
  practiceAreas: [
    { id: 'consumidor', audience: 'pessoas', title: 'Direito do consumidor', description: 'Relações de consumo, contratos e prestação de serviços.', items: ['Má prestação de serviços, cancelamento e nulidade de contratos', 'Demandas envolvendo energia elétrica, telefonia, companhias aéreas e plataformas de tecnologia', 'Questões educacionais e universitárias, incluindo mandado de segurança quando cabível'] },
    { id: 'civil-familia', audience: 'pessoas', title: 'Direito civil e família', description: 'Vínculos, patrimônio e momentos de reorganização da vida.', items: ['Divórcio, guarda e situações de violência doméstica', 'Alteração de nome e de gênero', 'Inventário, inventário negativo e alvarás', 'Ações indenizatórias, acidentes de trânsito e precatórios'] },
    { id: 'bancario', audience: 'pessoas', title: 'Direito bancário', description: 'Análise das relações entre pessoas e instituições financeiras.', items: ['Nulidade e revisão de contratos bancários', 'Demandas relacionadas ao golpe do Pix', 'Portabilidade de contratos'] },
    { id: 'previdenciario', audience: 'pessoas', title: 'Direito previdenciário', description: 'Orientação sobre aposentadoria e benefícios.', items: ['Aposentadoria', 'Revisão de benefício previdenciário'] },
    { id: 'tributario', audience: 'empresas', title: 'Direito tributário', description: 'Análise de questões e possibilidades na área tributária.', items: ['Incentivos fiscais', 'Análise de possibilidades legais de redução de tributos'] },
    { id: 'contratos', audience: 'empresas', title: 'Contratos e empresas', description: 'Clareza e responsabilidade nas relações contratuais.', items: ['Análise e elaboração de contratos de prestação de serviços e de aluguel', 'Compra de insumos e serviços', 'Apoio a reorganizações societárias, due diligence e fusões e aquisições, quando aplicável'] },
  ],
  process: [
    { title: 'Você escreve', text: 'Descreva por e-mail, em poucas linhas, a situação e o que você precisa. Não é necessário enviar documentos neste primeiro contato.' },
    { title: 'Escuta e análise', text: 'Joyce responde para entender o contexto, esclarecer dúvidas iniciais e avaliar se a questão está dentro da sua área de atuação.' },
    { title: 'Próximos passos', text: 'Havendo atuação, o escopo e as condições são combinados por escrito antes de qualquer providência.' },
  ],
  timeline: [
    { date: '2014', name: 'Advocacia Hernandes Blanco', text: 'Atuação como auxiliar administrativo júnior no contencioso de cobrança de dívidas oriundas de financiamento de veículos.' },
    { date: '2016 — 2018', name: 'Conselho Regional de Farmácia', text: 'Atuação em contencioso tributário, com execução de dívidas em aberto de farmacêuticos e farmácias.' },
    { date: '2020 — 2021', name: 'LeAlmeida', text: 'Análise de contratos para cliente institucional da área da saúde, incluindo aluguel, prestação de serviços e compra de insumos médicos.' },
    { date: '2022 — 2024', name: 'Atuação com escritório de Curitiba', text: 'Apoio a demandas empresariais, elaboração e análise de contratos, reorganizações societárias, due diligence e fusões e aquisições.' },
    { date: 'Atuação independente', name: 'Direito civil, consumidor e direitos humanos', text: 'Atuação em ações cíveis e relações de consumo, bem como em demandas de guarda, violência doméstica e aconselhamento jurídico a pessoas em extrema vulnerabilidade social.' },
  ],
  education: [
    { category: 'Direito', label: 'A base jurídica', items: [
      { title: 'Bacharelado em Direito', institution: 'Universidade Presbiteriana Mackenzie', detail: 'Ênfase em Direito Econômico.' },
      { title: 'Pós-graduação em Direito Contratual', institution: 'Fundação Getulio Vargas — FGV', detail: 'Créditos em direito contratual europeu e fusões e aquisições de empresas.' },
    ] },
    { category: 'Comunicação', label: 'A prática da escuta', items: [
      { title: 'Comunicação Não Violenta', institution: 'Formação em comunicação', detail: '' },
      { title: 'Formação Dinâmica de Juízo', institution: 'Oficina de formação', detail: '' },
    ] },
    { category: 'Educação e cultura', label: 'O olhar comunitário', items: [
      { title: 'Pós-graduação em Educação Comunitária — Mainumby', institution: 'Associação Comunitária Monte Azul e Faculdade Rudolf Steiner de São Paulo', detail: '' },
      { title: 'Brincadeiras de Cantos e Contos e Coral Sincopado', institution: 'Instituto Brincante', detail: '' },
      { title: 'A importância do brincar nas infâncias', institution: 'Aliança pela Infância', detail: '' },
      { title: 'Histórias Terapêuticas', institution: 'Curso com Susan Perrow', detail: '' },
    ] },
  ],
  gallery: [
    { src: './assets/vivencia-2.webp', width: 1600, height: 1200, alt: 'Grupo reunido em um espaço com mesas e estantes de livros.', caption: 'Encontros e trocas' },
    { src: './assets/vivencia-3.webp', width: 900, height: 1200, alt: 'Pessoas reunidas sobre um palco, com uma participante ao microfone.', caption: 'Arte e participação' },
    { src: './assets/vivencia-4.webp', width: 1600, height: 900, alt: 'Seis pessoas reunidas ao ar livre diante de um jardim.', caption: 'Vivências em comunidade' },
    { src: './assets/vivencia-5.webp', width: 720, height: 960, alt: 'Quatro pessoas reunidas em uma fotografia em grupo.', caption: 'Relações e convivência' },
  ],
  testimonials: [] as { text: string; author: string }[],
  /** Artigos curtos de orientação. A seção só aparece quando houver ao menos um item.
   *  Ex.: { title: 'Caí no golpe do Pix: e agora?', date: '2026-11-03', summary: '...', url: 'https://...' } */
  articles: [] as { title: string; date: string; summary: string; url: string }[],
};
