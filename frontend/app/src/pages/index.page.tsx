import { Home, HomeProps } from './home'
import { GetStaticProps } from 'next'
import { simpleClient } from '@/code/settings/main'

export default function HomePage(props: HomeProps) {
  return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await simpleClient.get('/home/data')
    const data = response.data as HomeProps
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
          },
        })),
      },
      revalidate: 60 * 60 * 6,
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
