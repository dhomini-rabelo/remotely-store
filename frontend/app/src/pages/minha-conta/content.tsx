import { Package, User } from 'phosphor-react'
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
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-3">
          <div className="bg-Gray-250 p-3 flex gap-x-1 rounded-lg relative">
            <Package width={98} height={102} className="text-Black-500" />
            <div className="grow pt-2 flex flex-col gap-y-1 inter justify-evenly">
              <span className="text-xs">Data: 12/42/33</span>
              <span className="text-xs">Itens: 5</span>
              <span className="text-xs">
                Total: <span className="text-green-500">R$ 50,00</span>
              </span>
              <span className="text-xs">
                Total: <span className="text-yellow-600">Em análise</span>
              </span>
            </div>
            <strong className="text-Orange-500 absolute top-2 right-2 text-xs inter">
              #AHBASHBDU23
            </strong>
          </div>
        </div>
      </main>
    </div>
  )
}
