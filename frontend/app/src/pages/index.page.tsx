import { Home, HomeProps } from './home'
import { GetStaticProps } from 'next'
import { simpleClient } from '@/code/settings/main'
import { CartProvider } from '@/code/contexts/Cart'

export default function HomePage(props: HomeProps) {
  return (
    <CartProvider>
      <Home {...props} />
    </CartProvider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await simpleClient.get('/home/data')
    const data = response.data as HomeProps
    console.log(data)
    return {
      props: {
        departments: data.departments,
        products: data.products.map((product) => ({
          ...product,
          rating: product.rating / 10,
          price: {
            value: product.price.value / 100,
            promotional_value: product.price.promotional_value
              ? product.price.promotional_value / 100
              : null,
            currentValue: product.price.promotional_value
              ? product.price.promotional_value / 100
              : product.price.value / 100,
          },
        })),
        banner: data.banner,
      },
      revalidate: 60 * 60 * 6,
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
