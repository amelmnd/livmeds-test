
# livmeds-test

Application project to enter an internship at livmed's


## Run Locally

Clone the project

```bash
  git clone git@github.com:amelmnd/livmeds-test.git 
```

Go to the project directory

```bash
  cd my-livmeds-test
```


Create .env file and add environment Variables

`GITHUB_ID`  
`GITHUB_SECRET`  
`GOOGLE_ID`  
`GOOGLE_SECRET`  
`NEXTAUTH_SECRET`

Start the server

```bash
  npm run dev
```


## Routes

### Need not to be connected
#### home / login page
```http
  /
```

### Need to connect
#### Show all posts

```http
  /posts
```

#### Details for one post

```http
  /posts/${id}
```
