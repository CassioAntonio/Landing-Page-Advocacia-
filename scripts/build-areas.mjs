/* Gera páginas intermediárias e finais das Áreas de Atuação.
   Roda com: node scripts/build-areas.mjs */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', 'public', 'site');

/* ---------- ICONS (svg paths) ---------- */
const ICONS = {
  retirement: '<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  shield:     '<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"/>',
  family:     '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M15 20c0-2 1.5-3.5 4-3.5s3 1.5 3 3"/>',
  scroll:     '<path d="M6 4h12v14a2 2 0 002 2H8a2 2 0 01-2-2V4z"/><path d="M10 8h6M10 12h6M10 16h4"/>',
  handshake:  '<path d="M3 13l4-4 4 4-2 2 4 4 2-2 4-4-4-4M12 11l-2 2"/>',
  briefcase:  '<rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>',
  gavel:      '<path d="M4 20l8-8M14 6l4 4M10 10l8-8 4 4-8 8z"/>',
  scale:      '<path d="M12 3v18M5 7h14M3 17h6l-3-6zM15 17h6l-3-6z"/>',
  home:       '<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-7H10v7H5a1 1 0 01-1-1v-9z"/>',
  cart:       '<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.5 11h11l2-7H6"/>',
  document:   '<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6"/>',
  search:     '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/>',
};

/* ---------- DATA ---------- */
const AREAS = {
  trabalhista: {
    name: 'Direito Trabalhista',
    num: '01',
    intro: 'Defesa estratégica em relações de trabalho — proteção empresarial, conformidade e resolução de conflitos com técnica e discrição.',
    services: [
      {
        slug: 'reclamatorias-trabalhistas',
        icon: 'briefcase',
        title: 'Reclamatórias Trabalhistas',
        short: 'Defesa empresarial em ações individuais e coletivas, com estratégia processual robusta e mitigação de passivos.',
        intro: 'Atuamos na defesa de empresas em reclamatórias trabalhistas com profundidade técnica e visão estratégica, buscando sempre o melhor resultado processual e econômico.',
        sections: [
          { h: 'Defesa Técnica Aprofundada', p: 'Cada peça é elaborada com análise minuciosa do contexto fático e probatório, alinhando jurisprudência atualizada e teses defensivas consistentes.' },
          { h: 'Atuação em Todas as Instâncias', p: 'Acompanhamos o processo desde a audiência inicial até recursos extraordinários no TST e STF, com sustentação oral quando necessário.' },
          { h: 'Acordos Estratégicos', p: 'Avaliamos o custo-benefício de eventuais transações em todas as fases, sempre com foco na preservação do patrimônio e da reputação empresarial.' },
        ],
        highlights: [
          { n: '01', h: 'Estratégia Processual', p: 'Teses defensivas construídas sob medida para o perfil de risco e o setor de atuação do cliente.' },
          { n: '02', h: 'Gestão de Passivo', p: 'Monitoramento ativo da carteira com indicadores de êxito, provisionamento e curva de redução.' },
          { n: '03', h: 'Sustentação Oral', p: 'Atuação direta em tribunais, com defesa oral nos TRTs e no TST sempre que cabível.' },
        ],
        steps: [
          { h: 'Diagnóstico', p: 'Leitura integral dos autos e levantamento de provas, riscos e teses aplicáveis.' },
          { h: 'Estratégia', p: 'Definição de linha defensiva, prova oral, documental e pericial necessárias.' },
          { h: 'Execução', p: 'Atuação ativa em audiências, prazos, despachos e diligências.' },
          { h: 'Encerramento', p: 'Recurso, acordo ou execução com relatório final ao cliente.' },
        ],
        cards: [
          { h: 'Verbas Rescisórias', p: 'Análise técnica de pedidos comuns como horas extras, adicionais, equiparação e estabilidade.' },
          { h: 'Audiências', p: 'Preparo prévio de prepostos, testemunhas e documentos para audiências una e instrutórias.' },
          { h: 'Execução', p: 'Defesa em embargos à execução, exceções de pré-executividade e bloqueio de bens.' },
          { h: 'Recursos', p: 'Recursos ordinários, revistas e agravos com foco em prequestionamento e admissibilidade.' },
        ],
        faq: [
          { q: 'Qual o prazo para o trabalhador ajuizar uma reclamatória trabalhista?', a: 'O empregado tem até 2 anos após o fim do contrato para ajuizar a ação, podendo cobrar verbas dos últimos 5 anos da relação de trabalho (art. 7º, XXIX, CF).' },
          { q: 'A empresa pode ser condenada mesmo com tudo registrado em carteira?', a: 'Sim. A condenação pode decorrer de horas extras não pagas, intervalos suprimidos, acúmulo de função, equiparação salarial, dano moral, entre outras hipóteses, mesmo com vínculo formal regular.' },
          { q: 'Vale a pena fazer acordo em audiência inicial?', a: 'Depende. A avaliação considera o risco real da condenação, o valor pedido, as provas disponíveis e o custo financeiro e reputacional. Recomendamos acordo apenas quando ele é claramente mais vantajoso que o prosseguimento.' },
          { q: 'O preposto precisa ser empregado da empresa?', a: 'Não. Desde a Reforma Trabalhista (Lei 13.467/17), o preposto não precisa ser empregado, mas deve conhecer os fatos da causa, pois sua confissão vincula a empresa.' },
          { q: 'É possível bloquear bens da empresa na execução trabalhista?', a: 'Sim. A execução trabalhista permite bloqueio de contas via SISBAJUD, indisponibilidade de bens, penhora de faturamento e até desconsideração da personalidade jurídica para atingir sócios.' },
        ],
      },
      {
        slug: 'compliance-trabalhista',
        icon: 'shield',
        title: 'Compliance & Auditoria',
        short: 'Auditorias preventivas e adequação de rotinas para reduzir riscos e passivos ocultos.',
        intro: 'O compliance trabalhista é o caminho mais inteligente para reduzir litígios. Mapeamos riscos, corrigimos rotinas e implantamos políticas de boas práticas.',
        sections: [
          { h: 'Diagnóstico Completo', p: 'Mapeamento de jornadas, contratos, terceirizações, NRs aplicáveis, política de cargos e benefícios.' },
          { h: 'Plano de Adequação', p: 'Elaboração de plano de ação por prioridade, com cronograma e indicadores claros.' },
          { h: 'Treinamento e Cultura', p: 'Capacitação de lideranças e RH para sustentação das mudanças no dia a dia operacional.' },
        ],
        highlights: [
          { n: '01', h: 'Prevenção de Litígio', p: 'A correção preventiva custa fração do valor de uma única condenação trabalhista típica.' },
          { n: '02', h: 'Segurança Reputacional', p: 'Empresas em conformidade evitam autuações, multas administrativas e exposição midiática.' },
          { n: '03', h: 'Conformidade Contínua', p: 'Acompanhamento periódico com revisões e atualizações conforme mudanças legislativas.' },
        ],
        steps: [
          { h: 'Auditoria', p: 'Análise documental, entrevistas e mapeamento de riscos com pontuação de severidade.' },
          { h: 'Relatório', p: 'Entrega de matriz de riscos com plano de ação priorizado e responsáveis.' },
          { h: 'Implantação', p: 'Apoio na adequação de rotinas, contratos e políticas internas.' },
          { h: 'Monitoramento', p: 'Reavaliação periódica e atualização da matriz conforme a legislação.' },
        ],
        cards: [
          { h: 'Jornada', p: 'Controle, banco de horas, intervalos, sobreaviso e teletrabalho.' },
          { h: 'Saúde e Segurança', p: 'PGR, PCMSO, CIPA e NRs aplicáveis ao setor.' },
          { h: 'Terceirização', p: 'Análise de contratos, responsabilidade subsidiária e isonomia.' },
          { h: 'Políticas Internas', p: 'Códigos de conduta, canal de denúncias e antiassédio.' },
        ],
        faq: [
          { q: 'O que é compliance trabalhista, na prática?', a: 'É um conjunto estruturado de políticas, processos e controles para garantir que a empresa cumpra integralmente a legislação trabalhista e previdenciária, reduzindo riscos de autuação e condenação.' },
          { q: 'Em quanto tempo uma auditoria trabalhista é concluída?', a: 'O prazo médio varia de 30 a 90 dias, dependendo do porte da empresa, número de unidades e complexidade das rotinas auditadas.' },
          { q: 'Compliance substitui o RH e a contabilidade da empresa?', a: 'Não. O compliance complementa e qualifica o trabalho do RH e da contabilidade, oferecendo visão jurídica especializada sobre riscos que muitas vezes não são percebidos no dia a dia operacional.' },
          { q: 'É obrigatório ter canal de denúncias?', a: 'Para empresas privadas em geral não há obrigação legal específica, mas o canal é exigência reputacional do mercado e fortalece a defesa em casos de assédio moral, sexual e discriminação.' },
          { q: 'Quais riscos podem ser identificados em uma auditoria?', a: 'Jornada sem controle adequado, intervalos suprimidos, acúmulo de função, terceirização irregular, ausência de PGR/PCMSO, falhas em rescisões e cláusulas contratuais nulas, entre outros.' },
        ],
      },
      {
        slug: 'negociacao-coletiva',
        icon: 'handshake',
        title: 'Negociação Coletiva',
        short: 'Condução de acordos e convenções coletivas, mediação sindical e resolução negociada de conflitos.',
        intro: 'Conduzimos mesas de negociação coletiva com técnica jurídica e sensibilidade política, buscando acordos sustentáveis para o negócio.',
        sections: [
          { h: 'Mesa de Negociação', p: 'Representação técnica e estratégica nas tratativas com sindicatos profissionais.' },
          { h: 'Redação de ACT/CCT', p: 'Elaboração de cláusulas seguras, modernas e adequadas à realidade da operação.' },
          { h: 'Mediação e Dissídio', p: 'Atuação preventiva e contenciosa em mediação no MTE e dissídios coletivos.' },
        ],
        highlights: [
          { n: '01', h: 'Negociado x Legislado', p: 'Aproveitamento integral da prevalência do negociado sobre o legislado conforme STF Tema 1.046.' },
          { n: '02', h: 'Cláusulas Sob Medida', p: 'Instrumentos coletivos desenhados para o perfil real da operação e do setor.' },
          { n: '03', h: 'Sustentabilidade', p: 'Foco em acordos que mantenham a competitividade da empresa no médio prazo.' },
        ],
        steps: [
          { h: 'Preparação', p: 'Estudo da base, do sindicato e da pauta histórica de reivindicações.' },
          { h: 'Pauta', p: 'Construção de pauta empresarial com prioridades, limites e cláusulas-chave.' },
          { h: 'Mesa', p: 'Condução das rodadas com técnica e registro formal das tratativas.' },
          { h: 'Formalização', p: 'Redação final, assinatura, depósito e arquivamento do instrumento coletivo.' },
        ],
        cards: [
          { h: 'PLR', p: 'Programas de participação alinhados à lei e à estratégia da empresa.' },
          { h: 'Banco de Horas', p: 'Implantação juridicamente segura via instrumento coletivo.' },
          { h: 'Greve', p: 'Atuação preventiva e em mediação durante movimentos paredistas.' },
          { h: 'Cláusulas Sociais', p: 'Benefícios, saúde, segurança e estabilidades específicas.' },
        ],
        faq: [
          { q: 'Qual a diferença entre ACT e CCT?', a: 'O Acordo Coletivo de Trabalho (ACT) é firmado entre uma empresa e o sindicato profissional. A Convenção Coletiva (CCT) é firmada entre os sindicatos patronal e profissional, aplicando-se a toda a categoria.' },
          { q: 'Cláusulas de instrumento coletivo prevalecem sobre a CLT?', a: 'Em regra, sim. O STF (Tema 1.046) consolidou a prevalência do negociado sobre o legislado, exceto quanto a direitos absolutamente indisponíveis, como salário mínimo, FGTS e normas de saúde e segurança.' },
          { q: 'O que acontece se a negociação coletiva fracassar?', a: 'A categoria pode propor mediação no MTE, ajuizar dissídio coletivo no TRT ou deflagrar greve. Cada caminho exige estratégia jurídica específica e tem implicações operacionais distintas.' },
          { q: 'A empresa é obrigada a aplicar a CCT da categoria?', a: 'Sim. A CCT firmada pelo sindicato patronal correspondente é de aplicação obrigatória a todas as empresas da categoria, inclusive não associadas, conforme art. 611 da CLT.' },
          { q: 'PLR paga conforme CCT tem isenção de encargos?', a: 'Sim, desde que observados os requisitos da Lei 10.101/2000: instrumento formal, metas claras, prazo definido e periodicidade mínima. Caso contrário, a PLR pode ser desclassificada e gerar encargos.' },
        ],
      },
      {
        slug: 'rescisoes-acordos-individuais',
        icon: 'document',
        title: 'Rescisões & Acordos Individuais',
        short: 'Assessoria em desligamentos, acordos individuais (art. 484-A) e PDV/PDI com segurança jurídica.',
        intro: 'A forma como uma relação de trabalho se encerra define boa parte do risco de passivo. Estruturamos rescisões e acordos com técnica e proteção integral.',
        sections: [
          { h: 'Desligamentos Seguros', p: 'Cálculo, conferência e formalização de verbas rescisórias e quitações.' },
          { h: 'Acordo Extrajudicial', p: 'Homologação na Justiça do Trabalho de acordos individuais conforme art. 855-B da CLT.' },
          { h: 'PDV/PDI', p: 'Estruturação jurídica de programas coletivos de desligamento incentivado.' },
        ],
        highlights: [
          { n: '01', h: 'Rescisão por Acordo', p: 'Modalidade do art. 484-A CLT, com regras próprias de aviso, multa de FGTS e seguro-desemprego.' },
          { n: '02', h: 'Quitação Eficaz', p: 'Termos com lastro jurisprudencial que efetivamente blindam a empresa contra ações futuras.' },
          { n: '03', h: 'PDV Estruturado', p: 'Programas com adesão segura, sem caracterização de coação ou nulidade.' },
        ],
        steps: [
          { h: 'Análise do Contrato', p: 'Mapeamento de estabilidades, benefícios e particularidades do vínculo.' },
          { h: 'Cálculo', p: 'Conferência detalhada de verbas, médias, multas e descontos.' },
          { h: 'Formalização', p: 'Redação de termos de rescisão, quitação e acordo conforme cada modalidade.' },
          { h: 'Homologação', p: 'Apresentação à Justiça do Trabalho quando aplicável (art. 855-B CLT).' },
        ],
        cards: [
          { h: 'Cálculo', p: 'Conferência de saldos, médias, multas e descontos legais.' },
          { h: 'Termo de Quitação', p: 'Redação de termo amplo, dentro dos limites jurisprudenciais.' },
          { h: 'Estabilidades', p: 'Análise de gestante, dirigente sindical, CIPA e acidentado.' },
          { h: 'Litígio Reverso', p: 'Defesa em ações posteriores ao desligamento.' },
        ],
        faq: [
          { q: 'Como funciona a rescisão por acordo entre as partes?', a: 'Prevista no art. 484-A da CLT, paga metade do aviso prévio e metade da multa de 40% do FGTS, permite saque de 80% do FGTS e não dá direito ao seguro-desemprego.' },
          { q: 'O termo de quitação dá quitação total do contrato?', a: 'Em regra, não. A jurisprudência limita a eficácia do termo às verbas especificamente discriminadas. Apenas o acordo extrajudicial homologado (art. 855-B CLT) gera quitação ampla.' },
          { q: 'O que é PDV e quais cuidados ele exige?', a: 'O Plano de Desligamento Voluntário é um programa coletivo de incentivo à saída. Exige instrumento coletivo, regras claras de adesão e ausência total de coação para gerar quitação válida.' },
          { q: 'Gestante e cipeiro podem ser dispensados sem justa causa?', a: 'Não. Gestantes têm estabilidade até 5 meses após o parto; cipeiros eleitos têm estabilidade desde o registro da candidatura até 1 ano após o mandato. A dispensa imotivada é nula.' },
          { q: 'Vale a pena homologar acordo extrajudicial na Justiça do Trabalho?', a: 'Sim, quando o objetivo é quitação ampla e segura do contrato. A homologação confere efeito de coisa julgada, eliminando o risco de reclamatória posterior sobre os mesmos fatos.' },
        ],
      },
    ],
  },

  previdenciario: {
    name: 'Direito Previdenciário',
    num: '02',
    intro: 'Assessoria completa em benefícios do INSS e regimes próprios — aposentadorias, auxílios, pensões e teses estratégicas.',
    services: [
      {
        slug: 'aposentadorias',
        icon: 'retirement',
        title: 'Aposentadorias',
        short: 'Análise técnica das hipóteses de aposentadoria por tempo, idade, especial e pessoa com deficiência.',
        intro: 'Cada hipótese de aposentadoria exige análise particular. Realizamos planejamento previdenciário individualizado para identificar a melhor estratégia.',
        sections: [
          { h: 'Planejamento Previdenciário', p: 'Simulações detalhadas considerando regras de transição, pedágios e fator previdenciário.' },
          { h: 'Aposentadoria Especial', p: 'Análise de PPP, LTCAT e exposição a agentes nocivos para atividades de risco.' },
          { h: 'Aposentadoria da PCD', p: 'Avaliação de grau de deficiência e tempo de contribuição na condição de PCD.' },
        ],
        highlights: [
          { n: '01', h: 'Reforma da Previdência', p: 'Aplicação das regras de transição da EC 103/2019 conforme o caso concreto.' },
          { n: '02', h: 'Melhor Benefício', p: 'Cálculo comparativo entre todas as hipóteses possíveis antes do requerimento.' },
          { n: '03', h: 'Direito Adquirido', p: 'Identificação de direito adquirido às regras anteriores à Reforma.' },
        ],
        steps: [
          { h: 'CNIS', p: 'Análise crítica do CNIS, identificação de pendências e vínculos não reconhecidos.' },
          { h: 'Simulação', p: 'Cálculo de cenários comparando RMI, data de início e regime aplicável.' },
          { h: 'Requerimento', p: 'Pedido administrativo bem instruído ou ação judicial quando necessário.' },
          { h: 'Acompanhamento', p: 'Monitoramento do processo até a concessão e revisão da RMI.' },
        ],
        cards: [
          { h: 'Tempo de Contribuição', p: 'Direito adquirido pré-EC 103/2019 e regras de transição.' },
          { h: 'Idade', p: 'Requisitos urbanos e rurais, com regras de pontos e idade mínima.' },
          { h: 'Especial', p: 'Atividades insalubres, periculosas e penosas devidamente comprovadas.' },
          { h: 'Servidor Público', p: 'RPPS, paridade, integralidade e regras de transição específicas.' },
        ],
        faq: [
          { q: 'Quais as regras de aposentadoria após a Reforma de 2019?', a: 'A EC 103/2019 trouxe idade mínima (62 mulheres / 65 homens) e tempo mínimo de contribuição (15 anos para mulheres / 20 anos para homens novos no sistema), além de cinco regras de transição para quem já contribuía.' },
          { q: 'O que é o planejamento previdenciário e por que ele é importante?', a: 'É a análise prévia ao requerimento, que simula todas as hipóteses possíveis (regras permanentes, transições e direito adquirido) e indica o melhor momento e modalidade, evitando aposentadorias com valor inferior ao devido.' },
          { q: 'Quem trabalhou exposto a agentes nocivos tem direito a aposentadoria especial?', a: 'Sim, desde que comprove 15, 20 ou 25 anos de exposição habitual e permanente (conforme o agente) mediante PPP e LTCAT. Após a Reforma, há também requisito de pontuação ou idade mínima conforme o caso.' },
          { q: 'Quais documentos preciso reunir antes de pedir aposentadoria?', a: 'CNIS atualizado, carteiras de trabalho, contratos, holerites antigos, PPPs, certidões militares e de tempo de serviço público, comprovantes de atividade rural e declarações de exposição a agentes nocivos.' },
          { q: 'Posso continuar trabalhando depois de me aposentar?', a: 'Sim, na aposentadoria comum, sem prejuízo do benefício. Já na aposentadoria especial, o retorno à atividade nociva implica cessação do benefício, conforme atual posicionamento do STF.' },
        ],
      },
      {
        slug: 'beneficios-por-incapacidade',
        icon: 'shield',
        title: 'Benefícios por Incapacidade',
        short: 'Auxílio por incapacidade temporária, aposentadoria por invalidez e auxílio-acidente.',
        intro: 'A negativa indevida do INSS é uma das principais causas de litígio. Atuamos com perícias robustas e análise médico-jurídica do caso.',
        sections: [
          { h: 'Auxílio-Doença', p: 'Concessão e restabelecimento do benefício por incapacidade temporária.' },
          { h: 'Aposentadoria por Invalidez', p: 'Reconhecimento de incapacidade permanente para qualquer atividade laboral.' },
          { h: 'Auxílio-Acidente', p: 'Benefício indenizatório por sequelas que reduzem a capacidade de trabalho.' },
        ],
        highlights: [
          { n: '01', h: 'Qualidade de Segurado', p: 'Análise rigorosa do período de graça e da manutenção da condição de segurado.' },
          { n: '02', h: 'Carência', p: 'Avaliação da carência exigida e das hipóteses de dispensa em doenças graves.' },
          { n: '03', h: 'Perícia Judicial', p: 'Preparo técnico de quesitos e acompanhamento ativo da perícia.' },
        ],
        steps: [
          { h: 'Análise Médica', p: 'Organização cronológica de laudos, exames e prontuários.' },
          { h: 'Via Administrativa', p: 'Requerimento ou recurso no INSS com instrução completa.' },
          { h: 'Via Judicial', p: 'Ação contra o INSS quando há indeferimento ou cessação indevida.' },
          { h: 'Cumprimento', p: 'Implantação do benefício e cobrança dos atrasados.' },
        ],
        cards: [
          { h: 'Perícia Médica', p: 'Preparo de quesitos e acompanhamento técnico da perícia judicial.' },
          { h: 'Documentação', p: 'Organização de prontuários, exames, laudos e relatórios médicos.' },
          { h: 'Recursos Administrativos', p: 'Atuação perante a JR e o CRPS antes da via judicial.' },
          { h: 'Acréscimo 25%', p: 'Pedido de adicional para inválidos que necessitem de assistência permanente.' },
        ],
        faq: [
          { q: 'Qual a diferença entre auxílio-doença e aposentadoria por invalidez?', a: 'O auxílio (benefício por incapacidade temporária) é concedido enquanto durar a incapacidade para o trabalho atual. A invalidez (incapacidade permanente) exige incapacidade total e permanente para qualquer atividade laboral.' },
          { q: 'Tenho que cumprir carência para receber auxílio-doença?', a: 'Em regra, sim: 12 contribuições mensais. A carência é dispensada em casos de acidente de qualquer natureza, doença profissional e nas doenças graves listadas em lei (como neoplasia maligna, cardiopatia grave, AIDS).' },
          { q: 'O INSS negou meu auxílio-doença. O que fazer?', a: 'É possível apresentar recurso administrativo à Junta de Recursos do CRPS no prazo de 30 dias ou ajuizar ação judicial diretamente, com pedido de tutela de urgência para concessão imediata do benefício.' },
          { q: 'O que é o auxílio-acidente e quando é devido?', a: 'É um benefício indenizatório (50% do salário de benefício) pago quando, após consolidação de sequelas decorrentes de acidente, há redução da capacidade para o trabalho habitual. É cumulável com salário e cessa apenas com a aposentadoria.' },
          { q: 'Quem está aposentado por invalidez pode receber acréscimo de 25%?', a: 'Sim. O segurado aposentado por invalidez que necessitar de assistência permanente de outra pessoa tem direito ao adicional de 25% sobre o valor do benefício, mesmo que exceda o teto do INSS.' },
        ],
      },
      {
        slug: 'beneficios-aos-dependentes',
        icon: 'family',
        title: 'Benefícios aos Dependentes',
        short: 'Pensão por morte, auxílio-reclusão e BPC/LOAS — proteção para a família do segurado.',
        intro: 'A proteção previdenciária se estende aos dependentes. Atuamos no reconhecimento de vínculos, qualidade de segurado e concessão dos benefícios.',
        sections: [
          { h: 'Pensão por Morte', p: 'Concessão para cônjuge, companheiro(a), filhos e dependentes designados.' },
          { h: 'Auxílio-Reclusão', p: 'Benefício para dependentes de segurado de baixa renda recolhido à prisão.' },
          { h: 'BPC/LOAS', p: 'Benefício assistencial ao idoso e à pessoa com deficiência em situação de miserabilidade.' },
        ],
        highlights: [
          { n: '01', h: 'Qualidade de Dependente', p: 'Comprovação técnica de união estável, dependência econômica e demais hipóteses.' },
          { n: '02', h: 'Cota e Duração', p: 'Cálculo correto das cotas conforme a EC 103/2019 e da duração do benefício.' },
          { n: '03', h: 'BPC/LOAS', p: 'Análise da deficiência ou da idade e da miserabilidade conforme a Lei 8.742/93.' },
        ],
        steps: [
          { h: 'Documentação', p: 'Reunião de certidões, comprovantes e provas de dependência.' },
          { h: 'Requerimento', p: 'Pedido administrativo com instrução completa para evitar indeferimentos.' },
          { h: 'Recurso/Ação', p: 'Atuação na JR, no CRPS ou em juízo quando houver negativa.' },
          { h: 'Manutenção', p: 'Acompanhamento de revisões, cessações indevidas e habilitação de novos dependentes.' },
        ],
        cards: [
          { h: 'União Estável', p: 'Prova de convivência para reconhecimento como dependente.' },
          { h: 'Dependência Econômica', p: 'Comprovação documental e testemunhal quando exigível.' },
          { h: 'Acumulação', p: 'Análise das regras de acumulação após a EC 103/2019.' },
          { h: 'Revisão de Cota', p: 'Recomposição quando da perda de qualidade de outros dependentes.' },
        ],
        faq: [
          { q: 'Quem tem direito à pensão por morte?', a: 'Cônjuge, companheiro(a), filhos menores de 21 anos ou inválidos, pais e irmãos (estes dois últimos com prova de dependência econômica). A ordem é preferencial: classes seguintes só recebem na ausência das anteriores.' },
          { q: 'Por quanto tempo é paga a pensão por morte?', a: 'Para cônjuge e companheiro, o prazo varia de 3 anos a vitalício, conforme idade na data do óbito e tempo de união. Para filhos, em regra, até os 21 anos, salvo invalidez ou deficiência.' },
          { q: 'Companheiro de união estável tem direito a pensão?', a: 'Sim. A união estável equipara-se ao casamento para fins previdenciários, exigindo comprovação por documentos como contrato de convivência, contas conjuntas, dependentes em comum e declarações de terceiros.' },
          { q: 'O que é o BPC/LOAS e quem pode receber?', a: 'É benefício assistencial de 1 salário mínimo pago ao idoso (65+) ou à pessoa com deficiência, cuja renda familiar por pessoa seja inferior a 1/4 do salário mínimo. Não exige contribuição prévia ao INSS.' },
          { q: 'É possível acumular pensão por morte com aposentadoria?', a: 'Sim, mas com redução. A EC 103/2019 permite acumular o benefício de maior valor integralmente e parte do menor, em percentuais decrescentes conforme faixas do salário mínimo.' },
        ],
      },
      {
        slug: 'revisoes-teses-estrategicas',
        icon: 'search',
        title: 'Revisões & Teses Estratégicas',
        short: 'Revisão da vida toda, teto, buraco negro e demais teses para majoração de benefícios.',
        intro: 'Muitos benefícios são concedidos com valores aquém do devido. Identificamos teses revisionais aplicáveis ao seu caso.',
        sections: [
          { h: 'Revisão da Vida Toda', p: 'Inclusão de contribuições anteriores a julho/1994 no cálculo do benefício, conforme tese fixada pelo STF.' },
          { h: 'Revisão do Teto', p: 'Recomposição de benefícios limitados ao teto por força das EC 20/98 e 41/03.' },
          { h: 'Buraco Negro/Verde', p: 'Recálculo de benefícios concedidos em períodos específicos com critérios indevidos.' },
        ],
        highlights: [
          { n: '01', h: 'Análise de Vantajosidade', p: 'Cada tese é precedida por cálculo técnico para confirmar ganho real ao segurado.' },
          { n: '02', h: 'Decadência', p: 'Atenção ao prazo decenal de revisão a partir do primeiro pagamento.' },
          { n: '03', h: 'Atrasados', p: 'Cobrança de até 5 anos retroativos da data de ajuizamento.' },
        ],
        steps: [
          { h: 'Carta de Concessão', p: 'Análise da memória de cálculo e da composição do salário de benefício.' },
          { h: 'Tese Aplicável', p: 'Identificação das teses revisionais cabíveis ao caso concreto.' },
          { h: 'Cálculo', p: 'Simulação técnica para confirmar a vantajosidade da revisão.' },
          { h: 'Ação', p: 'Ajuizamento da revisional com pedido de RMI majorada e atrasados.' },
        ],
        cards: [
          { h: 'Vida Toda', p: 'Análise da vantajosidade caso a caso, com simulação técnica.' },
          { h: 'Teto', p: 'Aplicação dos novos tetos a benefícios anteriores.' },
          { h: 'Atividade Especial', p: 'Reconhecimento de períodos especiais não computados administrativamente.' },
          { h: 'Atrasados', p: 'Cobrança de valores retroativos com correção e juros.' },
        ],
        faq: [
          { q: 'O que é a Revisão da Vida Toda?', a: 'É a tese que permite incluir, no cálculo do benefício, as contribuições feitas antes de julho de 1994, quando isso for mais vantajoso. O STF reconheceu o direito, mas o tema segue em debate no Supremo, exigindo análise atualizada.' },
          { q: 'Qual o prazo para revisar um benefício do INSS?', a: 'O prazo decadencial é de 10 anos, contados do primeiro pagamento do benefício ou da decisão administrativa que indeferir revisão. Após esse prazo, perde-se o direito de revisar o ato concessório.' },
          { q: 'Posso pedir revisão de benefício já cessado?', a: 'Em regra, sim, dentro do prazo decadencial. A revisão alcança eventuais atrasados não prescritos (últimos 5 anos antes do ajuizamento), mesmo que o benefício não esteja mais ativo.' },
          { q: 'Como saber se vale a pena revisar meu benefício?', a: 'É indispensável a análise da carta de concessão e do CNIS, seguida de cálculo técnico comparativo. Sem esse estudo, a ação revisional pode ser financeiramente desinteressante ou até prejudicial.' },
          { q: 'Quanto tempo retroage o pagamento dos atrasados?', a: 'Os atrasados retroagem até 5 anos antes da data do ajuizamento da ação, conforme prescrição quinquenal das parcelas vencidas, com correção monetária e juros legais.' },
        ],
      },
    ],
  },

  civel: {
    name: 'Direito Cível',
    num: '03',
    intro: 'Atuação ampla em contratos, responsabilidade civil, família, sucessões, imobiliário e relações de consumo.',
    services: [
      {
        slug: 'contratos-responsabilidade-civil',
        icon: 'document',
        title: 'Contratos & Responsabilidade Civil',
        short: 'Elaboração, revisão e contencioso contratual; indenizações por dano material, moral e estético.',
        intro: 'Boa parte dos litígios cíveis nasce de contratos mal redigidos. Atuamos consultivamente na prevenção e contenciosamente na defesa de direitos.',
        sections: [
          { h: 'Elaboração e Revisão', p: 'Contratos sob medida com cláusulas equilibradas e proteção adequada ao seu negócio.' },
          { h: 'Cobrança e Inadimplemento', p: 'Ações de cobrança, execução, monitória, busca e apreensão.' },
          { h: 'Indenizações', p: 'Reparação por danos materiais, morais, estéticos e lucros cessantes.' },
        ],
        highlights: [
          { n: '01', h: 'Prevenção Contratual', p: 'Cláusulas que antecipam disputas e definem regras claras de solução.' },
          { n: '02', h: 'Cobrança Eficiente', p: 'Escolha da via processual mais célere para cada espécie de inadimplemento.' },
          { n: '03', h: 'Reparação Integral', p: 'Postulação adequada de dano emergente, lucro cessante, moral e estético.' },
        ],
        steps: [
          { h: 'Diagnóstico', p: 'Análise documental e identificação dos direitos e riscos envolvidos.' },
          { h: 'Estratégia', p: 'Definição entre composição extrajudicial, mediação ou contencioso.' },
          { h: 'Ação', p: 'Elaboração de peças, produção de prova e atuação ativa em audiências.' },
          { h: 'Cumprimento', p: 'Execução de sentença, pagamento ou cumprimento da obrigação fixada.' },
        ],
        cards: [
          { h: 'Locação', p: 'Revisional, despejo, renovatória e ação de cobrança.' },
          { h: 'Prestação de Serviços', p: 'Defesa e ajuizamento em contratos descumpridos.' },
          { h: 'Compra e Venda', p: 'Rescisão, evicção, vícios redibitórios e adimplemento substancial.' },
          { h: 'Dano Moral', p: 'Análise jurisprudencial e quantum indenizatório adequado.' },
        ],
        faq: [
          { q: 'Quando se configura responsabilidade civil?', a: 'Quando há conduta (ação ou omissão), dano, nexo causal entre eles e, em regra, culpa do agente. Em hipóteses legais, a responsabilidade é objetiva, dispensando culpa (CDC, atividade de risco, Estado).' },
          { q: 'Como é calculado o valor da indenização por dano moral?', a: 'Não há tabela legal. O juiz fixa com base na gravidade do fato, intensidade do sofrimento, condição econômica das partes e função pedagógica e compensatória, observando precedentes do STJ para casos similares.' },
          { q: 'Qual o prazo para cobrar uma dívida contratual?', a: 'A pretensão de cobrança de dívidas líquidas constantes de instrumento público ou particular prescreve em 5 anos (art. 206, §5º, I, CC). Outras obrigações têm prazos próprios — a análise deve ser caso a caso.' },
          { q: 'Vale a pena rescindir contrato em vez de cumpri-lo?', a: 'Depende do interesse contratual remanescente e do custo de cumprimento versus dano emergente. Avaliamos cumprimento forçado, perdas e danos, exceção do contrato não cumprido ou resolução com indenização.' },
          { q: 'Posso cobrar lucros cessantes além do prejuízo direto?', a: 'Sim. Os lucros cessantes correspondem ao que se deixou razoavelmente de ganhar em razão do inadimplemento, exigindo prova de probabilidade objetiva do ganho, não bastando expectativa abstrata.' },
        ],
      },
      {
        slug: 'familia-sucessoes',
        icon: 'family',
        title: 'Família & Sucessões',
        short: 'Divórcio, guarda, alimentos, inventário, testamento e planejamento sucessório.',
        intro: 'Temas de família e sucessões exigem técnica e, sobretudo, sensibilidade. Conduzimos cada caso com a discrição que a matéria pede.',
        sections: [
          { h: 'Família', p: 'Divórcio consensual e litigioso, regulamentação de guarda, visitas, pensão alimentícia e união estável.' },
          { h: 'Inventário', p: 'Procedimento judicial e extrajudicial, partilha amigável ou litigiosa.' },
          { h: 'Planejamento Sucessório', p: 'Estruturação patrimonial via doações, testamentos e holdings familiares.' },
        ],
        highlights: [
          { n: '01', h: 'Discrição', p: 'Condução reservada, com privacidade absoluta sobre fatos e patrimônio.' },
          { n: '02', h: 'Economia Tributária', p: 'Planejamento sucessório com otimização lícita de ITCMD e custos cartoriais.' },
          { n: '03', h: 'Proteção da Família', p: 'Estruturas que preservam o patrimônio em casos de conflito familiar.' },
        ],
        steps: [
          { h: 'Escuta', p: 'Compreensão integral do contexto familiar e patrimonial envolvido.' },
          { h: 'Estratégia', p: 'Definição entre via consensual ou litigiosa, judicial ou extrajudicial.' },
          { h: 'Condução', p: 'Negociação, redação de escrituras ou atuação em juízo.' },
          { h: 'Encerramento', p: 'Formalização registral e orientação sobre efeitos futuros.' },
        ],
        cards: [
          { h: 'Divórcio', p: 'Consensual via cartório ou judicial com partilha de bens.' },
          { h: 'Alimentos', p: 'Fixação, revisão, exoneração e execução com prisão civil.' },
          { h: 'Guarda', p: 'Unilateral, compartilhada, alienação parental.' },
          { h: 'Testamento', p: 'Particular, público e cerrado, com respeito à legítima.' },
        ],
        faq: [
          { q: 'O divórcio pode ser feito em cartório?', a: 'Sim, desde que o casal seja maior, capaz, esteja de acordo quanto a todos os pontos e não haja filhos menores ou incapazes. O divórcio extrajudicial é mais rápido e econômico que o judicial.' },
          { q: 'Como é definida a guarda dos filhos?', a: 'A regra é a guarda compartilhada, salvo quando um dos genitores não tiver condições de exercê-la ou houver risco ao menor. A guarda compartilhada não exige residência alternada — define a tomada conjunta de decisões.' },
          { q: 'Como é calculada a pensão alimentícia?', a: 'Pelo binômio necessidade do alimentando e possibilidade do alimentante. Não há percentual legal: a média jurisprudencial fica entre 20% e 30% dos rendimentos líquidos, mas cada caso exige análise concreta.' },
          { q: 'O inventário pode ser feito em cartório?', a: 'Sim, quando todos os herdeiros forem maiores, capazes, estiverem de acordo e não houver testamento (ou ele já tiver sido judicialmente cumprido). O inventário extrajudicial é significativamente mais rápido.' },
          { q: 'Por que fazer planejamento sucessório em vida?', a: 'Para reduzir custos com ITCMD e cartório, evitar litígios entre herdeiros, preservar a continuidade de empresas familiares e garantir que a vontade do titular do patrimônio prevaleça, dentro dos limites da legítima.' },
        ],
      },
      {
        slug: 'imobiliario',
        icon: 'home',
        title: 'Direito Imobiliário',
        short: 'Compra e venda, usucapião, regularização, condomínio, incorporações e contratos imobiliários.',
        intro: 'O patrimônio imobiliário merece proteção técnica em todas as etapas — da aquisição à regularização registral.',
        sections: [
          { h: 'Aquisição Segura', p: 'Due diligence completa em imóveis, certidões e análise documental.' },
          { h: 'Usucapião', p: 'Ações de usucapião extraordinária, ordinária, especial e extrajudicial.' },
          { h: 'Condomínio', p: 'Defesa de condomínios e condôminos em conflitos diversos.' },
        ],
        highlights: [
          { n: '01', h: 'Segurança Registral', p: 'Verificação ampla da cadeia dominial e ônus reais que recaem sobre o imóvel.' },
          { n: '02', h: 'Usucapião Extrajudicial', p: 'Caminho ágil pela via cartorária quando há prova robusta da posse.' },
          { n: '03', h: 'Distrato Imobiliário', p: 'Aplicação correta da Lei 13.786/18 nas rescisões de promessas de compra e venda.' },
        ],
        steps: [
          { h: 'Due Diligence', p: 'Levantamento de mais de 30 certidões e análise crítica do registro.' },
          { h: 'Formalização', p: 'Redação de contratos, escrituras e instrumentos particulares.' },
          { h: 'Registro', p: 'Acompanhamento dos atos no CRI até a efetivação da matrícula.' },
          { h: 'Contencioso', p: 'Atuação judicial nas hipóteses de litígio possessório ou dominial.' },
        ],
        cards: [
          { h: 'Due Diligence', p: 'Mais de 30 certidões e análise registral, fiscal e judicial.' },
          { h: 'Incorporação', p: 'Memorial, convenção, individualização e habite-se.' },
          { h: 'Distrato', p: 'Lei 13.786/18 e jurisprudência aplicável aos lançamentos.' },
          { h: 'Adjudicação', p: 'Adjudicação compulsória e regularização de promessas.' },
        ],
        faq: [
          { q: 'Quais cuidados tomar antes de comprar um imóvel?', a: 'Realizar due diligence completa: certidões do imóvel (matrícula atualizada, ônus, fiscal), do vendedor (cíveis, trabalhistas, criminais, executivos fiscais e protestos) e do cônjuge, além de verificar regularidade construtiva e débitos condominiais.' },
          { q: 'Quais os requisitos para usucapir um imóvel?', a: 'Posse mansa, pacífica, contínua e com ânimo de dono pelo prazo legal — que varia de 5 a 15 anos conforme a modalidade (extraordinária, ordinária, especial urbana, rural ou familiar) e a presença de justo título e boa-fé.' },
          { q: 'A construtora pode reter quanto em caso de distrato?', a: 'Em loteamentos e incorporações regidos pela Lei 13.786/18, a retenção é de até 25% do valor pago (ou 50% no patrimônio de afetação). Cláusulas que extrapolem esses limites são reduzíveis judicialmente.' },
          { q: 'O que faz a adjudicação compulsória?', a: 'É a ação que obriga o vendedor a outorgar a escritura definitiva quando o promitente comprador já quitou o preço, mas o vendedor se recusa a formalizar a transferência no registro de imóveis.' },
          { q: 'Quem responde por dívidas anteriores de um imóvel adquirido?', a: 'Débitos propter rem (IPTU, condomínio) acompanham o imóvel e podem ser cobrados do novo proprietário, com direito de regresso contra o antigo. Por isso a due diligence fiscal e condominial é indispensável.' },
        ],
      },
      {
        slug: 'consumidor',
        icon: 'cart',
        title: 'Direito do Consumidor',
        short: 'Defesa em relações de consumo, cobranças indevidas, vícios e fatos do produto/serviço.',
        intro: 'O CDC é uma poderosa ferramenta de equilíbrio nas relações de consumo. Atuamos na defesa do consumidor lesado por práticas abusivas.',
        sections: [
          { h: 'Cobranças Indevidas', p: 'Restituição em dobro de valores cobrados sem amparo contratual ou legal.' },
          { h: 'Vícios e Defeitos', p: 'Trocas, abatimentos e reparação por produtos e serviços defeituosos.' },
          { h: 'Inscrição Indevida', p: 'Indenização por negativação em SPC/Serasa sem origem comprovada.' },
        ],
        highlights: [
          { n: '01', h: 'Inversão do Ônus', p: 'Aplicação do art. 6º, VIII, CDC, transferindo ao fornecedor a prova quando cabível.' },
          { n: '02', h: 'Restituição em Dobro', p: 'Aplicação do art. 42, parágrafo único, CDC, conforme atualização do STJ.' },
          { n: '03', h: 'Tutela de Urgência', p: 'Pedido liminar de baixa de negativação, religação de serviços e cobertura de plano.' },
        ],
        steps: [
          { h: 'Reclamação', p: 'Tentativa prévia documentada (canais oficiais, consumidor.gov, Procon).' },
          { h: 'Notificação', p: 'Notificação extrajudicial formal quando estratégica.' },
          { h: 'Ação Judicial', p: 'Ajuizamento com pedido de tutela e indenização.' },
          { h: 'Cumprimento', p: 'Execução e fiscalização da efetiva reparação.' },
        ],
        cards: [
          { h: 'Bancos', p: 'Tarifas abusivas, juros, capitalização e seguros não contratados.' },
          { h: 'Planos de Saúde', p: 'Negativas de cobertura, reajustes e descredenciamento.' },
          { h: 'Aéreo', p: 'Cancelamento, atraso, overbooking e extravio de bagagem.' },
          { h: 'E-commerce', p: 'Não entrega, propaganda enganosa e direito de arrependimento.' },
        ],
        faq: [
          { q: 'Quando se aplica a restituição em dobro do valor cobrado?', a: 'Quando há cobrança indevida e o consumidor efetivamente paga o valor. O STJ admite a devolução em dobro mesmo sem má-fé, exigindo apenas que a cobrança seja contrária à boa-fé objetiva (EAREsp 676.608/RS).' },
          { q: 'Qual o prazo para reclamar de vício em produto ou serviço?', a: 'Para vícios aparentes: 30 dias para bens não duráveis e 90 dias para duráveis, contados da entrega. Para vícios ocultos, os prazos começam a contar a partir da descoberta do defeito.' },
          { q: 'Negativação indevida sempre gera dano moral?', a: 'Em regra, sim. A jurisprudência considera dano moral in re ipsa — presumido pelo só fato da inscrição irregular — salvo se já houver outras negativações legítimas, hipótese em que cabe apenas baixa (Súmula 385/STJ).' },
          { q: 'Plano de saúde pode negar cobertura prevista no rol da ANS?', a: 'Não. Tratamentos previstos no rol da ANS são de cobertura obrigatória. Mesmo fora do rol, a Lei 14.454/22 admite cobertura quando há comprovação de eficácia conforme parâmetros legais.' },
          { q: 'Atraso de voo gera direito a indenização?', a: 'Sim. Acima de 4 horas, há direito a assistência material (alimentação, hospedagem, transporte) e, conforme o caso, indenização por dano moral, especialmente quando há perda de compromisso ou conexão.' },
        ],
      },
    ],
  },
};

/* ---------- TEMPLATES ---------- */
const headHTML = (title, desc, depth = 1) => {
  const up = '../'.repeat(depth);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KRSXZCP3');</script>
  <!-- End Google Tag Manager -->
  <title>Rafael Ferreira Advogados</title>
  <link rel="icon" type="image/png" sizes="32x32" href="/site/images/brand/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/site/images/brand/favicon-16.png" />
  <link rel="icon" type="image/png" sizes="48x48" href="/site/images/brand/favicon-48.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/site/images/brand/favicon-192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/site/images/brand/favicon-512.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/site/images/brand/apple-touch-icon.png" />
  <link rel="shortcut icon" href="/site/images/brand/favicon.ico" />
  <meta name="description" content="${desc}" />
  <meta name="author" content="Rafael Ferreira Advogados" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${up}styles.css" />
</head>
<body>

  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KRSXZCP3"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <header class="header" id="header">
    <div class="container header__inner">
      <a href="${up}index.html" class="logo" aria-label="Rafael Ferreira Advogados — Página inicial">
        <img class="logo__img" src="/site/images/brand/rf-logo-horizontal.png" alt="Rafael Ferreira Advogados" />
      </a>
      <nav class="nav" aria-label="Navegação principal">
        <ul class="nav__list" id="navList">
          <li><a href="${up}index.html#inicio" class="nav__link">Início</a></li>
          <li><a href="${up}index.html#sobre" class="nav__link">Sobre</a></li>
          <li><a href="${up}index.html#equipe" class="nav__link">Equipe</a></li>
          <li><a href="${up}index.html#areas" class="nav__link">Áreas</a></li>
          <li><a href="${up}index.html#blog" class="nav__link">Blog</a></li>
          <li><a href="${up}index.html#unidades" class="nav__link">Unidades</a></li>
          <li><a href="${up}index.html#contato" class="nav__link nav__link--cta">Contato</a></li>
        </ul>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Abrir menu" aria-expanded="false" aria-controls="navList">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
};

const footHTML = (depth = 1) => {
  const up = '../'.repeat(depth);
  return `
  <section class="cta-strip">
    <div class="container">
      <h2 class="reveal">Pronto para uma <em>consulta confidencial</em>?</h2>
      <p class="reveal">Nossa equipe avaliará seu caso com a discrição e a profundidade que ele merece.</p>
      <a href="${up}index.html#contato" class="btn btn--gold reveal">Agendar consulta</a>
    </div>
  </section>

  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__col">
        <img class="logo__img logo__img--footer" src="/site/images/brand/rf-logo-principal.png" alt="Rafael Ferreira Advogados" />
        <p>Tradição, técnica e discrição.</p>
      </div>
      <div class="footer__col">
        <h4>Navegação</h4>
        <ul>
          <li><a href="${up}index.html#sobre">Sobre</a></li>
          <li><a href="${up}index.html#equipe">Equipe</a></li>
          <li><a href="${up}index.html#areas">Áreas</a></li>
          <li><a href="${up}index.html#blog">Blog</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Áreas</h4>
        <ul>
          <li><a href="${up}areas/trabalhista.html">Trabalhista</a></li>
          <li><a href="${up}areas/previdenciario.html">Previdenciário</a></li>
          <li><a href="${up}areas/civel.html">Cível</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Contato</h4>
        <ul>
          <li>(11) 97585-6717</li>
          <li>contato@rafaelferreiraadvogados.com</li>
          <li>São Paulo/SP · Itaú de Minas/MG · Passos/MG</li>
        </ul>
      </div>
    </div>
    <div class="footer__legal">
      <div class="container">
        <div class="footer__legal-inner">
          <p class="footer__legal-name">Rafael Ferreira Advogados</p>
          <p class="footer__legal-info"><span>OAB/SP nº 56.336</span><span class="footer__legal-sep" aria-hidden="true">·</span><span>CNPJ: 57.422.718/0001-93</span></p>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container">
        <p>© <span id="year"></span> Rafael Ferreira Advogados Advocacia. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>

  <a class="float-btn float-btn--wpp" href="https://wa.me/5511975856717?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta."
     target="_blank" rel="noopener" aria-label="Falar pelo WhatsApp">
    <svg viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path fill="#ffffff" d="M16.003 5.333c-5.891 0-10.667 4.776-10.667 10.667 0 1.878.494 3.708 1.432 5.323l-1.523 5.56 5.7-1.494a10.62 10.62 0 0 0 5.055 1.288h.004c5.89 0 10.666-4.776 10.666-10.667 0-2.849-1.11-5.527-3.124-7.542a10.6 10.6 0 0 0-7.543-3.135zm0 19.556h-.003a8.86 8.86 0 0 1-4.516-1.237l-.324-.192-3.383.888.902-3.298-.211-.337a8.84 8.84 0 0 1-1.356-4.712c0-4.895 3.983-8.877 8.891-8.877a8.82 8.82 0 0 1 6.28 2.604 8.82 8.82 0 0 1 2.6 6.284c-.002 4.895-3.985 8.877-8.88 8.877zm4.87-6.649c-.267-.134-1.579-.779-1.823-.868-.244-.089-.422-.134-.6.134-.178.268-.688.868-.844 1.046-.155.178-.311.201-.577.067-.267-.134-1.126-.415-2.145-1.324-.793-.708-1.328-1.582-1.483-1.85-.156-.267-.017-.412.117-.545.12-.12.267-.311.4-.467.134-.156.178-.267.267-.445.089-.178.045-.334-.022-.467-.067-.134-.6-1.446-.822-1.982-.216-.52-.436-.449-.6-.457l-.51-.009c-.178 0-.467.067-.712.334-.244.267-.933.912-.933 2.224 0 1.312.955 2.58 1.088 2.758.134.178 1.88 2.872 4.555 4.026.637.275 1.134.44 1.522.563.639.203 1.221.174 1.681.106.513-.077 1.579-.645 1.802-1.269.222-.623.222-1.158.156-1.269-.067-.111-.244-.178-.51-.312z"/>
    </svg>
  </a>
  <button class="float-btn float-btn--top" id="backToTop" aria-label="Voltar ao topo">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 15l6-6 6 6"/></svg>
  </button>

  <script src="${up}inner.js" defer></script>
</body>
</html>`;
};

/* ---------- ÁREA (intermediária) ---------- */
const areaPage = (key, area) => `${headHTML(area.name, area.intro, 1)}
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb reveal" aria-label="Navegação estrutural">
        <a href="../index.html">Início</a>
        <span class="sep">/</span>
        <a href="../index.html#areas">Áreas de Atuação</a>
        <span class="sep">/</span>
        <span aria-current="page">${area.name}</span>
      </nav>
      <p class="page-hero__eyebrow reveal">${area.num} — Área de Atuação</p>
      <h1 class="reveal">${area.name.replace('Direito', '<em>Direito</em>')}</h1>
      <p class="page-hero__lead reveal">${area.intro}</p>
    </div>
  </section>

  <section class="section services-section">
    <div class="container">
      <header class="section__header">
        <p class="eyebrow reveal">Serviços Especializados</p>
        <h2 class="section__title reveal">Atuação com <em>profundidade</em> em cada frente.</h2>
        <p class="section__subtitle reveal">Conheça as soluções jurídicas que oferecemos em ${area.name.toLowerCase()}, conduzidas por equipe dedicada.</p>
      </header>

      <div class="services-grid">
        ${area.services.map((s) => `
        <article class="service-card reveal">
          <div class="service-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3">${ICONS[s.icon] || ICONS.document}</svg>
          </div>
          <h3>${s.title}</h3>
          <p>${s.short}</p>
          <a href="../servicos/${key}-${s.slug}.html" class="service-card__link">
            <span>Saiba mais</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </article>`).join('')}
      </div>
    </div>
  </section>
${footHTML(1)}`;

/* ---------- SERVIÇO (final) ---------- */
const servicePage = (key, area, s) => `${headHTML(s.title, s.short, 1)}
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb reveal" aria-label="Navegação estrutural">
        <a href="../index.html">Início</a>
        <span class="sep">/</span>
        <a href="../index.html#areas">Áreas</a>
        <span class="sep">/</span>
        <a href="../areas/${key}.html">${area.name}</a>
        <span class="sep">/</span>
        <span aria-current="page">${s.title}</span>
      </nav>
      <p class="page-hero__eyebrow reveal">${area.name}</p>
      <h1 class="reveal">${s.title}</h1>
      <p class="page-hero__lead reveal">${s.short}</p>
    </div>
  </section>

  <section class="article-section">
    <div class="container">
      <div class="article-body">
        <p class="article__intro reveal">${s.intro}</p>

        ${s.sections.map((sec) => `
        <h2 class="reveal">${sec.h}</h2>
        <p class="reveal">${sec.p}</p>`).join('')}
      </div>
    </div>
  </section>

  ${s.highlights ? `
  <section class="highlights-section">
    <div class="container">
      <header class="section__header">
        <p class="eyebrow reveal">Destaques Jurídicos</p>
        <h2 class="section__title reveal">Pontos <em>essenciais</em> dessa atuação.</h2>
      </header>
      <div class="highlights-grid">
        ${s.highlights.map((h) => `
        <article class="highlight-card reveal">
          <span class="highlight-card__num">${h.n}</span>
          <h3>${h.h}</h3>
          <p>${h.p}</p>
        </article>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${s.steps ? `
  <section class="process-section">
    <div class="container">
      <header class="section__header">
        <p class="eyebrow reveal">Como Atuamos</p>
        <h2 class="section__title reveal">Nosso <em>método</em> de trabalho.</h2>
        <p class="section__subtitle reveal">Cada etapa é conduzida com técnica, transparência e comunicação clara com o cliente.</p>
      </header>
      <ol class="process-list">
        ${s.steps.map((st, i) => `
        <li class="process-item reveal">
          <span class="process-item__step">${String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>${st.h}</h3>
            <p>${st.p}</p>
          </div>
        </li>`).join('')}
      </ol>
    </div>
  </section>` : ''}

  <section class="section focus-section">
    <div class="container">
      <header class="section__header">
        <p class="eyebrow reveal">Focos Específicos</p>
        <h2 class="section__title reveal">Frentes <em>de atuação</em> dentro do tema.</h2>
        <p class="section__subtitle reveal">Cada caso é tratado com a profundidade e a discrição que a matéria exige.</p>
      </header>

      <div class="info-cards">
        ${s.cards.map((c) => `
        <div class="info-card reveal">
          <h4>${c.h}</h4>
          <p>${c.p}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="faq-section">
    <div class="container">
      <header class="section__header">
        <p class="eyebrow reveal">Perguntas Frequentes</p>
        <h2 class="section__title reveal">Dúvidas sobre <em>${s.title}</em>.</h2>
        <p class="section__subtitle reveal">Reunimos as perguntas mais comuns sobre esse tema específico. Caso a sua não esteja aqui, fale conosco.</p>
      </header>

      <div class="faq">
        ${(s.faq || []).map((f) => `
        <div class="faq__item reveal">
          <button class="faq__q" type="button">
            <span>${f.q}</span>
            <span class="faq__icon" aria-hidden="true"></span>
          </button>
          <div class="faq__a">
            <div class="faq__a-inner">${f.a}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>
${footHTML(1)}`;

/* ---------- BUILD ---------- */
mkdirSync(resolve(ROOT, 'areas'), { recursive: true });
mkdirSync(resolve(ROOT, 'servicos'), { recursive: true });

for (const [key, area] of Object.entries(AREAS)) {
  writeFileSync(resolve(ROOT, 'areas', `${key}.html`), areaPage(key, area));
  console.log('✓ areas/' + key + '.html');
  for (const s of area.services) {
    writeFileSync(resolve(ROOT, 'servicos', `${key}-${s.slug}.html`), servicePage(key, area, s));
    console.log('  ✓ servicos/' + key + '-' + s.slug + '.html');
  }
}
console.log('\nDone.');
