import Image from 'next/image';
import { HashtagIcon, UserCircleIcon, UserIcon } from '@heroicons/react/outline';
import { HashtagIcon as SolidHashtagIcon, UserCircleIcon as SolidUserCircleIcon, UserIcon as SolidUserIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  const categories = [
    { icon: [HashtagIcon, SolidHashtagIcon], name: '커뮤니티', pageId: '', href: '/' },
    { icon: [UserIcon, SolidUserIcon], name: '프로필', pageId: 'profile', href: `/profile/${''}` },
  ];

  return (
    <div className='pt-8 pb-4 sticky top-0 h-screen'>
      <div className='flex flex-col items-center h-full w-max'>
        <div className='flex items-center mb-4'>
          <div className='flex items-center'>
            <Image src='/stone.svg' alt='stone logo' height={28} width={25.7} />
          </div>
        </div>
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
            <Link href={'/login'}>
              <a
                className={`w-full flex justify-center px-5 py-4 ${router.pathname.split('/')[1] === 'login' ? 'text-gray-500' : 'text-gray-400'}`}
                title='로그인'
              >
                {router.pathname.split('/')[1] === 'login' ? <SolidUserCircleIcon className='h-6 w-6' /> : <UserCircleIcon className='h-6 w-6' />}
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
