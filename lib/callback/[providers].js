import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback = ({ query }) => {
  const router = useRouter();
  const { access_token } = query;
  useEffect(() => {
    // validate the token
    // check the expiration time
    // check the token signature and issuer
    // store the token in the session
    // redirect the user back to the application's home page
    axios.post('/api/auth/token', { access_token }).then(() => {
      router.replace('/');
    });
  }, []);
  return <div>Processing token...</div>;
};

export default Callback;