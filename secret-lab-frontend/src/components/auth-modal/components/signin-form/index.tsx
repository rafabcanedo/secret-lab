"use client"

import Image from "next/image"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import type { InferType } from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FormInput } from "@/components/form-input"
import { signInSchema } from "@/validations/schemas"
import logo from "@/assets/logo-secret-lab.png"
import type { AuthViewProps } from "../../interfaces"

type SignInFormData = InferType<typeof signInSchema>

export function SignInForm({ onSwitchView }: AuthViewProps) {
  const methods = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  })

  function onSubmit(data: SignInFormData) {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="ring-0 shadow-none bg-transparent">
          <CardHeader className="justify-items-center text-center">
            <Image src={logo} alt="Secret Lab" height={40} />
            <h2 className="text-lg font-semibold">Sign in</h2>
            <p className="text-sm text-muted-foreground">Join the Secret Lab community</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormInput name="email" label="Email" type="email" placeholder="you@example.com" />
            <FormInput name="password" label="Password" type="password" />
            <Button type="submit" className="w-full" disabled={methods.formState.isSubmitting}>
              Sign in
            </Button>
            <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              Don&apos;t have an account?
              <button
                type="button"
                className="font-medium text-primary hover:underline"
                onClick={onSwitchView}
              >
                Sign up
              </button>
            </p>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  )
}
