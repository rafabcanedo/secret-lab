import { UF, Speciality } from "@/enums"

export const ufOptions = Object.values(UF).map((uf) => ({ value: uf, label: uf }))

export const specialtyOptions = Object.values(Speciality).map((s) => ({ value: s, label: s }))
