import { GetServerSideProps } from 'next'
import { authConsumer } from '@/code/modules/Auth'

export default function MyAccountPage() {
  return (
    <div>
      <h1>Minha conta</h1>
    </div>
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
