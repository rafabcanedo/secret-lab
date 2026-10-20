"use client"

import Image from "next/image"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import type { InferType } from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FormInput } from "@/components/form-input"
import { FormSelect } from "@/components/form-select"
import { signUpSchema } from "@/validations/schemas"
import logo from "@/assets/logo-secret-lab.png"
import { ufOptions, specialtyOptions } from "./constants"
import type { AuthViewProps } from "../../interfaces"

type SignUpFormData = InferType<typeof signUpSchema>

export function SignUpForm({ onSwitchView }: AuthViewProps) {
  const methods = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  })

  function onSubmit(data: SignUpFormData) {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="ring-0 shadow-none bg-transparent">
          <CardHeader className="justify-items-center text-center">
            <Image src={logo} alt="Secret Lab" height={40} />
            <h2 className="text-lg font-semibold">Create account</h2>
            <p className="text-sm text-muted-foreground">Join the Secret Lab community</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormInput name="name" label="Name" type="text" placeholder="Your full name" />
            <FormInput name="email" label="Email" type="email" placeholder="you@example.com" />
            <FormInput name="password" label="Password" type="password" />
            <FormInput name="crm" label="CRM" type="text" placeholder="123456" />
            <FormSelect name="uf" label="UF" placeholder="Select state" options={ufOptions} />
            <FormSelect name="specialty" label="Specialty" placeholder="Select specialty" options={specialtyOptions} />
            <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
              Create account
            </Button>
            <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              Already have an account?
              <button
                type="button"
                className="font-medium text-primary hover:underline"
                onClick={onSwitchView}
              >
                Sign in
              </button>
            </p>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  )
}
