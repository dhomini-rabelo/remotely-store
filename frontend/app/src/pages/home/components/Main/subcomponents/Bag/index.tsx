import { Tote } from 'phosphor-react'

export function Bag({ inHeader }: { inHeader: boolean }) {
  return inHeader ? (
    <div className="relative sm:hidden">
      <div className="bg-Black-500 p-2.5 rounded-full flex justify-center items-center">
        <Tote className="w-[1.75rem] h-[1.75rem]" color="#fff" />
      </div>
      <div className="absolute bg-[#FF7B2C] py-1 px-[0.54rem] -right-1 -top-1 rounded-full text-white text-xs">
        1
      </div>
    </div>
  ) : (
    <div className="fixed right-4 bottom-4 hidden sm:block">
      <div className="bg-Black-500 w-[3.8rem] h-[3.8rem] rounded-full flex justify-center items-center">
        <Tote height={32} width={28} color="#fff" />
      </div>
      <div className="absolute bg-[#FF7B2C] py-1 px-[0.54rem] -right-1 -top-1 rounded-full text-white text-xs">
        1
      </div>
    </div>
  )
}
