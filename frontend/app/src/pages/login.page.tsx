import Image from 'next/image'
import HelloIcon from '../assets/icons/hello.svg'

export default function LoginPage() {
  return (
    <main className="grow flex justify-center">
      <div className="w-full max-w-esm px-6 mt-40">
        <div className="flex items-center gap-x-2 text-1xl">
          <Image
            src={HelloIcon}
            width={22}
            height={22}
            alt="ícone de mão acenando"
          />
          <h1 className="font-bold">
            Welcome to <span className="text-Green-100">Remotely.io</span>
          </h1>
        </div>
      </div>
    </main>
  )
}
