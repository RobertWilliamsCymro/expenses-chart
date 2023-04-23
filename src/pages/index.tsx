import Image from 'next/image'
import Logo from '../../public/logo.svg'
export default function Home() {
  return (
    <main className="bg-cream flex items-center min-h-screen justify-center w-[23.438rem] sm:w-[90rem] mx-auto text-lg font-bold">
    <div className="w-1/3 rounded-md">
      <div className="bg-soft-red text-white mb-2">
        <p>My balance</p>
        <Image className="mx-auto" src={Logo} alt=""></Image>
      </div>
      <div className="bg-pale-orange">Spending - Last 7 Days</div>
    </div>
    </main>
  )
}
