import { Home, HomeProps } from './home'
import { GetStaticProps } from 'next'
import { simpleClient } from '@/code/settings/main'

export default function HomePage(props: HomeProps) {
  return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await simpleClient.get('/home/data')
    console.log(response.data)
    return {
      props: response.data,
      revalidate: 60 * 60 * 6,
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
