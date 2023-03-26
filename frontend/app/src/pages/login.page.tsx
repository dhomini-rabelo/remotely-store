import { IndexForm } from '@/layout/themes/Form/Index/theme'
import Image from 'next/image'
import HelloIcon from '../assets/icons/hello.svg'

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
            Welcome to <span className="text-Green-100">Remotely.io</span>
          </h1>
        </header>
        <IndexForm.container>
          <form className="mt-16 flex flex-col gap-y-6">
            <div className="field">
              <label htmlFor="">Email</label>
              <input type="text" placeholder="Digite seu email" />
            </div>
            <div className="field">
              <label htmlFor="">Password</label>
              <input type="password" placeholder="Digite sua senha" />
            </div>
            <button>Entrar</button>
          </form>
        </IndexForm.container>
        <div className="flex justify-between mt-40">
          <a href="">Esqueceu a senha?</a>
          <a href="">Login</a>
        </div>
      </div>
    </main>
  )
}