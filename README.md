# CRM Têxtil A Azevedo

Aplicação web de CRM comercial B2B para prospecção e gestão de clientes do setor têxtil em Pernambuco.

## Privacidade dos dados

Este repositório contém o código-fonte e não inclui a base de empresas, telefones, endereços ou outros dados comerciais. O arquivo local `private-data/companies.json` é mantido fora do GitHub. O CRM publicado usa o banco D1 privado do Sites; este repositório não transfere nem substitui os dados que já estão nesse banco.

## Desenvolvimento

Requer Node.js 22.13 ou superior.

```bash
npm ci
npm run build
npm run dev
```

A publicação do Site continua vinculada ao projeto existente em Sites e deve preservar os bindings e configurações registrados em `.openai/hosting.json`.

## Estrutura

- `components/crm/`: interface de clientes, leads, notas e dashboard.
- `lib/crm/`: regras de negócio e persistência.
- `app/api/crm/`: API do CRM.
- `drizzle/`: schema e migrações D1.
