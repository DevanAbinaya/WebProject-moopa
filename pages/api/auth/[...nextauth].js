import { useEffect, useState } from 'react'
import Router from 'next/router'
import { useSession } from 'next-session'

const handleAuthCallback = async (ctx) => {
    const {access_token} = ctx.query;
    const {session} = await useSession(ctx);
    session.set({access_token});
    Router.push('/')
}

const useAccessToken = () => {
  const [access_token, setAccessToken] = useState(null)
  const { session } = useSession()
  useEffect(() => {
    if (session.access_token) {
      setAccessToken(session.access_token)
    }
  }, [session])

  return access_token
}

export {handleAuthCallback,useAccessToken}
