import {
  Heading,
  Center,
  Button,
  Box,
  Input,
  FormControl as Form,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [refresh, setRefresh] = useState(false);

  const getTodos = () => {
    axiosInstance.get("/getAllTodos").then((res) => setTodos(res.data));
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (refresh) {
      getTodos();

      setTimeout(() => {
        setRefresh(false);
      });
    }
  }, [refresh]);

  const deleteTodo = (todoId) => () => {
    axiosInstance
      .delete("/deleteTodo", {
        data: { todoId },
      })
      .then(() => setRefresh(true));
  };

  const addTodo = (e) => {
    e.preventDefault();
    axiosInstance.post("/addTodo", { title: inputVal }).then(() => {
      setRefresh(true);
      setInputVal("");
    });
  };

  return (
    <>
      <Heading mb={12}>MERN</Heading>

      <Form mb={10} as="form" onSubmit={addTodo}>
        <Input
          onChange={(e) => setInputVal(e.target.value)}
          width="300px"
          placeholder="New Todo"
          size="md"
          value={inputVal}
        />
        <Button type="submit">Add</Button>
      </Form>

      {todos.map(({ _id, title }) => (
        <Box key={_id} mb={10}>
          <Center w="180px" h="80px" bg="red.200">
            {title}
          </Center>
          <Button onClick={deleteTodo(_id)}>Delete</Button>
        </Box>
      ))}
    </>
  );
};

export default Home;

//import Head from 'next/head'
//import Image from 'next/image'
//import { Inter } from '@next/font/google'
//import styles from '@/styles/Home.module.css'
//
//const inter = Inter({ subsets: ['latin'] })
//
//export default function Home() {
//  return (
//    <>
//      <Head>
//        <title>Create Next App</title>
//        <meta name="description" content="Generated by create next app" />
//        <meta name="viewport" content="width=device-width, initial-scale=1" />
//        <link rel="icon" href="/favicon.ico" />
//      </Head>
//      <main className={styles.main}>
//        <div className={styles.description}>
//          <p>
//            Get started by editing&nbsp;
//            <code className={styles.code}>pages/index.js</code>
//          </p>
//          <div>
//            <a
//              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//              target="_blank"
//              rel="noopener noreferrer"
//            >
//              By{' '}
//              <Image
//                src="/vercel.svg"
//                alt="Vercel Logo"
//                className={styles.vercelLogo}
//                width={100}
//                height={24}
//                priority
//              />
//            </a>
//          </div>
//        </div>
//
//        <div className={styles.center}>
//          <Image
//            className={styles.logo}
//            src="/next.svg"
//            alt="Next.js Logo"
//            width={180}
//            height={37}
//            priority
//          />
//          <div className={styles.thirteen}>
//            <Image
//              src="/thirteen.svg"
//              alt="13"
//              width={40}
//              height={31}
//              priority
//            />
//          </div>
//        </div>
//
//        <div className={styles.grid}>
//          <a
//            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//            className={styles.card}
//            target="_blank"
//            rel="noopener noreferrer"
//          >
//            <h2 className={inter.className}>
//              Docs <span>-&gt;</span>
//            </h2>
//            <p className={inter.className}>
//              Find in-depth information about Next.js features and&nbsp;API.
//            </p>
//          </a>
//
//          <a
//            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//            className={styles.card}
//            target="_blank"
//            rel="noopener noreferrer"
//          >
//            <h2 className={inter.className}>
//              Learn <span>-&gt;</span>
//            </h2>
//            <p className={inter.className}>
//              Learn about Next.js in an interactive course with&nbsp;quizzes!
//            </p>
//          </a>
//
//          <a
//            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//            className={styles.card}
//            target="_blank"
//            rel="noopener noreferrer"
//          >
//            <h2 className={inter.className}>
//              Templates <span>-&gt;</span>
//            </h2>
//            <p className={inter.className}>
//              Discover and deploy boilerplate example Next.js&nbsp;projects.
//            </p>
//          </a>
//
//          <a
//            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//            className={styles.card}
//            target="_blank"
//            rel="noopener noreferrer"
//          >
//            <h2 className={inter.className}>
//              Deploy <span>-&gt;</span>
//            </h2>
//            <p className={inter.className}>
//              Instantly deploy your Next.js site to a shareable URL
//              with&nbsp;Vercel.
//            </p>
//          </a>
//        </div>
//      </main>
//    </>
//  )
//}
