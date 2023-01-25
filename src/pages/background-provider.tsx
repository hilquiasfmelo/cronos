import Image from 'next/image'

import bgWave from '../assets/bg-wave.svg'

export function BackgroundProvider() {
  return (
    <>
      <Image
        src={bgWave}
        fill
        quality={100}
        priority
        alt="Calendário com a logo da OAB"
      />
    </>
  )
}
