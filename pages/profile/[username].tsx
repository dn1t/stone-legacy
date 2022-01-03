import { MailIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import useUserInfo from '../../hooks/useUserInfo';

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, loading] = useUserInfo(router.query.username);
  const imageFormRef = useRef<HTMLFormElement>(null);

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
              <form ref={imageFormRef}>
                <input
                  type='file'
                  className='hidden'
                  onChange={async (e) => {
                    if (!imageFormRef.current || !e.target.files || (e.target.files?.length ?? 0) < 1) return;
                    if (e.target.files.length > 1048576) return alert('1024MiB 이하의 사진만 업로드할 수 있습니다.');
                    const res = await fetch('/api/upload', {
                      method: 'POST',
                      body: new FormData(imageFormRef.current),
                    });
                    const data = await res.json();
                    console.log(data);
                  }}
                  name='image'
                />
              </form>
              <div
                className='relative top-[-4.2rem] ml-6 ring-4 ring-white h-28 w-28 bg-center bg-cover bg-no-repeat rounded-full'
                style={{ backgroundImage: `url('${user.image}')` }}
                onClick={
                  session?.user?.name === user.username
                    ? () => {
                        imageFormRef.current?.image.click();
                      }
                    : undefined
                }
              />
            </div>
            <div className='px-6'>
              <div className='font-display font-bold text-[1.35rem] leading-none'>{user.nickname}</div>
              <div className='font-regular mt-0.5 text-sm text-gray-600 leading-none'>@{user.username}</div>
              <div className='font-regular mt-1.5 text-base leading-none'>{user.bio ?? '소개가 없습니다.'}</div>
              {user.email && (
                <a className='flex items-center mt-1.5' href={`mailto:${user.email}`}>
                  <MailIcon className='h-4 w-4 text-gray-500' />
                  <div className='font-regular text-sm text-gray-500 leading-none ml-0.5 mb-px'>{user.email}</div>
                </a>
              )}
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
