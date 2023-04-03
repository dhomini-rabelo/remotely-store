import { GetServerSideProps } from 'next'
import { authConsumer } from '@/code/modules/Auth'
import { MyAccount } from './content'

export default function MyAccountPage() {
  return <MyAccount />
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const authInstance = authConsumer.getAuthInstanceInServerSide(req, res)
  if (!authInstance.isAuthenticated) {
    authConsumer.killAuthInstanceInServerSide(req, res)
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
