import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import LoadingScreen from '../components/loadingScreen';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { AnimatePresence, motion as m } from 'framer-motion';

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => {
      (url !== router.asPath) && setLoading(true);
      window.scrollTo({ top: 0, });
    } 
    const handleComplete = (url) => {
      (url !== router.asPath) && setLoading(false);
      document.body.style.overflow = "auto";
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
    router.events.off('routeChangeStart', handleStart)
    router.events.off('routeChangeComplete', handleComplete)
    router.events.off('routeChangeError', handleComplete)
    }
  })

  return loading && (
    <LoadingScreen>
      {document.body.style.overflow = "hidden"}
    </LoadingScreen>
  )
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
          <>
                <ThemeProvider attribute='class'>
                  <AnimatePresence mode='wait'>
                    <div className='relative'>
                    <Loading key={`loading-${router.route}`} className="absolute"/>
                      <m.div
                        key={`route-${router.route}`}
                        transition={{duration: 0.5}}
                        initial="initialState"
                        animate="animateState"
                        exit="exitState"
                        variants={{
                          initialState: {
                            opacity: 0,
                          },
                          animateState: {
                            opacity: 1,
                          },
                          exitState: {
                          },
                        }} 
                        className="w-screen z-10"
                      >
                        <Component {...pageProps} />
                      </m.div> 
                    </div>
                  </AnimatePresence>
                </ThemeProvider>
          </>
  )
}