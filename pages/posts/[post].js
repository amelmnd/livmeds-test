import React from 'react';
import { useSession } from 'next-auth/react';
import error403 from '../error/error403';

export default function Post(props) {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        error403()
      ) : (
        <div>
          <h1> {props.postData.title}</h1>
          <p>{props.postData.body}</p>
          <h2>Comments</h2>
          {props.commentsData.map((comment) => (
            <div key={comment.id}>
              <h3>{comment.email}</h3>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps(context) {
  const id = context.params.post;
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const postData = await post.json();

  const comments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  const commentsData = await comments.json();

  return {
    props: {
      postData,
      commentsData,
    },
  };
}

export async function getStaticPaths() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await data.json();
  const paths = posts.map((post) => ({
    params: { post: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
