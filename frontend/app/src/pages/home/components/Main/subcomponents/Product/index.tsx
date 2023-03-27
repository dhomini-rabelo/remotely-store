import ClockImage from '../../../../../../assets/images/clock.svg'
import Image from 'next/image'
import StarIcon from '../../../../../../assets/icons/star.svg'

export function Product() {
  return (
    <div className="bg-white p-3 flex gap-x-2.5 border border-Gray-300 rounded-lg">
      <div className="flex justify-center items-center bg-Gray-200 p-2.5 min-w-[105px] min-h-[86px]">
        <Image
          src={ClockImage}
          width={60}
          height={60}
          alt="Imagem que representa o produto"
        />
      </div>
      <div className="flex flex-col">
        <strong className="lh-22 text-base font-medium">
          Smart Apple Watch
        </strong>
        <div className="mt-1 mb-3 text-xs flex gap-x-2">
          <span className="text-Gray-500 font-medium">Hughlan</span>
          <span>•</span>
          <span className="flex items-center gap-x-1">
            <span className="text-Gray-600">4,8</span>
            <Image
              src={StarIcon}
              width={12}
              height={12}
              alt="Ícone de estrela amarela"
              className="inline-block"
            />
          </span>
        </div>
        <strong className="text-Orange-500">R$ 59,90</strong>
      </div>
    </div>
  )
}
