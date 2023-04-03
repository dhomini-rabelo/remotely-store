import { CircleNotch } from 'phosphor-react'

export function PageLoading() {
  return (
    <div className="grow flex justify-center items-center text-xl">
      <CircleNotch weight="bold" className="w-5 h-5 animate-spin inline" />
      <span className="font-semibold ml-1">Carregando...</span>
    </div>
  )
}
