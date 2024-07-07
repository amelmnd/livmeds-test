import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/posts');
    }
  }, [session, router]);

  return (
    <div>
      {status != 'authenticated' && (
        <div>
          <h1>Sign in</h1>
          <button onClick={() => signIn('github')}>Sign in with GitHub</button>
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}
