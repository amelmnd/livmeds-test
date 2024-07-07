import React from 'react';
import { useSession } from 'next-auth/react';
import error403 from '../error/error403';
import styles from '../../styles/Post.module.css';

export default function Post(props) {
  const { data: session, status } = useSession();

  return (
    <div>
      {status != 'authenticated' ? (
        error403()
      ) : (
        <div>
          <h1> {props.postData.title}</h1>
          <p className={styles.bodyPost}>{props.postData.body}</p>
          <div>
            <h3>Comments</h3>
            {props.commentsData.map((comment) => (
              <div key={comment.id}>
                <p className={styles.emailComment}>{comment.email}</p>
                <p className={styles.bodyComment}>{comment.body}</p>
              </div>
            ))}
          </div>
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
