import { PhotographIcon, UploadIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import PostList from '../components/post-list';

const Home: NextPage = () => {
  const [content, setContent] = useState('');
  const { data: session, status } = useSession();
  // const ref = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <div className='max-w-xl w-full'>
      <div className='px-6 py-5 sticky top-0 bg-white bg-opacity-70 backdrop-blur-lg z-10'>
        <h1 className='font-semibold text-xl leading-none'>커뮤니티</h1>
      </div>
      <form className='flex w-full cursor-text px-6 pb-5 border-b border-gray-100' onClick={() => ref.current?.focus()}>
        <div
          className='h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat flex-shrink-0 cursor-pointer'
          style={{ backgroundImage: `url('${session?.user?.image ?? '/default_profile.png'}')` }}
        />
        <div className='w-full mt-1.5'>
          <div className='w-full ml-2.5'>
            {/* <div
                className='w-full bg-transparent text-[19px] font-[450] z-10 relative max-h-96 focus:outline-none overflow-auto'
                ref={ref}
                onInput={(e) => setContent((e.target as HTMLDivElement).innerText ?? '')}
                contentEditable
              /> */}
            <textarea
              className='w-full bg-transparent text-[19px] font-[450] focus:outline-none overflow-auto resize-none'
              ref={ref}
              onChange={(e) => setContent((e.target as HTMLTextAreaElement).value ?? '')}
              placeholder='이번에는 어떤 어그로를 끌어볼까요?'
            />
            {/* {content === '' && (
                <div className='relative'>
                  <div className='absolute -top-7 text-[19px] font-[450] z-0 text-gray-500'>이번에는 어떤 어그로를 끌어볼까요?</div>
                </div>
              )} */}
          </div>
          <div className='flex items-center mt-2 ml-1'>
            <div className='flex items-center gap-x-0.5 h-full text-gray-500 mt-1'>
              <button className='hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-300 p-1.5 rounded-full focus:outline-none'>
                <PhotographIcon className='h-[18px] w-[18px] stroke-0' />
              </button>
              <button className='hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-300 p-1.5 rounded-full focus:outline-none'>
                <UploadIcon className='h-[18px] w-[18px]' />
              </button>
            </div>
            <button className='bg-gray-900 hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-300 text-white text-[15px] font-[550] ml-auto px-4 py-2.5 leading-none rounded-full focus:outline-none'>
              돌 던지기
            </button>
          </div>
        </div>
      </form>
      <PostList category='main' />
    </div>
  );
};

export default Home;
