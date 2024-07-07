import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Container from '../components/Container';
import style from '../styles/Container.module.css';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </SessionProvider>
  );
}
export default MyApp;
