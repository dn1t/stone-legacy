import { useRouter } from 'next/router';

const PostList = () => {
  const router = useRouter();
  let startX = 0;
  let startY = 0;

  const postList = [
    { id: 1, author: '바보바보', profileImage: 'https://thispersondoesnotexist.com/image', content: 'testzz1' },
    { id: 2, author: '바보바보', profileImage: 'https://thispersondoesnotexist.com/image', content: 'testzz2' },
    { id: 3, author: '바보바보', profileImage: 'https://thispersondoesnotexist.com/image', content: 'testzz3' },
    { id: 4, author: '바보바보', profileImage: 'https://thispersondoesnotexist.com/image', content: 'testzz4' },
  ];

  return (
    <div className='flex flex-col cursor-pointer px-6 pb-2 mt-4'>
      {postList.map((post) => (
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
            className='h-12 w-12 rounded-full bg-cover bg-center bg-no-repeat flex-shrink-0 cursor-pointer'
            style={{ backgroundImage: `url('${post.profileImage}')` }}
          />
          <div className='ml-3'>
            <div className='font-semibold mt-0.5'>{post.author}</div>
            <div>{post.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
