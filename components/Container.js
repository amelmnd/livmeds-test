import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import style from '../styles/Container.module.css';

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
        <nav className={style.nav}>
          {status != 'authenticated' ? (
            <Link href='/'>Login</Link>
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
      <main className={style.content}>{children}</main>
    </>
  );
}
