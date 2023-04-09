import { Home, HomeProps } from './home'
import { GetStaticProps } from 'next'
import { simpleClient } from '@/code/settings/main'
import { CartProvider } from '@/code/contexts/Cart'
import Head from 'next/head'

export default function HomePage(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Remotely.io</title>
      </Head>
      <CartProvider>
        <Home {...props} />
      </CartProvider>
    </>
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
        products: data.products.map((product) => {
          const onSale = !!product.price.promotional_value
          const price = product.price.value / 100
          const promotionalPrice = onSale
            ? product.price.promotional_value! / 100
            : null
          const discount = onSale
            ? parseInt((((price - promotionalPrice!) / price) * 100).toString())
            : 0

          return {
            ...product,
            rating: product.rating / 10,
            price: {
              onSale,
              value: product.price.value / 100,
              promotional_value: promotionalPrice,
              currentValue: onSale ? promotionalPrice : price,
              discount,
            },
          }
        }),
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
