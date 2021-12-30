import Image from 'next/image';
import { HashtagIcon, UserCircleIcon, UserIcon } from '@heroicons/react/outline';
import { HashtagIcon as SolidHashtagIcon, UserIcon as SolidUserIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Login from './login';

const Sidebar = () => {
  const router = useRouter();
  const categories = [
    { icon: [HashtagIcon, SolidHashtagIcon], name: '커뮤니티', pageId: '', href: '/' },
    { icon: [UserIcon, SolidUserIcon], name: '프로필', pageId: 'profile', href: `/profile/${''}` },
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(<></>);

  return (
    <div className='pt-8 pb-4 sticky top-0 h-screen'>
      <div className={`${showPopup ? 'flex' : 'hidden'} fixed`}>{popupContent}</div>
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
            {categories.map((category) => {
              const [OutlineIcon, SolidIcon] = category.icon;

              return (
                <Link href={category.href} key={category.pageId}>
                  <a
                    className={`w-full flex justify-center px-5 py-4 ${router.pathname.split('/')[1] === category.pageId ? 'text-gray-500' : 'text-gray-400'}`}
                    title={category.name}
                  >
                    {router.pathname.split('/')[1] === category.pageId ? <SolidIcon className='h-6 w-6' /> : <OutlineIcon className='h-6 w-6' />}
                  </a>
                </Link>
              );
            })}
            <div className='mt-auto w-full h-px flex' />
            <button
              className={`w-full flex justify-center px-5 py-4 ${router.pathname.split('/')[1] === 'login' ? 'text-gray-500' : 'text-gray-400'}`}
              title='로그인'
              onClick={() => {
                setPopupContent(<Login />);
                setShowPopup(true);
              }}
            >
              <UserCircleIcon className='h-6 w-6' />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
