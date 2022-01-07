import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import JoinForm from '../components/join';

const Join = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    console.log(status);
    if (status === 'authenticated') router.replace('/');
  }, [status]);

  return (
    <div className='max-w-xl w-full'>
      <div className='mt-8 mb-1.5 px-4'>
        <h1 className='font-semibold text-xl'>회원가입</h1>
      </div>
      <div className='px-4 mt-4'>
        <JoinForm />
      </div>
    </div>
  );
};

export default Join;
