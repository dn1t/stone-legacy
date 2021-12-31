import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { PopupTitleAtom, PopupContentAtom, ShowPopupAtom } from '../lib/store';
import Join from './join';

const Login = () => {
  const setShowPopup = useSetRecoilState(ShowPopupAtom);
  const setPopupTitle = useSetRecoilState(PopupTitleAtom);
  const setPopupContent = useSetRecoilState(PopupContentAtom);
  const [error, setError] = useState<string>();

  const login = async (e: any) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const loginRes: any = await signIn('credentials', { username, password, redirect: false });
    if (loginRes.error !== null) return setError(loginRes.error);

    setShowPopup(false);
    setPopupTitle('');
    setPopupContent(<></>);
  };

  return (
    <form className='flex flex-col' onSubmit={login}>
      <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 rounded-lg'>
        <input type='text' className='block w-full appearance-none focus:outline-none bg-transparent' name='username' placeholder='' />
        <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>아이디</div>
      </label>
      <label className='block relative bg-gray-100 px-3.5 pt-5 pb-1.5 mt-2 rounded-lg'>
        <input type='password' className='block w-full appearance-none focus:outline-none bg-transparent' name='password' placeholder='' />
        <div className='absolute top-3 origin-[0] transition-transform text-gray-400'>비밀번호</div>
      </label>
      <div className={`text-red-500 text-sm mt-1 ${error === undefined ? 'h-0' : 'h-max'}`}>{error}</div>
      <button type='submit' className='bg-gray-900 text-white px-3.5 mt-2 py-[17px] leading-none rounded-lg'>
        로그인
      </button>
      <button
        className='text-gray-900 text-sm mt-1.5 text-left hover:underline hover:decoration-dashed'
        onClick={() => {
          setPopupTitle('회원가입');
          setPopupContent(<Join />);
        }}
      >
        아직 계정이 없으신가요?
      </button>
    </form>
  );
};

export default Login;
