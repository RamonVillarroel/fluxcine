import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ApiKeyBanner from './components/ApiKeyBanner'

const Home       = lazy(() => import('./pages/Home'))
const Discover   = lazy(() => import('./pages/Discover'))
const Search     = lazy(() => import('./pages/Search'))
const TitleDetail= lazy(() => import('./pages/TitleDetail'))
const Dmca       = lazy(() => import('./pages/Dmca'))
const Legal      = lazy(() => import('./pages/Legal'))
const Privacy    = lazy(() => import('./pages/Privacy'))
const NotFound   = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-apple-bg">
      <ApiKeyBanner />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <LoadingSpinner size={36} />
          </div>
        }>
          <ScrollToTop />
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/search"   element={<Search />} />
            <Route path="/title/:id"element={<TitleDetail />} />
            <Route path="/dmca"     element={<Dmca />} />
            <Route path="/legal"    element={<Legal />} />
            <Route path="/privacy"  element={<Privacy />} />
            <Route path="*"         element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
