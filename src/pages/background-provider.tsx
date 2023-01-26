import Image from 'next/image'

import bgWave from '../assets/bg-wave.svg'

export function BackgroundProvider() {
  return (
    <>
      <Image
        src={bgWave}
        fill
        style={{ position: 'absolute', zIndex: -1 }}
        quality={100}
        priority
        alt="ondas em azul e branco"
      />
    </>
  )
}
