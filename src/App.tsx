import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";

import "./global.css";
import styles from "./app.module.scss";
import { Post } from "./components/post";
import { ContentHandlerTypes } from "./components/content-handler";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/luizfm.png",
      name: "Luiz Fernando de Morais",
      role: "Software Engineer - Olby",
    },
    content: [
      { type: ContentHandlerTypes.PARAGRAPH, content: "Fala galeraa 👋" },
      {
        type: ContentHandlerTypes.PARAGRAPH,
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      {
        type: ContentHandlerTypes.LINK,
        content: "jane.design/doctorcare",
      },
    ],
    publishedAt: "2022-12-21T01:13:23+00:00",
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/luizfm.png",
      name: "Luiz F",
      role: "Software Engineer - JungleDevs",
    },
    content: [
      { type: ContentHandlerTypes.PARAGRAPH, content: "Fala galeraa 👋" },
      {
        type: ContentHandlerTypes.PARAGRAPH,
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      {
        type: ContentHandlerTypes.LINK,
        content: "jane.design/doctorcare",
        href: "https://github.com/luizfm",
      },
    ],
    publishedAt: "2022-12-21T15:13:23+00:00",
  },
];

function App() {
  return (
    <div className="App">
      <Header />
      <div className={styles["wrapper"]}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              className={styles["post"]}
              author={post.author}
              publishedAt={post.publishedAt}
              content={post.content}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
