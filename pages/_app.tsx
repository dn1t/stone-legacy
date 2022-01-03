import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider, signOut } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import PopupProvider from '../components/popup-provider';
import Bottombar from '../components/bottombar';
import Sidebar from '../components/sidebar';
import FriendRequestWidget from '../components/friend-request-widget';
import '@fontsource/plus-jakarta-sans';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import '../styles/tailwind.css';
import '../styles/loader.scss';

// global.console = ((console) => {
//   return { ...console, warn: (...args) => (args[0].includes('Duplicate atom key') ? null : console.warn(...args)) };
// })(global.console);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <Head>
          <title>stone</title>
          <meta name='description' content='바보바보 커뮤니티' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='flex items-stretch justify-center bg-white min-h-screen h-full'>
          <Sidebar />
          <div className='hidden min-h-screen border-l ml-2 border-gray-100 xs:flex' />
          <Component {...pageProps} />
          <div className='hidden min-h-screen border-l mr-2 border-gray-100 lg:flex' />
          <div className='hidden py-8 sticky top-0 h-screen lg:block'>
            <FriendRequestWidget />
            <button className='p-4 bg-pink-200' onClick={() => signOut()}>
              로그아웃
            </button>
          </div>
          <Bottombar />
        </div>
        <PopupProvider />
      </SessionProvider>
    </RecoilRoot>
  );
};

export default App;
