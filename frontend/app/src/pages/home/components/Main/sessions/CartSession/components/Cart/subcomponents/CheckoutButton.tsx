import { priceFormatter } from '@/code/utils/layout/formatters'
import { Button } from '@/layout/components/Button'
import { ArrowRight } from 'phosphor-react'

export function CheckoutContainer({
  totalValue,
  disabled,
  onClick,
}: {
  totalValue: number
  disabled: boolean
  onClick: () => void
}) {
  return (
    <div className="flex flex-col gap-y-2 sm:gap-y-8">
      <div className="flex justify-between items-center">
        <span className="text-base font-bold lh-22 inter">Total</span>
        <strong className="text-Orange-500 text-1xl lh-29">
          {priceFormatter.format(totalValue)}
        </strong>
      </div>
      <Button
        className="custom-length py-3 sm:py-5 w-full text-sm sm:text-base font-medium lh-22 flex justify-center items-center gap-x-1"
        variant="primary"
        disabled={disabled}
        onClick={onClick}
      >
        Checkout
        <ArrowRight size={16} />
      </Button>
    </div>
  )
}
