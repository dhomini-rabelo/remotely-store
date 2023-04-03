import { GetServerSideProps } from 'next'
import { authConsumer } from '@/code/modules/Auth'
import { MyAccount } from './content'
import { AuthProvider } from '@/code/contexts/Auth'

export default function MyAccountPage() {
  return (
    <AuthProvider>
      <MyAccount />
    </AuthProvider>
  )
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
