import { useEffect, useState } from 'react';

interface UserInfo {
  username: string;
  nickname: string;
  email?: string;
  bio: string | null;
  image: string;
  banner: string;
  createdAt: string;
}

const useUserInfo = (username: string | string[] | undefined): [UserInfo | undefined, boolean] => {
  const [data, setData] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username instanceof Array || username === undefined) return;
    (async () => {
      try {
        const res = await fetch(`/api/userInfo?username=${username}`);
        const { data, error } = await res.json();
        if (error) return;

        setData(data);
        setLoading(false);
      } catch {}
    })();
  }, [username]);

  return [data, loading];
};

export default useUserInfo;
