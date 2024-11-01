import dynamic from 'next/dynamic'
import styles from './page.module.css'

const Scene = dynamic(() => import('@/components/Scene'), {
    ssr: false,
})

export default function Home() {
  return (
    <main className={styles.main}>
        <Scene />
    </main>
  )
}