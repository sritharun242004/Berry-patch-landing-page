import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import Home from './pages/Home'
import Strawberry from './pages/Strawberry'
import SplashScreen from './components/SplashScreen'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const handleDone = useCallback(() => setSplashDone(true), [])

  return (
    <>
      {!splashDone && <SplashScreen onDone={handleDone} />}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/strawberry" element={<Strawberry />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
