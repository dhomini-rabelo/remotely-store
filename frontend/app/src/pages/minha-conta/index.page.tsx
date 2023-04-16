import { GetServerSideProps } from 'next'
import { MyAccount } from './content'
import { AuthProvider } from '@/code/contexts/Auth'
import Head from 'next/head'
import { authConsumer } from '@/code/settings/main'

export default function MyAccountPage() {
  return (
    <>
      <Head>
        <title>Remotely | Conta</title>
      </Head>
      <AuthProvider>
        <MyAccount />
      </AuthProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const authInstance = authConsumer.repository.getAuthInstanceInServerSide(
    req,
    res,
  )
  if (!authInstance.isAuthenticated) {
    authConsumer.repository.killAuthInstanceInServerSide(req, res)
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }
  return {
    props: {},
  }
}
