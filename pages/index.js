import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import style from '../styles/Home.module.css';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/posts');
    }
  }, [session, router]);

  return (
    <>
      {status != 'authenticated' && (
        <div className={style}>
          <h1>Sign in</h1>
          <div className={style.buttonLogin}>
            <button
              className={style.gitHubLogin}
              onClick={() => signIn('github')}
            >
              <span className={style.icon}>
                <FaGithub />
              </span>
              Sign in with GitHub
            </button>
            <button
              className={style.googleLogin}
              onClick={() => signIn('google')}
            >
              <span className={style.icon}>
                <FaGoogle />
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
}
