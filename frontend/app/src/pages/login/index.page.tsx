import { Button } from '@/layout/components/Button'
import { IndexForm } from '@/layout/themes/Form/Index/theme'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import HelloIcon from '../../assets/icons/hello.svg'
import { useForm } from 'react-hook-form'
import { ILoginSchema, LoginSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useFeedback } from '@/layout/hooks/useFeedback'
import { authConsumer, simpleClient } from '@/code/settings/main'
import { Error } from '@/layout/themes/Form/Index/Error'
import Head from 'next/head'

export default function LoginPage() {
  const LoginForm = useForm<ILoginSchema>({
    resolver: zodResolver(LoginSchema),
  })
  const router = useRouter()
  const { FeedbackElement, renderFeedback } = useFeedback()
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = LoginForm

  async function onValidSubmit(data: ILoginSchema) {
    try {
      const response = await simpleClient.post('/login', {
        username: data.email,
        password: data.password,
      })
      authConsumer.repository.saveAuthInstance({
        accessToken: response.data.access_token,
      })
      router.push('/')
    } catch (e) {
      reset(data)
      renderFeedback('error', { message: 'Credenciais inválidas', title: '' })
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {FeedbackElement}
      <main className="grow flex justify-center">
        <div className="w-full max-w-esm px-6 mt-40">
          <header className="flex items-center gap-x-2 text-1xl">
            <Image
              src={HelloIcon}
              width={22}
              height={22}
              alt="ícone de mão acenando"
            />
            <h1 className="font-bold">
              Bem vindo ao{' '}
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
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Digite seu email"
                  {...register('email')}
                />
                <Error>{errors.email?.message}</Error>
              </div>
              <div className="field">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  {...register('password')}
                />
                <Error>{errors.password?.message}</Error>
              </div>
              <Button variant="primary" isSubmitting={isSubmitting}>
                Entrar
              </Button>
            </form>
          </IndexForm.container>
          <div className="flex justify-center mt-20 mb-4">
            <Link className="text-Orange-500 font-bold" href="/cadastro">
              Cadastrar-se
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
