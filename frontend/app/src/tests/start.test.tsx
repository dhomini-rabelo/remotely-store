import HomePage from '../pages/index.page'
import { render } from '@testing-library/react'
import { HomePropsData } from './data'

it('changes the class when hovered', () => {
  render(<HomePage {...HomePropsData} />)
})
