'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/design-system/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/design-system/ui/Form'
import { Input } from '@/design-system/ui/Input'
import Spinner from '@/design-system/ui/Spinner'
import { useToast } from '@/design-system/ui/Toast/use-toast'
import Typography from '@/design-system/ui/Typography'
import { LoginSchemaValidation } from './LoginSchemaValidation'

export default function Login() {
  const toast = useToast()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const from = searchParams.get('from')

  const form = useForm<z.infer<typeof LoginSchemaValidation>>({
    resolver: zodResolver(LoginSchemaValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchemaValidation>) {
    const { email, password } = values

    setIsLoading(true)
    signIn('credentials', {
      email,
      password,
      redirect: false,
    }).then((response) => {
      if (response?.error) {
        console.log('error', response.error)
        setIsLoading(false)
        form.setValue('password', '')
        toast.toast({
          description: 'Usuário ou senha inválidos',
          variant: 'destructive',
        })
      } else {
        location.href = from ? from : '/'
      }
    })
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Typography variant="h3">Login</Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input placeholder="Seu e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button aria-disabled={isLoading} disabled={isLoading} type="submit">
            {isLoading && (
              <span className="pr-4">
                <Spinner />
              </span>
            )}{' '}
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}
