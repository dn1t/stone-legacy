import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import UserWidget from '../components/UserWidget';

const Login = () => {
  const router = useRouter();
  const { status } = useSession();
  const [error, setError] = useState<string>();

  useEffect(() => {
    console.log(status);
    if (status === 'authenticated') router.replace('/');
  }, [status]);

  const login = async (email: string, password: string) => {
    const loginRes: any = await signIn('credentials', { email, password, redirect: false });
    console.log(loginRes);
    if (loginRes.error !== null) return false;
    return true;
  };

  const join = async (e: any) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordCheck = e.target.password_check.value;
    if (password !== passwordCheck) return setError('비밀번호가 일치하지 않습니다.');

    const res = await fetch('/api/auth/join', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.error) return setError(data.message);

    const loginSuccess = await login(email, password);

    if (loginSuccess) return router.replace('/welcome');
    else router.replace('/login');
  };

  return (
    <div className='flex justify-center gap-x-2 bg-white min-h-screen'>
      <Sidebar />
      <div className='flex h-screen border-l border-gray-100' />
      <div className='max-w-xl w-full'>
        <div className='mt-8 mb-1.5 px-4'>
          <h1 className='font-semibold text-xl'>회원가입</h1>
        </div>
        <form className='flex flex-col px-4 mt-4' onSubmit={join}>
          <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 rounded-lg'>
            <input type='text' className='block w-full appearance-none focus:outline-none bg-transparent' name='name' placeholder='' />
            <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>이름</div>
          </label>
          <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 mt-2 rounded-lg'>
            <input type='text' className='block w-full appearance-none focus:outline-none bg-transparent' name='email' placeholder='' />
            <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>이메일</div>
          </label>
          <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 mt-2 rounded-lg'>
            <input type='password' className='block w-full appearance-none focus:outline-none bg-transparent' name='password' placeholder='' />
            <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>비밀번호</div>
          </label>
          <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 mt-2 rounded-lg'>
            <input type='password' className='block w-full appearance-none focus:outline-none bg-transparent' name='password_check' placeholder='' />
            <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>비밀번호 재입력</div>
          </label>
          <div className={`text-red-500 text-sm mt-1 ${error === undefined ? 'h-0' : 'h-max'}`}>{error}</div>
          <button type='submit' className='bg-gray-900 text-white px-3.5 mt-2 py-[17px] leading-none rounded-lg'>
            회원가입
          </button>
        </form>
      </div>
      <div className='flex h-screen border-l border-gray-100' />
      <div className='py-8 sticky top-0 h-screen'>
        <UserWidget />
      </div>
    </div>
  );
};

export default Login;
