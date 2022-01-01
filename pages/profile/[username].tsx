import { MailIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import useUserInfo from '../../hooks/useUserInfo';

const Profile = () => {
  const router = useRouter();
  const [user, loading] = useUserInfo(router.query.username);

  return (
    <div className='max-w-xl w-full'>
      {!loading && user !== undefined && (
        <>
          <div className='px-6 py-5 sticky top-0 bg-white bg-opacity-70 backdrop-blur-lg z-10'>
            <h1 className='font-semibold text-xl leading-none'>{user.nickname}</h1>
          </div>
          <div>
            <div className='h-56 bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url('${user.banner}')` }} />
            <div className='relative h-[2.8rem] mb-3'>
              <div
                className='relative top-[-4.2rem] ml-6 ring-4 ring-white h-28 w-28 bg-center bg-cover bg-no-repeat rounded-full'
                style={{ backgroundImage: `url('${user.image}')` }}
              />
            </div>
            <div className='px-6'>
              <div className='font-display font-bold text-[1.35rem] leading-none'>{user.nickname}</div>
              <div className='font-regular mt-0.5 text-sm text-gray-600 leading-none'>@{user.username}</div>
              <div className='font-regular mt-3 text-base leading-none'>{user.bio ?? '소개가 없습니다.'}</div>
              <a className='flex items-center mt-1.5' href={`mailto:${'me@tica.fun'}`}>
                <MailIcon className='h-4 w-4 text-gray-500' />
                <div className='font-regular text-sm text-gray-500 leading-none ml-0.5 mb-px'>{'me@tica.fun'}</div>
              </a>
            </div>
          </div>
        </>
      )}
      <div className='h-screen'></div>
      <div className='h-screen'></div>
    </div>
  );
};

export default Profile;
