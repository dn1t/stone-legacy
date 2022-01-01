import { HeartIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import usePostList from '../hooks/usePostList';

const PostList = ({ category }: { category: string }) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [postList, loading] = usePostList(category, 24, offset);
  let startX = 0;
  let startY = 0;

  return (
    <div className='flex flex-col cursor-pointer px-6 pb-2 mt-4'>
      {!loading &&
        postList !== undefined &&
        postList.map((post) => (
          <div
            className='flex w-full py-2'
            onMouseDown={(e) => {
              startX = e.pageX;
              startY = e.pageY;
            }}
            onMouseUp={(e) => {
              const diffX = Math.abs(e.pageX - startX);
              const diffY = Math.abs(e.pageY - startY);

              if (diffX < 6 && diffY < 6) {
                if (e.ctrlKey || e.metaKey) open(`/post/${post.id}`, '_blank');
                else router.push(`/post/${post.id}`);
              }
            }}
            key={post.id}
          >
            <div
              className='h-9 w-9 rounded-full bg-cover bg-center bg-no-repeat flex-shrink-0 cursor-pointer'
              style={{ backgroundImage: `url('${post.author.image}')` }}
            />
            <div className='ml-2'>
              <div className='flex items-center'>
                <div className='font-[550] text-[15px]'>{post.author.nickname}</div>
                <div className='font-regular text-sm ml-1 text-gray-500'>@{post.author.username}</div>
              </div>
              <div>
                {post.content.split('\n').map((line, key) => (
                  <div className='leading-none h-4' key={key}>
                    {line}
                  </div>
                ))}
              </div>
              <div className='flex items-center mt-1'>
                <button className='flex items-center text-sm text-gray-500'>
                  <HeartIcon className='h-4 w-4 mr-0.5' />
                  123
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
