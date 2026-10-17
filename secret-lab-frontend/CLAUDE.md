# Secret Lab — Frontend

Plataforma de blog fechada para médicos. Frontend em Next.js App Router com TypeScript.

> Trabalhar **sempre por partes**: propor → alinhar → aprovação → implementar.
> Nunca desenvolver além do que foi acordado na conversa.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 + Shadcn/ui (`base-nova` style, RSC enabled, Base UI primitives)
- TanStack React Query v5 — server state, queries, mutations
- React Hook Form v7 + Yup — form state e validação
- Sonner — toast notifications
- Lucide React — icons

## Arquitetura

```
src/app/
├── (page)/      # Todas as rotas da aplicação
└── api/         # Next.js Route Handlers (proxy para o backend Go)
```

Middleware em `src/middleware.ts` — guarda todas as rotas verificando o cookie `access_token`. Não valida JWT (delegado ao backend).

### Data Flow

```
Page/Component
  → custom hook (src/hooks/queries/ ou src/hooks/mutations/)
    → service (src/services/)
      → API client (src/lib/api-client/)
        → Next.js API route (src/app/api/)
          → Backend Go
```

- `src/hooks/queries/` — wrappers `useQuery` por domínio
- `src/hooks/mutations/` — wrappers `useMutation` por domínio
- `src/services/` — funções async puras, sem React, CRUD por entidade
- `src/lib/api-client/index.ts` — `apiCall<T>()` único com tipagem de erros (`ValidationError`, `UnauthorizedError`, etc.)

## Convenções

**Server Components por padrão.** Usar `'use client'` somente quando necessário (interatividade, hooks, browser APIs).

**Absolute imports** via alias `@/*` (mapeia para `src/*`).

**Shadcn** em `src/components/ui/`. Componentes de domínio em `src/components/[page]/`.

**Validação:** schemas em `src/validations/schemas.ts` com Yup; validadores de campo reutilizáveis em `src/validations/fields.ts`.

**Types** centralizados em `src/types/index.ts`; inclui enums de domínio como `Category` e `Specialities`.

**React Query** configurado em `src/lib/react-query/index.tsx`.

## Colocation

Manter arquivos relacionados próximos ao uso. Só mover para pasta global quando genuinamente reutilizado em múltiplos lugares.

Estrutura de componente com lógica dividida:

```
src/components/[component]/
├── index.tsx          # rendering only
├── constants/
│   └── index.ts       # dados estáticos do componente
├── interfaces/
│   └── index.ts       # só interface declarations
└── types/
    └── index.ts       # só type declarations (ou mix)
```

Mesmo padrão para rotas:

```
src/app/(page)/[rota]/
├── page.tsx
├── constants/index.ts
├── interfaces/index.ts
├── types/index.ts
├── components/
│   └── [component]/
│       └── ...
└── [sub-rota]/
    └── page.tsx
```

Regra de uso das subpastas:
- `constants/` — arrays estáticos, objetos de config, maps
- `interfaces/` — arquivos com apenas `interface` declarations
- `types/` — arquivos com apenas `type` declarations, ou mix de ambos

## MVP — Restrições rígidas

- **Hard delete** apenas (sem soft delete / `deleted_at`)
- Sem fluxo de recuperação de senha
- Sem moderação / denúncias
- Sem `views_count` (feed Popular = ordenado por curtidas)
- Sem avatars customizados
- Imagens apenas para capa do post (Cloudflare R2 via presigned URL)
- Slug imutável após publicação
- Máximo 3 tags por post, máximo 3 categorias por comunidade
- Validação de CRM por regex (sem aprovação manual)
