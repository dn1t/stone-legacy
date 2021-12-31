import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import '@fontsource/plus-jakarta-sans';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import '../styles/tailwind.css';
import { RecoilRoot } from 'recoil';
import PopupProvider from '../components/popup-provider';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <Head>
          <title>stone</title>
          <meta name='description' content='바보바보 커뮤니티' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Component {...pageProps} />
        <PopupProvider />
      </SessionProvider>
    </RecoilRoot>
  );
};

export default App;
