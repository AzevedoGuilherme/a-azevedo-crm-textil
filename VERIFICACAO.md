# Verificação do CRM

- Base reconciliada: 1.750 CNPJs únicos e válidos; 120 municípios; 346 empresas em Caruaru.
- Testes de regras/persistência/importação: 15 aprovados.
- Fluxos reais em navegador: cadastro, nota com retorno, cotação por preço/quantidade, fechamento, taxa de comissão preservada, persistência após recarga, busca global.
- Falha de conexão: texto permanece no formulário.
- Conflito entre abas: recarga preserva campos editados e incorpora os demais dados atuais.
- Segurança: API anônima retorna 401; publicação é privada.
- Responsividade: desktop 1440px e celular 390px; ausência de rolagem horizontal.
- Dados demonstrativos dos anexos não são importados; registros QA ficam apenas no banco local e foram removidos depois dos testes.
- Revisão independente parcial: apontamentos recebidos foram corrigidos; o revisor atingiu o limite de uso antes do relatório final. Os demais critérios foram conferidos pelo implementador.

A base inicial é carregada no banco hospedado ao primeiro acesso autenticado, em lotes que retomam após interrupção. Isso pode levar alguns segundos. Os testes locais não comprovam o estado de uma sessão autenticada de produção.
