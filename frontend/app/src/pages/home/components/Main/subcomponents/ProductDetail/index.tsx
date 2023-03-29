import { activeProductAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'
import { getImage } from '@/code/utils/layout'
import Image from 'next/image'

export function ProductDetail() {
  const [activeProduct] = useAtom(activeProductAtom)
  return (
    <main id="product-container" className="flex flex-col grow w-full h-full" >
      <div className="flex justify-center items-center w-full min-h-[86px] py-4">
        <Image
          src={getImage(activeProduct!.image)}
          width={372}
          height={440}
          alt={activeProduct!.description}
        />
      </div>
      <div className='bg-white grow'></div>
    </main >
  )
}
