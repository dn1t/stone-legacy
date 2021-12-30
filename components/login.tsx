import { signIn } from 'next-auth/react';
import { useState } from 'react';

const Login = () => {
  const [error, setError] = useState<string>();

  const login = async (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const loginRes: any = await signIn('credentials', { email, password, redirect: false });
    if (loginRes.error !== null) return setError(loginRes.error);
  };

  return (
    <form className='flex flex-col px-4 mt-4' onSubmit={login}>
      <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 rounded-lg'>
        <input type='text' className='block w-full appearance-none focus:outline-none bg-transparent' name='email' placeholder='' />
        <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>이메일</div>
      </label>
      <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 mt-2 rounded-lg'>
        <input type='password' className='block w-full appearance-none focus:outline-none bg-transparent' name='password' placeholder='' />
        <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>비밀번호</div>
      </label>
      <div className={`text-red-500 text-sm mt-1 ${error === undefined ? 'h-0' : 'h-max'}`}>{error}</div>
      <button type='submit' className='bg-gray-900 text-white px-3.5 mt-2 py-[17px] leading-none rounded-lg'>
        로그인
      </button>
    </form>
  );
};

export default Login;
