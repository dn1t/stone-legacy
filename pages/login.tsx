import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import UserWidget from '../components/user-widget';
import LoginForm from '../components/login';

const Login = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    console.log(status);
    if (status === 'authenticated') router.replace('/');
  }, [status]);

  return (
    <div className='flex justify-center gap-x-2 bg-white min-h-screen'>
      <Sidebar />
      <div className='flex h-screen border-l border-gray-100' />
      <div className='max-w-xl w-full'>
        <div className='mt-8 mb-1.5 px-4'>
          <h1 className='font-semibold text-xl'>로그인</h1>
        </div>
        <div className='px-4 mt-4'>
          <LoginForm />
        </div>
      </div>
      <div className='flex h-screen border-l border-gray-100' />
      <div className='py-8 sticky top-0 h-screen'>
        <UserWidget />
      </div>
    </div>
  );
};

export default Login;
