import { CircleNotch } from 'phosphor-react'
import { Div } from './styles'

export function SimpleLoading({ color = '#fff' }: { color?: string }) {
  return (
    <Div.container
      className="flex items-center justify-center overflow-hidden"
      color={color}
    >
      <CircleNotch weight="bold" className="animate-spin" size={20} />
    </Div.container>
  )
}
