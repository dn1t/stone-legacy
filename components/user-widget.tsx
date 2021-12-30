import { useRouter } from 'next/router';

const UserWidget = () => {
  const router = useRouter();
  const users = [
    { id: 'stone', nickname: 'stone', profileImage: 'https://thispersondoesnotexist.com/image', bio: '바보바보 커뮤니티, stone!' },
    { id: 'dukhwa', nickname: '띠까', profileImage: 'https://thispersondoesnotexist.com/image', bio: '스톤개발자' },
    { id: 'baboseojin', nickname: '바보서진', profileImage: 'https://thispersondoesnotexist.com/image', bio: '닉값못함' },
  ];
  let startX = 0;
  let startY = 0;

  return (
    <div className='flex flex-col h-max w-max'>
      <h2 className='font-semibold text-xl px-4 pb-1.5'>물수제비 전문가들</h2>
      <div className='px-1'>
        {users.map((user) => {
          return (
            <div
              className={`flex w-full hover:bg-gray-100 transition-colors duration-300 cursor-pointer px-3 py-2.5 rounded-xl`}
              onMouseDown={(e) => {
                startX = e.pageX;
                startY = e.pageY;
              }}
              onMouseUp={(e) => {
                const diffX = Math.abs(e.pageX - startX);
                const diffY = Math.abs(e.pageY - startY);

                if (diffX < 6 && diffY < 6) {
                  if (e.ctrlKey || e.metaKey) open(`/post/${user.id}`, '_blank');
                  else router.push(`/post/${user.id}`);
                }
              }}
              key={user.id}
            >
              <div
                className='h-12 w-12 rounded-full bg-cover bg-center bg-no-repeat flex-shrink-0 cursor-pointer'
                style={{ backgroundImage: `url('${user.profileImage}')` }}
              />
              <div className='ml-3'>
                <div className='font-semibold mt-0.5'>{user.nickname}</div>
                <div className='text-gray-500 text-sm font-light'>{user.bio}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserWidget;
