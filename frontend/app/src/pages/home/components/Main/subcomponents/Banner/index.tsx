import { Button } from '@/layout/components/Button'
import Image from 'next/image'
import OfficeChairIcon from '../../../../../../assets/icons/office-chair.svg'
import StarIcon from '../../../../../../assets/icons/star.svg'

export function Banner() {
  return (
    <div className="bg-Black-500 rounded-[32px] flex text-white relative mt-1 px-6">
      <div className="flex flex-col grow my-6">
        <strong>
          Cadeira de Escritório
          <br />
          adaptável
        </strong>
        <div className="mt-2 mb-5 text-xs flex gap-x-2">
          <span className="text-Gray-500 font-medium">Hughlan</span>
          <span>•</span>
          <span className="flex items-center gap-x-0.5">
            <span className="text-Gray-300">4,8</span>
            <Image
              src={StarIcon}
              width={12}
              height={12}
              alt="Ícone de estrela amarela"
              className="inline-block relative bottom-[1px]"
            />
          </span>
        </div>
        <div className="flex gap-x-1">
          <Button className="custom-length py-2.5 px-3" variant="primary">
            R$ 599,90
          </Button>
          <strong className="rounded-full bg-red-500 text-white p-2 text-sm flex flex-col justify-center">
            45%
          </strong>
        </div>
      </div>
      <Image
        src={OfficeChairIcon}
        width={129}
        height={246}
        alt="Cadeira de escritório simples"
        className="absolute right-6 -top-10"
      />
    </div>
  )
}
