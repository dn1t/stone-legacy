import { signIn } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { PopupTitleAtom, PopupContentAtom, ShowPopupAtom } from '../lib/store';
import Login from './login';

const Join = () => {
  const setShowPopup = useSetRecoilState(ShowPopupAtom);
  const setPopupTitle = useSetRecoilState(PopupTitleAtom);
  const setPopupContent = useSetRecoilState(PopupContentAtom);
  const [error, setError] = useState<string>();

  const login = async (username: string, password: string) => {
    const loginRes: any = await signIn('credentials', { username, password, redirect: false });
    console.log(loginRes);
    if (loginRes.error !== null) return false;
    return true;
  };

  const join = async (e: any) => {
    e.preventDefault();

    const username = e.target.username.value;
    const nickname = e.target.nickname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordCheck = e.target.password_check.value;
    if (password !== passwordCheck) return setError('비밀번호가 일치하지 않습니다.');

    const res = await fetch('/api/auth/join', {
      method: 'POST',
      body: JSON.stringify({ username, nickname, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.error) return setError(data.message);

    const loginSuccess = await login(username, password);

    if (loginSuccess) {
      setShowPopup(false);
      setPopupTitle('');
      setPopupContent(<></>);
      return router.replace('/welcome');
    } else return router.replace('/login');
  };

  return (
    <form className='flex flex-col' onSubmit={join}>
      <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 rounded-lg'>
        <input type='text' className='block w-full appearance-none focus:outline-none bg-transparent' name='username' placeholder=' ' />
        <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>아이디</div>
      </label>
      <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 mt-2 rounded-lg'>
        <input type='text' className='block w-full appearance-none focus:outline-none bg-transparent' name='nickname' placeholder=' ' />
        <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>이름</div>
      </label>
      <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 mt-2 rounded-lg'>
        <input type='password' className='block w-full appearance-none focus:outline-none bg-transparent' name='password' placeholder=' ' />
        <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>비밀번호</div>
      </label>
      <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 mt-2 rounded-lg'>
        <input type='password' className='block w-full appearance-none focus:outline-none bg-transparent' name='password_check' placeholder=' ' />
        <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>비밀번호 재입력</div>
      </label>
      <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 mt-2 rounded-lg'>
        <input type='text' className='block w-full appearance-none focus:outline-none bg-transparent' name='email' placeholder=' ' />
        <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>이메일</div>
      </label>
      <div className={`text-red-500 text-sm mt-1 ${error === undefined ? 'h-0' : 'h-max'}`}>{error}</div>
      <button type='submit' className='bg-gray-900 text-white px-3.5 mt-2 py-[17px] leading-none rounded-lg'>
        회원가입
      </button>
      <button
        className='text-gray-900 text-sm mt-1.5 text-left hover:underline hover:decoration-dashed'
        onClick={() => {
          setPopupTitle('로그인');
          setPopupContent(<Login />);
        }}
      >
        이미 계정이 있으신가요?
      </button>
    </form>
  );
};

export default Join;
