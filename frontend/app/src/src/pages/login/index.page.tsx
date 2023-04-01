import { Button } from '@/layout/components/Button'
import { IndexForm } from '@/layout/themes/Form/Index/theme'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import HelloIcon from '../../assets/icons/hello.svg'

export default function LoginPage() {
  return (
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
            Bem vindo ao <span className="text-Green-300">Remotely.io</span>
          </h1>
        </header>
        <IndexForm.container>
          <form className="mt-16 flex flex-col gap-y-6">
            <div className="field">
              <label htmlFor="">Email</label>
              <input type="text" placeholder="Digite seu email" />
            </div>
            <div className="field">
              <label htmlFor="">Senha</label>
              <input type="password" placeholder="Digite sua senha" />
            </div>
            <Button variant="primary">Entrar</Button>
          </form>
        </IndexForm.container>
        <div className="flex justify-center mt-20">
          <Link className="text-Orange-500 font-bold" href="/cadastro">
            Cadastrar-se
          </Link>
        </div>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}