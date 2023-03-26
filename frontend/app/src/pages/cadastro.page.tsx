import { Button } from '@/layout/components/Button'
import { IndexForm } from '@/layout/themes/Form/Index/theme'

export default function RegisterPage() {
  return (
    <main className="grow flex justify-center">
      <div className="w-full max-w-esm px-6 mt-28">
        <header>
          <h1 className="font-bold text-1xl">
            Cadastre-se no <span className="text-Green-300">Remotely.io</span>
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
            <div className="field">
              <label htmlFor="">Confirmar senha</label>
              <input type="password" placeholder="Digite sua senha" />
            </div>
            <Button variant="primary">Cadastrar</Button>
          </form>
        </IndexForm.container>
        <div className="flex justify-center mt-20">
          <a className="text-Orange-500 font-bold" href="/login">
            Entrar
          </a>
        </div>
      </div>
    </main>
  )
}
