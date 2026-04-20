import { useEffect, useState } from 'react'
import './SplashScreen.css'

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('visible') // visible → lifting → done

  useEffect(() => {
    // Hold logo centered, then lift
    const lift = setTimeout(() => setPhase('lifting'), 1200)
    // After lift animation completes, unmount
    const done = setTimeout(() => { setPhase('done'); onDone() }, 2000)
    return () => { clearTimeout(lift); clearTimeout(done) }
  }, [onDone])

  if (phase === 'done') return null

  return (
    <div className={`splash ${phase === 'lifting' ? 'splash--lift' : ''}`}>
      <img
        src="/berry logo.png"
        alt="The Berry Patch"
        className={`splash__logo ${phase === 'lifting' ? 'splash__logo--lift' : ''}`}
      />
    </div>
  )
}
