import { HashtagIcon, UserIcon } from '@heroicons/react/outline';
import { HashtagIcon as SolidHashtagIcon, UserIcon as SolidUserIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Login from './login';
import { useSetRecoilState } from 'recoil';
import { ShowPopupAtom, PopupContentAtom, PopupTitleAtom } from '../lib/store';
import { useSession } from 'next-auth/react';

const Bottombar = () => {
  const router = useRouter();
  const { status } = useSession();
  const setShowPopup = useSetRecoilState(ShowPopupAtom);
  const setPopupTitle = useSetRecoilState(PopupTitleAtom);
  const setPopupContent = useSetRecoilState(PopupContentAtom);

  return (
    <div className='block bg-white border-t border-gray-100 fixed bottom-0 w-screen xs:hidden'>
      <div className='flex h-full'>
        <Link href='/'>
          <a className={`w-full flex justify-center px-5 py-4 ${router.pathname.split('/')[1] === '' ? 'text-gray-500' : 'text-gray-400'}`} title={'커뮤니티'}>
            {router.pathname.split('/')[1] === '' ? <SolidHashtagIcon className='h-6 w-6' /> : <HashtagIcon className='h-6 w-6' />}
          </a>
        </Link>
        {status === 'loading' ? (
          <div className={`w-full flex justify-center px-5 py-4 ${router.pathname.split('/')[1] === 'profile' ? 'text-gray-500' : 'text-gray-400'}`}>
            {router.pathname.split('/')[1] === 'profile' ? <SolidUserIcon className='h-6 w-6' /> : <UserIcon className='h-6 w-6' />}
          </div>
        ) : status === 'authenticated' ? (
          <Link href={`/profile/${''}`}>
            <a
              className={`w-full flex justify-center px-5 py-4 ${router.pathname.split('/')[1] === 'profile' ? 'text-gray-500' : 'text-gray-400'}`}
              title={'프로필'}
            >
              {router.pathname.split('/')[1] === 'profile' ? <SolidUserIcon className='h-6 w-6' /> : <UserIcon className='h-6 w-6' />}
            </a>
          </Link>
        ) : (
          <button
            className='w-full flex justify-center px-5 py-4 text-gray-400'
            title='로그인'
            onClick={() => {
              setPopupTitle('로그인');
              setPopupContent(<Login />);
              setShowPopup(true);
            }}
          >
            <UserIcon className='h-6 w-6' />
          </button>
        )}
      </div>
    </div>
  );
};

export default Bottombar;
