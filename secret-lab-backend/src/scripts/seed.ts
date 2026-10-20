import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { categories } from "../db/schema/categories.js"
import { tags } from "../db/schema/tags.js"
import { toKebabCase } from "../shared/utils/slug.js"

const databaseUrl = process.env["DATABASE_URL"]
if (!databaseUrl) throw new Error("Missing required env var: DATABASE_URL")

const client = postgres(databaseUrl)
const db = drizzle(client)

const categoryNames = [
  "Clínica Médica",
  "Cirurgia Geral",
  "Cirurgia Cardiovascular",
  "Cirurgia Plástica",
  "Cirurgia do Aparelho Digestivo",
  "Pediatria",
  "Neonatologia",
  "Ginecologia & Obstetrícia",
  "Psiquiatria",
  "Neurologia",
  "Neurocirurgia",
  "Cardiologia",
  "Ortopedia & Traumatologia",
  "Dermatologia",
  "Oftalmologia",
  "Otorrinolaringologia",
  "Radiologia & Diagnóstico por Imagem",
  "Medicina Nuclear",
  "Oncologia",
  "Hematologia",
  "Infectologia",
  "Medicina de Emergência",
  "Medicina Intensiva",
  "Anestesiologia",
  "Reumatologia",
  "Endocrinologia",
  "Gastroenterologia",
  "Nefrologia",
  "Urologia",
  "Pneumologia",
  "Medicina de Família e Comunidade",
  "Geriatria",
  "Medicina do Trabalho",
  "Medicina Esportiva",
  "Patologia",
]

const tagNames = [
  "Hipertensão Arterial",
  "Diabetes Tipo 1",
  "Diabetes Tipo 2",
  "Infarto Agudo do Miocárdio",
  "Insuficiência Cardíaca",
  "Arritmia Cardíaca",
  "Fibrilação Atrial",
  "AVC Isquêmico",
  "AVC Hemorrágico",
  "Sepse",
  "Choque Séptico",
  "Pneumonia",
  "DPOC",
  "Asma",
  "Tuberculose",
  "HIV/AIDS",
  "COVID-19",
  "Dengue",
  "Malária",
  "Hepatite B",
  "Hepatite C",
  "Câncer de Mama",
  "Câncer de Pulmão",
  "Câncer de Próstata",
  "Câncer Colorretal",
  "Leucemia",
  "Linfoma",
  "Melanoma",
  "Alzheimer",
  "Parkinson",
  "Epilepsia",
  "Esclerose Múltipla",
  "Enxaqueca",
  "Depressão",
  "Ansiedade",
  "Transtorno Bipolar",
  "Esquizofrenia",
  "Burnout",
  "Artrite Reumatoide",
  "Lúpus",
  "Osteoporose",
  "Insuficiência Renal Crônica",
  "Síndrome Nefrótica",
  "Cirrose Hepática",
  "Doença de Crohn",
  "Colite Ulcerativa",
  "Refluxo Gastroesofágico",
  "Úlcera Péptica",
  "Pancreatite",
  "Hipotireoidismo",
  "Hipertireoidismo",
  "Síndrome Metabólica",
  "Obesidade",
  "Anemia",
  "Coagulopatia",
  "Vacinas",
  "Antibióticos",
  "Medicina Preventiva",
  "Saúde Mental",
  "Urgência & Emergência",
  "Cirurgia Robótica",
  "Transplante de Órgãos",
  "Cuidados Paliativos",
  "Dor Crônica",
  "Medicina Fetal",
  "Saúde do Idoso",
  "Saúde da Mulher",
  "Saúde da Criança",
  "Medicina Baseada em Evidências",
]

async function seed() {
  const categoryRows = categoryNames.map((name) => ({ name, slug: toKebabCase(name) }))
  const tagRows = tagNames.map((name) => ({ name, slug: toKebabCase(name) }))

  const insertedCategories = await db
    .insert(categories)
    .values(categoryRows)
    .onConflictDoNothing()
    .returning({ id: categories.id })

  const insertedTags = await db
    .insert(tags)
    .values(tagRows)
    .onConflictDoNothing()
    .returning({ id: tags.id })

  console.log(`categories inserted: ${insertedCategories.length}`)
  console.log(`tags inserted: ${insertedTags.length}`)

  await client.end()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
