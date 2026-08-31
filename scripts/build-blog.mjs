/* Gera páginas de categoria e artigos do BLOG.
   Roda com: node scripts/build-blog.mjs
   Saída: public/site/blog/<area>.html  e  public/site/blog/<area>-<slug>.html */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', 'public', 'site');

/* ---------- ÍCONES JURÍDICOS PADRONIZADOS ---------- */
const ICONS = {
  scale:    '<path d="M12 3v18M5 7h14M3 17h6l-3-6zM15 17h6l-3-6z"/>',           // balança
  gavel:    '<path d="M4 20l8-8M14 6l4 4M10 10l8-8 4 4-8 8z"/>',                 // martelo
  doc:      '<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6"/>', // documento
  shield:   '<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"/>',         // escudo
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>',
  family:   '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M15 20c0-2 1.5-3.5 4-3.5s3 1.5 3 3"/>',
  baby:     '<circle cx="12" cy="9" r="4"/><path d="M8 13c-2 1-4 3-4 6h16c0-3-2-5-4-6"/><path d="M10 9h.01M14 9h.01"/>',
  medical:  '<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/>',
  retire:   '<path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  scroll:   '<path d="M6 4h12v14a2 2 0 002 2H8a2 2 0 01-2-2V4z"/><path d="M10 8h6M10 12h6M10 16h4"/>',
  cart:     '<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.5 11h11l2-7H6"/>',
  heart:    '<path d="M12 21s-7-4.5-9.5-9A5 5 0 0112 6a5 5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z"/>',
  tree:     '<path d="M12 3v18M12 8l-4-4M12 12l5-5M12 16l-4-4M12 19l5-5"/>',
};

/* ---------- DADOS DO BLOG ---------- */
const BLOG = {
  trabalhista: {
    name: 'Direito do Trabalho',
    num: '01',
    icon: 'briefcase',
    intro: 'Análises práticas sobre relações de emprego, acidente do trabalho, direitos das gestantes e demais temas trabalhistas que afetam o dia a dia do trabalhador e da empresa.',
    articles: [
      {
        slug: 'acidente-doenca-do-trabalho',
        icon: 'medical',
        title: 'Acidente e Doença do Trabalho: direitos e providências',
        subtitle: 'O que fazer após um acidente de trabalho e quais benefícios são devidos ao empregado.',
        excerpt: 'Entenda o conceito legal de acidente do trabalho, a emissão da CAT, a estabilidade prevista em lei e os benefícios previdenciários e indenizatórios cabíveis.',
        sections: [
          { h: 'O que caracteriza acidente de trabalho', p: 'Considera-se acidente do trabalho aquele ocorrido pelo exercício da atividade laboral a serviço da empresa, provocando lesão corporal ou perturbação funcional que cause morte, perda ou redução da capacidade para o trabalho (art. 19 da Lei 8.213/91). Equiparam-se ao acidente as doenças profissionais e ocupacionais.' },
          { h: 'A importância da CAT (Comunicação de Acidente de Trabalho)', p: 'A CAT deve ser emitida pela empresa até o primeiro dia útil seguinte ao acidente. Na omissão, o próprio empregado, médico assistente, sindicato ou autoridade pública pode emiti-la. Sem CAT, há risco real de perda de direitos previdenciários e da estabilidade.' },
          { h: 'Estabilidade acidentária', p: 'O empregado afastado por mais de 15 dias e que receba auxílio por incapacidade temporária acidentário (B91) tem garantia de emprego por 12 meses após o retorno (art. 118 da Lei 8.213/91). A dispensa sem justa causa nesse período gera direito à reintegração ou indenização.' },
          { h: 'Indenização civil cumulada', p: 'Além dos benefícios previdenciários, o trabalhador pode pleitear na Justiça do Trabalho indenização por danos morais, materiais e estéticos quando comprovada culpa ou dolo do empregador na ocorrência do acidente ou na exposição a agente nocivo.' },
        ],
        highlights: [
          { n: '01', h: 'Nexo Técnico', p: 'O NTEP presume o nexo entre a doença e a atividade exercida com base no CID e CNAE da empresa.' },
          { n: '02', h: 'Prescrição', p: 'O prazo para ação indenizatória é de 2 anos após o fim do contrato, limitado aos últimos 5 anos.' },
          { n: '03', h: 'Cumulação', p: 'Benefício previdenciário e indenização civil podem ser cumulados — possuem natureza jurídica distinta.' },
        ],
      },
      {
        slug: 'direito-das-gestantes',
        icon: 'baby',
        title: 'Direito das Gestantes: estabilidade, licença e proteções legais',
        subtitle: 'Tudo sobre a estabilidade gestante, licença-maternidade e proteção contra dispensa discriminatória.',
        excerpt: 'A Constituição e a CLT garantem proteção integral à mulher trabalhadora durante a gestação. Conheça os direitos e os caminhos para defendê-los.',
        sections: [
          { h: 'Estabilidade da gestante', p: 'A empregada gestante tem direito à estabilidade desde a confirmação da gravidez até cinco meses após o parto (art. 10, II, b, do ADCT). A estabilidade independe de comunicação ao empregador e alcança também contratos por prazo determinado e o aviso prévio (Súmula 244/TST).' },
          { h: 'Licença-maternidade', p: 'A licença é de 120 dias, podendo ser estendida para 180 dias em empresas aderentes ao Programa Empresa Cidadã. É devida também em casos de adoção, guarda judicial e aborto não criminoso (com período reduzido de 2 semanas).' },
          { h: 'Dispensa discriminatória', p: 'A dispensa de gestante presume-se discriminatória quando ocorre sem justa causa e durante o período de estabilidade. A Lei 9.029/95 prevê reintegração ou indenização em dobro pelo período de afastamento, além de dano moral.' },
          { h: 'Mudança de função e ambiente insalubre', p: 'A gestante e a lactante devem ser afastadas de atividades insalubres em grau máximo. Em grau mínimo ou médio, só permanecem com atestado médico que ateste a ausência de risco (Lei 13.467/17 e ADI 5938/STF).' },
        ],
        highlights: [
          { n: '01', h: 'Estabilidade Total', p: 'Da confirmação da gravidez até 5 meses após o parto, mesmo no aviso prévio e em contratos temporários.' },
          { n: '02', h: 'Salário-maternidade', p: 'Pago pelo INSS ou pela empresa, conforme o caso, equivalente à remuneração integral.' },
          { n: '03', h: 'Insalubridade', p: 'Afastamento obrigatório em grau máximo — em grau menor, depende de atestado médico.' },
        ],
      },
      {
        slug: 'direitos-decorrentes-da-relacao-de-emprego',
        icon: 'briefcase',
        title: 'Direitos Decorrentes da Relação de Emprego',
        subtitle: 'Salário, jornada, FGTS, férias, 13º e demais verbas devidas ao empregado celetista.',
        excerpt: 'Um panorama completo dos direitos básicos do trabalhador com vínculo registrado em carteira, das verbas mensais às parcelas rescisórias.',
        sections: [
          { h: 'Salário e jornada de trabalho', p: 'A jornada-padrão é de 8 horas diárias e 44 semanais, salvo norma coletiva ou regime especial. A hora extra é remunerada com adicional mínimo de 50% e o trabalho noturno (22h às 5h) possui adicional de 20% e hora reduzida de 52,5 minutos.' },
          { h: 'FGTS e férias', p: 'O empregador deve depositar mensalmente 8% sobre a remuneração na conta vinculada do FGTS do empregado. As férias são de 30 dias após cada 12 meses, com acréscimo de 1/3 constitucional, podendo ser fracionadas em até três períodos nos termos da reforma trabalhista.' },
          { h: '13º salário e adicionais', p: 'O 13º é pago em duas parcelas (até 30 de novembro e 20 de dezembro), proporcional aos meses trabalhados. Adicionais de insalubridade, periculosidade, transferência e função de confiança integram o salário para todos os efeitos quando habituais.' },
          { h: 'Rescisão contratual', p: 'Na dispensa sem justa causa, são devidos saldo de salário, aviso prévio, férias vencidas e proporcionais + 1/3, 13º proporcional, multa de 40% do FGTS e liberação do saque + seguro-desemprego, conforme requisitos.' },
        ],
        highlights: [
          { n: '01', h: 'Verbas Rescisórias', p: 'Devem ser pagas em até 10 dias do término do contrato, sob pena de multa do art. 477 da CLT.' },
          { n: '02', h: 'Banco de Horas', p: 'Permitido por acordo individual (compensação em 6 meses) ou coletivo (até 1 ano).' },
          { n: '03', h: 'Equiparação Salarial', p: 'Mesma função, igual produtividade e perfeição técnica, com diferença ≤ 4 anos no cargo e 2 anos na função.' },
        ],
      },
    ],
  },

  previdenciario: {
    name: 'Direito Previdenciário',
    num: '02',
    icon: 'shield',
    intro: 'Conteúdo prático sobre aposentadorias, auxílios e benefícios do INSS, com foco em estratégia e segurança jurídica para o segurado.',
    articles: [
      {
        slug: 'aposentadoria',
        icon: 'retire',
        title: 'Aposentadoria: regras atuais e regras de transição após a Reforma',
        subtitle: 'Entenda as principais modalidades de aposentadoria após a EC 103/2019 e como escolher a mais vantajosa.',
        excerpt: 'A Reforma da Previdência alterou profundamente as regras de aposentadoria. Veja as principais modalidades vigentes e as regras de transição aplicáveis.',
        sections: [
          { h: 'Aposentadoria por idade e tempo de contribuição (regra atual)', p: 'Após a EC 103/2019, a aposentadoria do RGPS exige idade mínima (62 anos para mulheres e 65 para homens) e tempo mínimo de contribuição (15 anos para mulheres e 20 anos para homens filiados após a reforma). Para o trabalhador rural, persistem regras específicas.' },
          { h: 'Regras de transição', p: 'Para quem já contribuía antes da reforma, há cinco regras de transição: por pontos, por idade mínima progressiva, pedágio de 50%, pedágio de 100% e idade mínima na aposentadoria por idade. Cada uma exige requisitos distintos e gera resultados financeiros diferentes.' },
          { h: 'Cálculo do benefício', p: 'O salário de benefício é calculado pela média de 100% dos salários de contribuição desde julho de 1994. Sobre essa média, aplica-se 60% acrescidos de 2% por ano que exceder 15 anos (mulher) ou 20 anos (homem) de contribuição.' },
          { h: 'Planejamento previdenciário', p: 'O planejamento é o instrumento que permite identificar a regra mais vantajosa em cada caso concreto, simular cenários de contribuição futura e antecipar a aposentadoria com maior valor possível. É indispensável diante da complexidade pós-reforma.' },
        ],
        highlights: [
          { n: '01', h: 'Regra de Pontos', p: 'Soma idade + tempo de contribuição. Em 2026: 92 pontos (mulher) e 102 pontos (homem).' },
          { n: '02', h: 'Pedágio 100%', p: 'Permite aposentadoria sem fator, exigindo tempo adicional igual ao que faltava em 13/11/2019.' },
          { n: '03', h: 'Revisão da Vida Toda', p: 'Apesar de modulada pelo STF, ainda comporta análise técnica caso a caso para segurados beneficiados.' },
        ],
      },
      {
        slug: 'auxilio-acidente',
        icon: 'medical',
        title: 'Auxílio-Acidente: requisitos, valor e direitos do segurado',
        subtitle: 'Benefício indenizatório devido ao segurado com redução permanente da capacidade laboral após acidente.',
        excerpt: 'O auxílio-acidente é um benefício indenizatório frequentemente negado pelo INSS, mas com alta taxa de êxito judicial. Conheça os requisitos e o cálculo.',
        sections: [
          { h: 'Natureza jurídica do auxílio-acidente', p: 'Trata-se de benefício de natureza indenizatória, devido ao segurado que, após consolidação de lesão decorrente de acidente de qualquer natureza, apresenta sequela permanente que reduz sua capacidade para o trabalho habitualmente exercido (art. 86 da Lei 8.213/91).' },
          { h: 'Requisitos para a concessão', p: 'São três os requisitos: qualidade de segurado, ocorrência de acidente (não exclusivamente de trabalho) e redução parcial e permanente da capacidade laborativa para o trabalho habitual, comprovada por perícia médica.' },
          { h: 'Valor e cumulação', p: 'Corresponde a 50% do salário de benefício e pode ser acumulado com o salário decorrente do trabalho — mas não com aposentadoria. É pago a partir do dia seguinte ao da cessação do auxílio por incapacidade temporária que o originou.' },
          { h: 'Por que tantos pedidos são negados administrativamente', p: 'O INSS frequentemente classifica a sequela como “sem redução de capacidade”, mesmo havendo evidência clínica. A revisão judicial costuma reverter a negativa quando há perícia médica robusta e enquadramento jurisprudencial correto.' },
        ],
        highlights: [
          { n: '01', h: 'Acidente de Qualquer Natureza', p: 'Não precisa ser acidente de trabalho — basta a sequela com redução da capacidade laborativa.' },
          { n: '02', h: 'Cumulação com Salário', p: 'O segurado continua trabalhando e recebendo o auxílio-acidente até a concessão de aposentadoria.' },
          { n: '03', h: 'Caráter Vitalício', p: 'O benefício é pago até a aposentadoria do segurado ou seu óbito, quando se converte em pensão.' },
        ],
      },
      {
        slug: 'estabilidade-por-acidente-de-trabalho',
        icon: 'shield',
        title: 'Estabilidade por Acidente de Trabalho: garantia de emprego por 12 meses',
        subtitle: 'O empregado acidentado tem garantia de emprego mesmo após a alta do INSS. Entenda as condições.',
        excerpt: 'A estabilidade acidentária protege o empregado por 12 meses após o retorno ao trabalho. Veja em que casos se aplica e como exigir esse direito.',
        sections: [
          { h: 'Base legal e finalidade', p: 'O art. 118 da Lei 8.213/91 garante ao empregado vítima de acidente do trabalho a manutenção do contrato por 12 meses após a cessação do auxílio por incapacidade temporária acidentário, independentemente de percepção de auxílio-acidente.' },
          { h: 'Requisitos da estabilidade', p: 'Conforme a Súmula 378 do TST: (i) afastamento superior a 15 dias com gozo de auxílio acidentário (B91) — exceção feita a doenças com nexo causal mesmo sem o benefício; (ii) constatação de doença ocupacional após a dispensa, equiparada legalmente a acidente.' },
          { h: 'Dispensa durante a estabilidade', p: 'A dispensa sem justa causa nesse período é nula. O trabalhador tem direito à reintegração ou, caso inviável, à indenização correspondente aos salários do período de estabilidade, com reflexos em FGTS, 13º, férias e demais verbas.' },
          { h: 'Doenças ocupacionais ocultas', p: 'Mesmo sem CAT, a estabilidade pode ser reconhecida judicialmente quando comprovado o nexo entre a doença e o trabalho por meio de prova pericial — situação comum em LER/DORT, perdas auditivas e transtornos mentais ocupacionais.' },
        ],
        highlights: [
          { n: '01', h: '12 Meses', p: 'Garantia contada da cessação do auxílio acidentário ou do retorno ao trabalho.' },
          { n: '02', h: 'Reintegração', p: 'O empregado dispensado pode pleitear reintegração ou indenização substitutiva integral.' },
          { n: '03', h: 'Sem CAT', p: 'A ausência da CAT não impede o reconhecimento — basta prova pericial do nexo causal.' },
        ],
      },
    ],
  },

  civel: {
    name: 'Direito Cível',
    num: '03',
    icon: 'scale',
    intro: 'Estudos sobre relações de consumo, direito de família e sucessões — temas que tocam a vida pessoal e patrimonial do cidadão.',
    articles: [
      {
        slug: 'direito-do-consumidor',
        icon: 'cart',
        title: 'Direito do Consumidor: como se proteger de práticas abusivas',
        subtitle: 'Cobranças indevidas, vícios de produto, negativação irregular e os principais direitos do CDC.',
        excerpt: 'O Código de Defesa do Consumidor é um dos mais avançados do mundo. Saiba como utilizá-lo para resolver conflitos do dia a dia.',
        sections: [
          { h: 'Princípios estruturantes do CDC', p: 'O CDC parte do reconhecimento da vulnerabilidade do consumidor e estrutura-se em torno de princípios como a boa-fé objetiva, a transparência, a inversão do ônus da prova e a responsabilidade objetiva do fornecedor pelos vícios e defeitos de produtos e serviços.' },
          { h: 'Cobranças indevidas e restituição em dobro', p: 'O art. 42, parágrafo único, do CDC assegura ao consumidor cobrado em quantia indevida a repetição em dobro do que foi pago em excesso, acrescido de correção e juros. O STJ (EAREsp 676.608/RS) flexibilizou a exigência de má-fé, bastando a contrariedade à boa-fé objetiva.' },
          { h: 'Negativação indevida e dano moral', p: 'A inscrição irregular em cadastros de inadimplentes gera dano moral in re ipsa, presumido pela própria conduta. A Súmula 385 do STJ ressalva o caso de já existirem outras negativações legítimas, hipótese em que cabe apenas a baixa.' },
          { h: 'Vícios e defeitos do produto/serviço', p: 'Para vícios aparentes, o consumidor tem 30 dias (não duráveis) ou 90 dias (duráveis) para reclamar. Em fatos do produto (acidentes de consumo), o prazo prescricional é de 5 anos a partir do conhecimento do dano e da autoria.' },
        ],
        highlights: [
          { n: '01', h: 'Inversão do Ônus', p: 'Quando o consumidor é hipossuficiente ou suas alegações são verossímeis, o juiz inverte o ônus probatório.' },
          { n: '02', h: 'Tutela de Urgência', p: 'Baixa de negativação, religação de serviços e cobertura de plano de saúde podem ser concedidas liminarmente.' },
          { n: '03', h: 'Responsabilidade Objetiva', p: 'O fornecedor responde independentemente de culpa pelos danos causados ao consumidor.' },
        ],
      },
      {
        slug: 'direito-de-familia',
        icon: 'family',
        title: 'Direito de Família: divórcio, guarda e pensão alimentícia',
        subtitle: 'Tudo o que você precisa saber sobre os principais institutos do direito de família contemporâneo.',
        excerpt: 'Da dissolução do casamento à fixação da guarda e dos alimentos, o direito de família atual prioriza o diálogo e o melhor interesse da criança.',
        sections: [
          { h: 'Divórcio judicial e extrajudicial', p: 'Desde a EC 66/2010, o divórcio independe de prazo de separação. Quando não há filhos menores ou incapazes e há consenso, pode ser feito por escritura pública em cartório (Lei 11.441/2007), com presença de advogado.' },
          { h: 'Guarda dos filhos', p: 'A guarda compartilhada é a regra (art. 1.584, §2º, CC), salvo quando um dos genitores não tiver condições ou houver risco ao menor. Compartilhada não significa residência alternada — refere-se à tomada conjunta de decisões fundamentais sobre a vida do filho.' },
          { h: 'Pensão alimentícia', p: 'Fixada pelo binômio necessidade/possibilidade, não há percentual legal. A jurisprudência costuma situar a pensão entre 20% e 30% dos rendimentos líquidos do alimentante, mas cada caso é analisado concretamente. O inadimplemento pode levar à prisão civil.' },
          { h: 'União estável e regime de bens', p: 'A união estável tem efeitos patrimoniais semelhantes ao casamento, no regime da comunhão parcial salvo contrato escrito em sentido diverso. O reconhecimento pode ser feito em cartório ou judicialmente, e o término segue regras análogas ao divórcio.' },
        ],
        highlights: [
          { n: '01', h: 'Guarda Compartilhada', p: 'Regra geral, independe do bom relacionamento entre os pais — busca preservar o vínculo com ambos.' },
          { n: '02', h: 'Alimentos Gravídicos', p: 'A gestante pode pleitear alimentos durante a gravidez (Lei 11.804/2008), com indícios mínimos de paternidade.' },
          { n: '03', h: 'Prisão Civil', p: 'Cabe ao devedor de alimentos das três últimas parcelas + as vincendas, conforme Súmula 309/STJ.' },
        ],
      },
      {
        slug: 'direito-das-sucessoes',
        icon: 'tree',
        title: 'Direito das Sucessões: inventário, herança e planejamento sucessório',
        subtitle: 'Como funciona a transmissão patrimonial após o falecimento e por que planejar em vida é vantajoso.',
        excerpt: 'O direito sucessório regula a transferência de bens após a morte. Conheça a ordem de vocação hereditária, o inventário e as vantagens do planejamento.',
        sections: [
          { h: 'Abertura da sucessão e inventário', p: 'A sucessão abre-se no momento exato do falecimento (princípio da saisine, art. 1.784, CC). O inventário deve ser iniciado em até 60 dias, sob pena de multa estadual sobre o ITCMD, podendo tramitar em cartório (extrajudicial) quando há consenso e ausência de testamento ou incapazes.' },
          { h: 'Ordem de vocação hereditária', p: 'Sucedem em primeiro lugar os descendentes (concorrendo com o cônjuge, conforme o regime de bens), depois os ascendentes (também em concorrência com o cônjuge), em seguida o cônjuge sobrevivente e, na ausência destes, os colaterais até o 4º grau (art. 1.829, CC).' },
          { h: 'Herdeiros necessários e legítima', p: 'São herdeiros necessários os descendentes, ascendentes e o cônjuge. A eles é reservada a “legítima”, equivalente a 50% do patrimônio. O testador só pode dispor livremente da metade restante por testamento ou doação inter vivos.' },
          { h: 'Planejamento sucessório', p: 'Inclui instrumentos como doação com reserva de usufruto, holdings familiares, testamento, partilha em vida e estipulações de cláusulas (incomunicabilidade, impenhorabilidade, inalienabilidade). Reduz custos com ITCMD e previne litígios entre herdeiros.' },
        ],
        highlights: [
          { n: '01', h: 'Inventário Extrajudicial', p: 'Quando todos são maiores, capazes, há consenso e não existe testamento, o trâmite é mais ágil e econômico.' },
          { n: '02', h: 'ITCMD', p: 'O imposto estadual sobre transmissão causa mortis varia por Estado e pode ser planejado com doações em vida.' },
          { n: '03', h: 'Holding Familiar', p: 'Permite organizar o patrimônio, profissionalizar a gestão e simplificar a sucessão de bens e empresas.' },
        ],
      },
    ],
  },
};

/* ---------- HEAD / FOOT (compartilhado) ---------- */
const headHTML = (title, desc) => `<!DOCTYPE html>
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
  <link rel="stylesheet" href="../styles.css" />
</head>
<body>

  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KRSXZCP3"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <header class="header" id="header">
    <div class="container header__inner">
      <a href="../index.html" class="logo" aria-label="Rafael Ferreira Advogados — Página inicial">
        <img class="logo__img" src="/site/images/brand/rf-logo-horizontal.png" alt="Rafael Ferreira Advogados" />
      </a>
      <nav class="nav" aria-label="Navegação principal">
        <ul class="nav__list" id="navList">
          <li><a href="../index.html#inicio" class="nav__link">Início</a></li>
          <li><a href="../index.html#sobre" class="nav__link">Sobre</a></li>
          <li><a href="../index.html#equipe" class="nav__link">Equipe</a></li>
          <li><a href="../index.html#areas" class="nav__link">Áreas</a></li>
          <li><a href="../index.html#blog" class="nav__link">Blog</a></li>
          <li><a href="../index.html#unidades" class="nav__link">Unidades</a></li>
          <li><a href="../index.html#contato" class="nav__link nav__link--cta">Contato</a></li>
        </ul>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Abrir menu" aria-expanded="false" aria-controls="navList">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;

const footHTML = () => `
  <section class="cta-strip">
    <div class="container">
      <h2 class="reveal">Precisa de orientação <em>jurídica especializada</em>?</h2>
      <p class="reveal">Fale com nossa equipe e receba uma análise técnica e confidencial do seu caso.</p>
      <a href="../index.html#contato" class="btn btn--gold reveal">Agendar consulta</a>
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
          <li><a href="../index.html#sobre">Sobre</a></li>
          <li><a href="../index.html#equipe">Equipe</a></li>
          <li><a href="../index.html#areas">Áreas</a></li>
          <li><a href="../index.html#blog">Blog</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Blog</h4>
        <ul>
          <li><a href="trabalhista.html">Direito do Trabalho</a></li>
          <li><a href="previdenciario.html">Direito Previdenciário</a></li>
          <li><a href="civel.html">Direito Cível</a></li>
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

  <script src="../inner.js" defer></script>
</body>
</html>`;

const svg = (key) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3">${ICONS[key] || ICONS.doc}</svg>`;

/* ---------- PÁGINA DE CATEGORIA ---------- */
const categoryPage = (key, cat) => `${headHTML(cat.name, cat.intro)}
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb reveal" aria-label="Navegação estrutural">
        <a href="../index.html">Início</a>
        <span class="sep">/</span>
        <a href="../index.html#blog">Blog</a>
        <span class="sep">/</span>
        <span aria-current="page">${cat.name}</span>
      </nav>
      <p class="page-hero__eyebrow reveal">Blog ${cat.num} — Categoria</p>
      <h1 class="reveal">${cat.name.replace(cat.name.split(' ').pop(), '<em>' + cat.name.split(' ').pop() + '</em>')}</h1>
      <p class="page-hero__lead reveal">${cat.intro}</p>
    </div>
  </section>

  <section class="section blog-list-section">
    <div class="container">
      <header class="section__header">
        <p class="eyebrow reveal">Artigos publicados</p>
        <h2 class="section__title reveal">Conteúdo da <em>categoria</em>.</h2>
        <p class="section__subtitle reveal">Selecionamos análises práticas, com linguagem técnica e acessível, sobre os principais temas dessa área.</p>
      </header>

      <div class="blog-list">
        ${cat.articles.map((a) => `
        <article class="article-card reveal">
          <div class="article-card__media" aria-hidden="true">
            <div class="article-card__icon">${svg(a.icon)}</div>
            <div class="article-card__pattern"></div>
          </div>
          <div class="article-card__body">
            <span class="article-card__tag">${cat.name}</span>
            <h3>${a.title}</h3>
            <p>${a.excerpt}</p>
            <a href="${key}-${a.slug}.html" class="article-card__link">
              <span>Ler artigo</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>
${footHTML()}`;

/* ---------- PÁGINA DE ARTIGO ---------- */
const articlePage = (key, cat, a) => `${headHTML(a.title, a.subtitle)}
  <section class="page-hero page-hero--article">
    <div class="container page-hero__grid">
      <div class="page-hero__text">
        <nav class="breadcrumb reveal" aria-label="Navegação estrutural">
          <a href="../index.html">Início</a>
          <span class="sep">/</span>
          <a href="../index.html#blog">Blog</a>
          <span class="sep">/</span>
          <a href="${key}.html">${cat.name}</a>
          <span class="sep">/</span>
          <span aria-current="page">Artigo</span>
        </nav>
        <p class="page-hero__eyebrow reveal">${cat.name}</p>
        <h1 class="reveal">${a.title}</h1>
        <p class="page-hero__lead reveal">${a.subtitle}</p>
      </div>
      <figure class="page-hero__portrait reveal" aria-hidden="true">
        <img src="/site/images/team/rafael-artigo.jpg" alt="" loading="lazy" />
      </figure>
    </div>
  </section>

  <section class="article-section">
    <div class="container">
      <div class="article-body">
        <p class="article__intro reveal">${a.excerpt}</p>
        ${a.sections.map((s) => `
        <h2 class="reveal">${s.h}</h2>
        <p class="reveal">${s.p}</p>`).join('')}
      </div>
    </div>
  </section>


  ${a.highlights ? `
  <section class="highlights-section">
    <div class="container">
      <header class="section__header">
        <p class="eyebrow reveal">Pontos de Atenção</p>
        <h2 class="section__title reveal">Destaques <em>jurídicos</em> do tema.</h2>
      </header>
      <div class="highlights-grid">
        ${a.highlights.map((h) => `
        <article class="highlight-card reveal">
          <span class="highlight-card__num">${h.n}</span>
          <h3>${h.h}</h3>
          <p>${h.p}</p>
        </article>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <section class="article-cta">
    <div class="container article-cta__inner">
      <div class="reveal">
        <p class="eyebrow">Próximos passos</p>
        <h2>Precisa de orientação sobre <em>${a.title.split(':')[0]}</em>?</h2>
        <p>Nossa equipe analisa o seu caso com profundidade, discrição e estratégia. Fale com um advogado especialista.</p>
      </div>
      <div class="article-cta__actions reveal">
        <a href="../index.html#contato" class="btn btn--navy">Agendar consulta</a>
        <a href="https://wa.me/5511975856717?text=Ol%C3%A1%2C%20vim%20pelo%20blog%20e%20gostaria%20de%20uma%20orienta%C3%A7%C3%A3o."
           target="_blank" rel="noopener" class="btn btn--wpp">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d="M20.5 3.5A11 11 0 003.6 17.3L2 22l4.8-1.6A11 11 0 1020.5 3.5z"/>
          </svg>
          Falar no WhatsApp
        </a>
      </div>
    </div>
  </section>

  <section class="related-section">
    <div class="container">
      <header class="section__header">
        <p class="eyebrow reveal">Continue lendo</p>
        <h2 class="section__title reveal">Outros artigos da <em>categoria</em>.</h2>
      </header>
      <div class="related-grid">
        ${cat.articles.filter((x) => x.slug !== a.slug).map((x) => `
        <a href="${key}-${x.slug}.html" class="related-card reveal">
          <div class="related-card__icon">${svg(x.icon)}</div>
          <h3>${x.title}</h3>
          <span class="related-card__link">Ler artigo →</span>
        </a>`).join('')}
      </div>
    </div>
  </section>
${footHTML()}`;

/* ---------- BUILD ---------- */
mkdirSync(resolve(ROOT, 'blog'), { recursive: true });
for (const [key, cat] of Object.entries(BLOG)) {
  writeFileSync(resolve(ROOT, 'blog', `${key}.html`), categoryPage(key, cat));
  console.log('✓ blog/' + key + '.html');
  for (const a of cat.articles) {
    writeFileSync(resolve(ROOT, 'blog', `${key}-${a.slug}.html`), articlePage(key, cat, a));
    console.log('  ✓ blog/' + key + '-' + a.slug + '.html');
  }
}
console.log('\nDone.');
