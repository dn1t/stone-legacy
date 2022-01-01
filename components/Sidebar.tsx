import Image from 'next/image';
import { HashtagIcon, UserIcon } from '@heroicons/react/outline';
import { HashtagIcon as SolidHashtagIcon, UserIcon as SolidUserIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Login from './login';
import { useSetRecoilState } from 'recoil';
import { ShowPopupAtom, PopupContentAtom, PopupTitleAtom } from '../lib/store';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const setShowPopup = useSetRecoilState(ShowPopupAtom);
  const setPopupTitle = useSetRecoilState(PopupTitleAtom);
  const setPopupContent = useSetRecoilState(PopupContentAtom);

  return (
    <div className='hidden pt-6 pb-4 ml-2 sticky top-0 h-screen xs:block'>
      <div className='flex flex-col items-center h-full w-max'>
        <Link href='/'>
          <a className='flex items-center mb-4'>
            <div className='flex items-center'>
              <Image src='/stone.svg' alt='stone logo' height={28} width={25.7} />
            </div>
          </a>
        </Link>
        <nav className='h-full'>
          <div className='flex flex-col h-full'>
            <Link href='/'>
              <a
                className={`w-full flex justify-center px-5 py-4 ${router.pathname.split('/')[1] === '' ? 'text-gray-500' : 'text-gray-400'}`}
                title={'커뮤니티'}
              >
                {router.pathname.split('/')[1] === '' ? <SolidHashtagIcon className='h-6 w-6' /> : <HashtagIcon className='h-6 w-6' />}
              </a>
            </Link>
            {status === 'loading' ? (
              <div className={`w-full flex justify-center px-5 py-4 ${router.pathname.split('/')[1] === 'profile' ? 'text-gray-500' : 'text-gray-400'}`}>
                {router.pathname.split('/')[1] === 'profile' ? <SolidUserIcon className='h-6 w-6' /> : <UserIcon className='h-6 w-6' />}
              </div>
            ) : status === 'authenticated' && session?.user?.name !== undefined ? (
              <Link href={`/profile/${session.user.name}`}>
                <a
                  className={`w-full flex justify-center px-5 py-4 ${router.pathname.split('/')[1] === 'profile' ? 'text-gray-500' : 'text-gray-400'}`}
                  title={'프로필'}
                >
                  {router.pathname.split('/')[1] === 'profile' ? <SolidUserIcon className='h-6 w-6' /> : <UserIcon className='h-6 w-6' />}
                </a>
              </Link>
            ) : (
              <button
                className={`w-full flex justify-center px-5 py-4 ${router.pathname.split('/')[1] === 'profile' ? 'text-gray-500' : 'text-gray-400'}`}
                title='로그인'
                onClick={() => {
                  setPopupTitle('로그인');
                  setPopupContent(<Login />);
                  setShowPopup(true);
                }}
              >
                {router.pathname.split('/')[1] === 'profile' ? <SolidUserIcon className='h-6 w-6' /> : <UserIcon className='h-6 w-6' />}
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
