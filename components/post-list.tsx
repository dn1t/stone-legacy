import { HeartIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Loader from 'react-loaders';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps, WindowScroller } from 'react-virtualized';

interface Post {
  id: number;
  content: string;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    username: string;
    nickname: string;
    image: string;
  };
}

const cache = new CellMeasurerCache({
  defaultWidth: 100,
  fixedWidth: true,
});

const PostList = ({ category }: { category: string }) => {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  let startX = 0;
  let startY = 0;

  const [posts, setPosts] = useState<Post[]>([]);

  const listRef = useRef<List | null>(null);

  const rowRenderer = ({ index, key, parent, style }: ListRowProps) => {
    return (
      <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index}>
        {({ measure }) => {
          const post = posts[index];

          return (
            <div style={style}>
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
                  className='h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat flex-shrink-0 cursor-pointer'
                  style={{ backgroundImage: `url('${post.author.image}')` }}
                />
                <div className='ml-2.5'>
                  <div className='flex items-center'>
                    <div className='font-[550]'>{post.author.nickname}</div>
                    <div className='font-regular text-[15px] ml-1 text-gray-500'>@{post.author.username}</div>
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
            </div>
          );
        }}
      </CellMeasurer>
    );
  };

  const addPosts = () => {
    setLoading(true);
    fetch(`/api/post?category=${category}&display=30&offset=${offset}`)
      .then((res) => res.json())
      .then((res) => {
        const { data, error } = res;
        if (error) return;

        setOffset(offset + 30);
        setPosts([...posts, ...data]);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/post?category=${category}&display=30&offset=${offset}`)
      .then((res) => res.json())
      .then((res) => {
        const { data, error } = res;
        if (error) return;

        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className='flex flex-col cursor-pointer px-6 pb-2 mt-4'>
      <WindowScroller>
        {({ height, isScrolling, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={listRef}
                autoHeight
                height={height}
                width={width}
                isScrolling={isScrolling}
                overscanRowCount={10}
                onScroll={(e) => {
                  const atBottom = e.scrollTop + e.clientHeight >= e.scrollHeight;

                  if (atBottom) addPosts();
                }}
                scrollTop={scrollTop}
                rowCount={posts.length}
                rowHeight={cache.rowHeight}
                rowRenderer={rowRenderer}
                deferredMeasurementCache={cache}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
      <div className=''>
        <Loader active type='ball-beat' />
      </div>
    </div>
  );

  // return (
  //   <div className='flex flex-col cursor-pointer px-6 pb-2 mt-4'>
  //     {!loading &&
  //       postList !== undefined &&
  //       postList.map((post) => (
  //         <div
  //           className='flex w-full py-2'
  //           onMouseDown={(e) => {
  //             startX = e.pageX;
  //             startY = e.pageY;
  //           }}
  //           onMouseUp={(e) => {
  //             const diffX = Math.abs(e.pageX - startX);
  //             const diffY = Math.abs(e.pageY - startY);

  //             if (diffX < 6 && diffY < 6) {
  //               if (e.ctrlKey || e.metaKey) open(`/post/${post.id}`, '_blank');
  //               else router.push(`/post/${post.id}`);
  //             }
  //           }}
  //           key={post.id}
  //         >
  //           <div
  //             className='h-9 w-9 rounded-full bg-cover bg-center bg-no-repeat flex-shrink-0 cursor-pointer'
  //             style={{ backgroundImage: `url('${post.author.image}')` }}
  //           />
  //           <div className='ml-2'>
  //             <div className='flex items-center'>
  //               <div className='font-[550] text-[15px]'>{post.author.nickname}</div>
  //               <div className='font-regular text-sm ml-1 text-gray-500'>@{post.author.username}</div>
  //             </div>
  //             <div>
  //               {post.content.split('\n').map((line, key) => (
  //                 <div className='leading-none h-4' key={key}>
  //                   {line}
  //                 </div>
  //               ))}
  //             </div>
  //             <div className='flex items-center mt-1'>
  //               <button className='flex items-center text-sm text-gray-500'>
  //                 <HeartIcon className='h-4 w-4 mr-0.5' />
  //                 123
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //   </div>
  // );
};

export default PostList;
