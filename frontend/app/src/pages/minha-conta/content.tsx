import { User } from 'phosphor-react'
import { Header } from './components/Header'

export function MyAccount() {
  return (
    <div
      id="container"
      className="mt-8 grow max-w-[1148px] mx-auto flex flex-col"
    >
      <Header />
      <main className="mt-10">
        <h1 className="text-1xl font-bold">Minha conta</h1>
        <div className="bg-Gray-100 flex py-4 px-2.5 border border-Gray-500 rounded-lg gap-x-2 items-end mt-3">
          <User size={24} />
          <span className="flex gap-x-1">
            <strong className="block sm:hidden">Email: </strong>
            dhominirabelo@gmail.com
          </span>
        </div>
        <h2 className="text-1xl font-bold mt-8">Meus pedidos</h2>
      </main>
    </div>
  )
}
