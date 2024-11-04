import AnimatedSvgPath from '@/components/AnimatedSvgPath'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/Scene'), {
    ssr: false,
})

export default function Home() {
  return (
    <main className='bg-[rgb(17,17,17)]'>
        <Scene />
        <AnimatedSvgPath />
    </main>
  )
}