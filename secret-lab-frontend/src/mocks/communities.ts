import type { CommunityPublic } from "@/types"

export const mockCommunities: CommunityPublic[] = [
  {
    id: "1",
    creatorId: "u1",
    name: "Cardiologia",
    slug: "cardiologia",
    description: "Comunidade para discussão de casos e artigos em cardiologia.",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    memberCount: 142,
    categories: [
      { id: "c1", name: "Clínica", slug: "clinica" },
      { id: "c2", name: "Intervencionista", slug: "intervencionista" },
    ],
  },
]
