import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import error403 from '../error/error403';
import style from '../../styles/Posts.module.css';

export default function Posts(props) {
  const { data: session, status } = useSession();

  return (
    <div>
      {status != 'authenticated' ? (
        error403()
      ) : !props.posts ? (
        error404()
      ) : (
        <div>
          <h1>ALL POST</h1>
          <div className={style.allPosts}>
            {props.posts?.map((post) => (
              <div key={post.id} className={style.cardPost}>
                <Link href={`/posts/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!data.ok) throw new Error(`Data was not ok: ${response.statusText}`);

    const posts = await data.json();
    if (!posts) throw new Error('Invalid data format');

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    return {
      props: {
        posts: [],
        error: 'Failed to fetch posts',
      },
    };
  }
}