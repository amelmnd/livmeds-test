import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import error403 from '../error/error403';

export default function Posts(props) {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        error403()
      ) : (
        <div>
          <h1>ALL POST</h1>
          {props.posts?.map((post) => (
            <div key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await data.json();
  return {
    props: {
      posts,
    },
  };
}
