'use client';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import posts from './posts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/posts');
    }
  }, [session]);

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
      {!session && (
        <div>
          <h1>Sign in</h1>
          <button onClick={() => signIn('github')}>Sign in with GitHub</button>
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}
