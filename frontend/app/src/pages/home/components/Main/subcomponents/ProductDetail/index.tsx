import Image from 'next/image'
import StarIcon from '../../../../../../assets/icons/star.svg'
import { IProductData } from '@/pages/home/types'
import { getImage } from '@/code/utils/layout'
import { priceFormatter } from '@/code/utils/layout/formatters'
import { activeProductAtom, currentPageAtom } from '@/pages/home/code/states'
import { useAtom } from 'jotai'

export function ProductDetail() {
  const [activeProduct] = useAtom(activeProductAtom)
  return (
    <div><span>Detalhes do produto {activeProduct!.name}</span></div>
  )
}
