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
      ) : !props.postData || !props.commentsData ? (
        error404()
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
  try {
    const id = context.params.post;
    if (!id) throw new Error(`id was not ok: ${post.statusText}`);

    const post = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    if (!post.ok) throw new Error(`Post was not ok: ${post.statusText}`);

    const postData = await post.json();

    if (!postData) throw new Error('Invalid post data format');

    const comments = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );

    if (!comments.ok)
      throw new Error(`Comment was not ok : ${comments.statusText}`);

    const commentsData = await comments.json();

    if (!commentsData) throw new Error('Invalid comments data format');

    return {
      props: {
        postData,
        commentsData,
      },
    };
  } catch (error) {
    return {
      props: {
        postData: null,
        commentsData: [],
        error: 'Failed to fetch post or comments',
      },
    };
  }
}

export async function getStaticPaths() {
  try {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!data.ok) throw new Error(`Data was not ok: ${response.statusText}`);

    const posts = await data.json();

    if (!Array.isArray(posts)) {
      throw new Error('Invalid data format');
    }

    const paths = posts.map((post) => ({
      params: { post: post.id.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
}