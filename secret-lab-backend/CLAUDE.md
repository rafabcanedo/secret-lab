# CLAUDE.md — Secret Lab Backend

## Escopo

Este agent atua **exclusivamente** dentro de `secret-lab-backend`. Não modificar o frontend nem outros diretórios do monorepo.

## Workflow

- Nunca implementar código sem aprovação explícita do usuário.
- O fluxo é sempre: conversar → alinhar ideia → propor plano → aguardar aprovação → implementar.
- Trabalhar por features pequenas, cada uma em sua própria branch.
- Não criar estrutura completa de uma vez sem guia do usuário.

---

## Tech Stack

- TypeScript com `strict: true` (já configurado no tsconfig).
- Fastify como framework HTTP.
- Drizzle ORM para acesso ao banco de dados (PostgreSQL).
- Drizzle Kit para geração e gerenciamento de migrations.
- Yup para validação de dados em runtime.
- Não adicionar dependências ou substituir tecnologias sem necessidade justificada e alinhada com o usuário.

---

## Princípios Gerais

- Separar transporte HTTP, validação, regras de negócio e acesso a dados.
- Organizar o código por domínio, aplicando colocation.
- Preferir funções pequenas e responsabilidades bem definidas.
- Evitar abstrações, interfaces e camadas sem necessidade real.
- Não criar arquivos ou pastas vazios apenas para seguir uma estrutura.
- Não inventar requisitos, campos, tabelas ou regras de negócio.
- Seguir os padrões existentes antes de introduzir novas convenções.

---

## Arquitetura

### Fluxo de requisição

```
HTTP Request
→ Middlewares/hooks de infraestrutura e autenticação
→ Validação de entrada com Yup
→ Controller
→ Service
→ Repository
→ Banco de dados via Drizzle
```

A autorização sobre um recurso específico ocorre na service ou em uma política chamada por ela.

### Routes

- Definem endpoints e métodos HTTP.
- Associam validação, autenticação e controllers.
- Não contêm regras de negócio nem consultas ao banco.

### Controllers

- Recebem dados já validados.
- Extraem o contexto necessário da requisição (ex: usuário autenticado).
- Chamam as services.
- Convertem resultados para respostas HTTP.
- Não executam consultas Drizzle.
- Não implementam regras de negócio.
- Não repetem tratamento de erros já realizado pelo handler global.

### Services

- Implementam regras de negócio e autorização sobre recursos.
- Orquestram repositories e integrações externas.
- Coordenam operações que precisam de transação.
- Não recebem objetos de request ou response do framework.
- Não retornam respostas HTTP.
- Não dependem de status HTTP para representar resultados de negócio.

### Repositories

- Centralizam consultas e persistência com Drizzle.
- Não recebem request ou response.
- Não implementam autorização nem regras de negócio.
- Recebem filtros e dados explicitamente tipados.
- Não retornam builders de consultas para os controllers.
- Aceitam o executor transacional quando necessário participar de uma transação.

---

## Estrutura de Pastas

```
src/
├── app.ts
├── server.ts
├── config/
│   └── env.ts
├── db/
│   ├── index.ts
│   └── schema/
│       └── index.ts
├── modules/
│   └── [domain]/
│       ├── routes.ts
│       ├── controller.ts
│       ├── service.ts
│       ├── repository.ts
│       ├── validations.ts
│       ├── types.ts
│       ├── constants.ts
│       └── tests/
└── shared/
    ├── errors/
    ├── middlewares/
    └── utils/
```

- `app.ts`: configura a aplicação sem iniciar o listener HTTP.
- `server.ts`: inicializa dependências, inicia o servidor e configura o encerramento gracioso.
- Criar somente os arquivos necessários para cada módulo — não criar esqueletos vazios.

---

## Colocation

- Manter tipos, constantes, validações, helpers e testes próximos ao domínio que os utiliza.
- Mover código para `shared/` apenas quando houver reutilização real entre módulos.
- Um módulo não deve acessar detalhes internos de outro módulo.
- Interações entre módulos ocorrem por pontos de entrada explícitos (services públicas).

### Organização de arquivos auxiliares

- `constants.ts`: dados estáticos, mapas e configurações locais.
- `types.ts`: declarações de tipos e interfaces do domínio.
- `validations.ts`: schemas Yup do domínio.
- Transformar esses arquivos em pastas com `index.ts` somente quando o volume justificar.

---

## TypeScript

- `strict: true` habilitado.
- Evitar `any`; usar `unknown` para valores ainda não validados.
- Não usar `as` para simular validação de dados externos.
- Evitar non-null assertions (`!`) sem garantia explícita.
- Usar `import type` para importações exclusivamente de tipos.
- Preferir inferência quando o tipo estiver evidente.
- Tratar valores opcionais, resultados vazios e erros de maneira explícita.
- Não ignorar erros de compilação com `@ts-ignore` sem justificativa documentada.

---

## Validação com Yup

- Validar body, params e query antes de executar regras de negócio.
- Não confiar na validação realizada pelo frontend.
- Usar `abortEarly: false` para coletar todos os erros de validação.
- Inferir tipos com `yup.InferType<typeof schema>`.
- Separar schemas de criação, atualização e filtros quando suas regras forem diferentes.
- Definir explicitamente se campos desconhecidos serão rejeitados ou removidos (`stripUnknown` ou `strict`).
- Não aplicar schema de criação diretamente a uma atualização parcial.
- Rejeitar atualizações vazias quando a operação exigir ao menos uma alteração.

**Responsabilidades:**
- Yup valida estrutura, formatos e restrições de entrada.
- Services validam regras de negócio e autorização.
- O banco garante integridade com constraints.

---

## Drizzle ORM

- Definir tabelas, relações, índices e constraints no schema Drizzle.
- Organizar schemas por domínio dentro de `src/db/schema/`.
- Inferir tipos com `$inferSelect` e `$inferInsert`.
- Não duplicar manualmente tipos que podem ser inferidos.
- Separar tipos de persistência, entradas validadas e respostas públicas quando representarem contratos diferentes.

### Consultas

- Manter consultas dentro dos repositories.
- Selecionar apenas as colunas necessárias.
- Nunca retornar `password_hash` ou campos sensíveis.
- Nunca concatenar entrada do usuário em SQL.
- Evitar consultas N+1.
- Aplicar limites em listagens.
- Definir ordenação determinística na paginação.

### Integridade

- Usar constraints de unicidade, chaves estrangeiras e outras garantias no banco.
- Tratar violações esperadas de constraints sem expor detalhes internos.
- Não assumir que uma consulta seguida de uma alteração será atômica — usar transações quando necessário.

---

## Contratos da API

- Definir entradas e respostas explícitas por operação.
- Não expor diretamente registros completos do banco.
- Manter consistência entre status HTTP e resultado da operação.
- Não retornar erro com status de sucesso.

---

## Regras de Negócio do MVP

- **Autenticação:** JWT emitido via cookies seguros (HttpOnly, SameSite, Secure).
- **Senhas:** encriptadas com bcrypt ou argon2id.
- **CRM:** validar apenas formato via regex (dígitos numéricos + UF em 2 letras maiúsculas). Sem aprovação manual.
- **Slug:** gerado na primeira publicação (kebab-case + hash 6-8 chars). Imutável após criação.
- **Posts:** sempre vinculados a uma `community_id`. Máximo 3 tags.
- **Comunidades:** máximo 3 categorias.
- **Likes:** apenas em posts (não em comentários).
- **Uploads:** exclusivo para capa do post via Presigned URL (Cloudflare R2). Sem imagens inline.
- **Delete:** hard delete apenas. Sem `deleted_at` ou soft delete.
- **Notificações:** LIKE → autor do post; COMMENT (root) → autor do post; REPLY → autor do comentário pai.
- **Sem:** recuperação de senha, moderação/denúncias, views_count, avatars customizados.
