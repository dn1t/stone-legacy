import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginForm from '../components/login';

const Login = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    console.log(status);
    if (status === 'authenticated') router.replace('/');
  }, [status]);

  return (
    <div className='max-w-xl w-full'>
      <div className='mt-8 mb-1.5 px-4'>
        <h1 className='font-semibold text-xl'>로그인</h1>
      </div>
      <div className='px-4 mt-4'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
