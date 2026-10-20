"use client"

import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import type { InferType } from "yup"
import { Heart, Users, Activity, Microscope, FlaskConical } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form-input"
import { CommunityDescriptionText } from "@/components/community/description-text"
import { CategoryPicker } from "@/components/community/category-picker"
import { createCommunitySchema } from "@/validations/schemas"

type FormData = InferType<typeof createCommunitySchema>

export function CreateCommunityForm() {
  const router = useRouter()
  const methods = useForm<FormData>({
    resolver: yupResolver(createCommunitySchema),
    defaultValues: { categories: [] },
  })

  function onSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <Card className="w-full max-w-4xl overflow-hidden shadow-lg">
      <div className="grid grid-cols-2">
        <div className="relative hidden md:flex flex-col items-center justify-center gap-6 border-r border-border bg-primary/5 p-12 overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <div className="rounded-2xl bg-primary/10 p-6">
              <Users className="size-12 text-primary" />
            </div>
            <p className="max-w-[180px] text-sm text-muted-foreground">
              Bring together physicians around a shared specialty or topic
            </p>
          </div>
          <Heart className="absolute -top-6 -right-6 size-40 text-primary/5" />
          <Activity className="absolute top-8 left-4 size-16 text-primary/8" />
          <Microscope className="absolute bottom-10 right-6 size-20 text-primary/8" />
          <FlaskConical className="absolute -bottom-4 -left-4 size-32 text-primary/5" />
        </div>

        <div className="flex flex-col justify-center gap-6 p-8">
          <div>
            <h1 className="text-2xl font-semibold">Create Community</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Define a space for focused medical discussion
            </p>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormInput name="name" label="Name" placeholder="e.g. Cardiologia Clínica" />
              <CommunityDescriptionText />
              <CategoryPicker />
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={methods.formState.isSubmitting}>
                  Create
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Card>
  )
}
