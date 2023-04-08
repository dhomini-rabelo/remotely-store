import { getImage } from '@/code/utils/layout'
import Image from 'next/image'

export function Department({
  name,
  imageUrl,
}: {
  name: string
  imageUrl: string
}) {
  return (
    <div className="bg-Gray-250 flex flex-col gap-y-3 p-2 pb-3 rounded-lg w-full justify-center items-center">
      <Image
        src={getImage(imageUrl)}
        width={120}
        height={104}
        alt="Imagem que representa o departamento"
      />
      <strong className="leading-[22px] text-xs text-center">{name}</strong>
    </div>
  )
}
