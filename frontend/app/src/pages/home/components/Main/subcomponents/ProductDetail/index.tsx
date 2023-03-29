import { activeProductAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import { getImage } from '@/code/utils/layout'
import Image from 'next/image'

export function ProductDetail() {
  const [activeProduct] = useAtom(activeProductAtom)
  return (
    <main id="product-container">
      <div className="flex justify-center items-center w-full min-h-[86px]">
        <Image
          src={getImage(activeProduct!.image)}
          width={372}
          height={540}
          alt={activeProduct!.description}
        />
      </div>
    </main>
  )
}
