import { Package, User } from 'phosphor-react'
import { Header } from './components/Header'
import { useContextSelector } from 'use-context-selector'
import { AuthContext } from '@/code/contexts/Auth'
import { dateFormatter, priceFormatter } from '@/code/utils/layout/formatters'
import { PageLoading } from '@/layout/simple-components/Loading/page'

export function MyAccount() {
  const user = useContextSelector(AuthContext, (state) => state.user)

  if (!user) {
    return <PageLoading />
  }

  return (
    <div
      id="container"
      className="pt-8 grow max-w-[1148px] mx-auto flex flex-col"
    >
      <Header />
      <main className="mt-10">
        <h1 className="text-1xl font-bold">Minha conta</h1>
        <div className="bg-Gray-100 flex py-4 px-2.5 border border-Gray-500 rounded-lg gap-x-2 items-end mt-3">
          <User size={24} />
          <span className="flex gap-x-1">
            <strong className="block sm:hidden">Email: </strong>
            {user.email}
          </span>
        </div>
        <h2 className="text-1xl font-bold mt-8">Meus pedidos</h2>
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-3 gap-x-4 gap-y-3">
          {user.business.map((business) => (
            <div
              className="bg-Gray-250 p-3 flex gap-x-1 rounded-lg relative"
              key={business.id}
            >
              <Package width={98} height={102} className="text-Black-500" />
              <div className="grow pt-1 flex flex-col gap-y-0.5 inter justify-evenly">
                <span className="text-xs">
                  Data: {dateFormatter.format(new Date(business.created_at))}
                </span>
                <span className="text-xs">
                  Pagamento:{' '}
                  {business.payment_method === 'pix' ? (
                    <span className="text-green-500">PIX</span>
                  ) : (
                    <span className="text-yellow-600">Cartão</span>
                  )}
                </span>
                <span className="text-xs">
                  Itens comprados: {business.itens_quantity}
                </span>
                <span className="text-xs">
                  Total:{' '}
                  <span className="text-green-500">
                    {priceFormatter.format(business.total_value / 100)}
                  </span>
                </span>
                <span className="text-xs">
                  Status: <span className="text-yellow-600">Em análise</span>
                </span>
              </div>
              <strong className="text-Orange-500 absolute top-2 right-2 text-xs inter">
                #{business.code.toUpperCase()}
              </strong>
            </div>
          ))}
        </div>
        {user.business.length === 0 && (
          <span className="text-sm mt-3">Nenhum pedido por enquanto...</span>
        )}
      </main>
    </div>
  )
}
