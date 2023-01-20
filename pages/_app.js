import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import LoadingScreen from '../components/loadingScreen';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url) => (url !== router.asPath) && setLoading(false);

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
    <LoadingScreen />
  )
}

export default function App({ Component, pageProps }) {
  return (
          <>
            <ThemeProvider attribute='class'>
                <Component {...pageProps} />
            </ThemeProvider>
          </>
  )
}