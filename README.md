# CRM Têxtil A Azevedo

Aplicação web de CRM comercial B2B para prospecção e gestão de clientes do setor têxtil em Pernambuco.

## Privacidade dos dados

Este repositório contém código-fonte e não inclui a base de empresas, telefones, endereços ou outros dados comerciais. O arquivo local `private-data/companies.json` foi omitido. O CRM publicado usa o banco D1 privado do Sites; enviar este código ao GitHub não transfere nem substitui os dados já armazenados nesse banco.

Uma nova instalação a partir deste repositório começa sem a lista de empresas. Mantenha qualquer base de clientes ou leads fora do GitHub e carregue-a apenas por um processo privado e controlado.

## Desenvolvimento

Requer Node.js 22.13 ou superior.

```bash
npm ci
npm run build
npm run dev
```

A publicação do Site permanece vinculada ao projeto existente em Sites. Preserve os bindings e as configurações declarados em `.openai/hosting.json`.

## Estrutura

- `components/crm/`: interface de clientes, leads, notas e dashboard.
- `lib/crm/`: regras de negócio e persistência.
- `app/api/crm/`: API do CRM.
- `drizzle/`: schema e migrações D1.
