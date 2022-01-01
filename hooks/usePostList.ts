import { useEffect, useState } from 'react';

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

const usePostList = (category: string, display: number, offset: number): [Post[] | undefined, boolean] => {
  const [data, setData] = useState<Post[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/post?category=${category}&display=${display}&offset=${offset}`);
        const { data, error } = await res.json();
        if (error) return;

        setData(data);
        setLoading(false);
      } catch {}
    })();
  }, [category]);

  return [data, loading];
};

export default usePostList;
