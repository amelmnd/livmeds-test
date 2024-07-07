import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head';

export default function Container({ children }) {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Livmed&apos;s Test</title>
        <meta
          name='description'
          content="Creat app for test to workd at Livemed's"
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <nav>
          {status != 'authenticated' ? (
            <Link href='/'>login</Link>
          ) : (
            <>
              <Link href='/posts'>All posts</Link>
              <Link href='/' onClick={() => signOut({ callbackUrl: '/' })}>
                Sign out
              </Link>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
