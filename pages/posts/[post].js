import React from 'react';

export default function post(props) {
  console.log('post : ', props);
  return (
    <div>
      <h1> {props.postData.title}</h1>
      <p>{props.postData.body}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  const id = context.params.post;
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const postData = await post.json();

  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await data.json();
  console.log('posts : ', posts);
  const paths = posts.map((post) => ({
    params: { post: post.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
