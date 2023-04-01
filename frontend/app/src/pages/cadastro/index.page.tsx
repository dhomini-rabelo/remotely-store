import { Button } from '@/layout/components/Button'
import { IndexForm } from '@/layout/themes/Form/Index/theme'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RegisterUserSchema, RegisterUserSchemaType } from './schema'
import { useFeedback } from '@/layout/hooks/useFeedback'
import { processFormErrorResponse } from '@/code/utils/errors'
import { simpleClient } from '@/code/settings/main'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { Error } from '@/layout/themes/Form/Index/Error'
import { GetStaticProps } from 'next'

export default function RegisterPage() {
  const { FeedbackElement, renderFeedback } = useFeedback()
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setError,
    reset,
  } = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
  })
  const router = useRouter()

  async function onValidSubmit(data: RegisterUserSchemaType) {
    try {
      await simpleClient.post('register', {
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      })
      renderFeedback('success', {
        message: 'Usuário cadastrado com sucesso',
        onClose: () => router.push('/login'),
      })
    } catch (error) {
      processFormErrorResponse<RegisterUserSchemaType>(
        error as AxiosError,
        data,
        setError,
        reset,
        renderFeedback,
      )
    }
  }

  return (
    <>
      {FeedbackElement}
      <main className="grow flex justify-center">
        <div className="w-full max-w-esm px-6 mt-28">
          <header>
            <h1 className="font-bold text-1xl">
              Cadastre-se no{' '}
              <Link href="/" className="text-Green-300">
                Remotely.io
              </Link>
            </h1>
          </header>
          <IndexForm.container>
            <form
              className="mt-16 flex flex-col gap-y-6"
              onSubmit={handleSubmit(onValidSubmit)}
            >
              <div className="field">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="Digite seu email"
                  {...register('email')}
                />
                <Error>{errors.email?.message}</Error>
              </div>
              <div className="field">
                <label htmlFor="">Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  {...register('password')}
                />
                <Error>{errors.password?.message}</Error>
              </div>
              <div className="field">
                <label htmlFor="">Confirmar senha</label>
                <input
                  type="password"
                  placeholder="Confirme sua senha"
                  {...register('confirm_password')}
                />
                <Error>{errors.confirm_password?.message}</Error>
              </div>
              <Button variant="primary" isSubmitting={isSubmitting}>
                Cadastrar
              </Button>
            </form>
          </IndexForm.container>
          <div className="flex justify-center mt-20">
            <Link className="text-Orange-500 font-bold" href="/login">
              Entrar
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
