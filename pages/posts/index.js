import React from 'react';
import Link from 'next/link';

export default function posts(props) {
  console.log(props);
  return (
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
