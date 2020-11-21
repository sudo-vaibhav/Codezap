import '../styles/main.scss';
import Head from 'next/head';
import Header from '../components/Header';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Codezap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <footer></footer>
    </>
  );
}

export default MyApp;
