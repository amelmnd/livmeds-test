import Head from 'next/head'

import { signIn } from 'next-auth/react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Livmed's Test</title>
        <meta
          name='description'
          content="Creat app for test to workd at Livemed's"
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <h1>Sign in</h1>
        <div>
          <button onClick={() => signIn('github')}>Sign in with GitHub</button>
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
      </div>
    </div>
  );
}
