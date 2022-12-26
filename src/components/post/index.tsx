import classnames from "classnames";
import React, { useCallback, useRef, useState } from "react";
import { v4 } from "uuid";

import {
  formatDateFormatted,
  formatRelativeDateFromNow,
} from "../../helpers/date-formatter";
import {
  AuthorProps,
  MockedComments,
  ContentHandlerProps,
} from "../../helpers/types";

import { Avatar } from "../avatar";
import { Comment } from "../comment";
import ContentHandler, { ContentHandlerTypes } from "../content-handler";

import styles from "./styles.module.scss";

const MOCKED_COMMENTS: MockedComments[] = [
  {
    id: 200,
    author: {
      avatarUrl: "https://github.com/luizfm.png",
      name: "Luiz F",
      role: "Software Engineer - JungleDevs",
    },
    content: [
      {
        type: ContentHandlerTypes.PARAGRAPH,
        content: "Esse é monstro 🚀",
      },
    ],
    publishedAt: "2022-12-21T15:13:23+00:00",
    postLikes: 40,
  },
  {
    id: 400,
    author: {
      avatarUrl: "https://github.com/luizfm.png",
      name: "Luiz F",
      role: "Software Engineer - JungleDevs",
    },
    content: [
      {
        type: ContentHandlerTypes.PARAGRAPH,
        content: "Topppp man 🚀",
      },
    ],
    publishedAt: "2022-12-21T15:13:23+00:00",
    postLikes: 20,
  },
];

type PostProps = {
  className?: string;
  author: AuthorProps;
  publishedAt?: string;
  content?: ContentHandlerProps[];
};

export function Post({ className, content, author, publishedAt }: PostProps) {
  const [comments, setComments] = useState(MOCKED_COMMENTS);
  const [newCommentText, setNewCommentText] = useState("");
  const formRef = useRef(null);
  const publishedDateFormatted = formatDateFormatted(
    publishedAt,
    "MM-dd 'at' HH:mm:ss'h'"
  );
  const publishedDateRelativeNow = formatRelativeDateFromNow(publishedAt);

  const onPublishComment = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setComments((prevValue) => [
        ...prevValue,
        {
          id: v4(),
          author: {
            avatarUrl: "https://github.com/luizfm.png",
            name: "Luiz F",
            role: "Software Engineer - JungleDevs",
          },
          content: [
            {
              type: ContentHandlerTypes.PARAGRAPH,
              content: newCommentText,
            },
          ],
          publishedAt: "2022-12-21T15:13:23+00:00",
          postLikes: 40,
        },
      ]);

      setNewCommentText("");
    },
    [comments, newCommentText]
  );

  const onTextAreaChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!event.target) {
        return;
      }

      const { value } = event.target;
      setNewCommentText(value);
      event.target.setCustomValidity("");
    },
    []
  );

  const onDeleteComment = useCallback((commentId: string | number) => {
    setComments((prevValue) => {
      return prevValue.filter((comment) => comment.id !== commentId);
    });
  }, []);

  const onCommentInvalid = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      event.target.setCustomValidity("This field is required!");
    },
    []
  );

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={classnames(styles["post-container"], className)}>
      <header className={styles["header"]}>
        <div className={styles["author"]}>
          <Avatar src={author.avatarUrl} />
          <div className={styles["author-info"]}>
            <strong className={styles["author-name"]}>{author.name}</strong>
            <span className={styles["author-occupation"]}>{author?.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt}
          className={styles["time"]}
        >
          {publishedDateRelativeNow}
        </time>
      </header>
      <div className={styles["content"]}>
        {content?.map((item) => (
          <ContentHandler key={item.content} {...item} />
        ))}
      </div>
      <form
        ref={formRef}
        onSubmit={onPublishComment}
        className={styles["comment-form"]}
      >
        <strong className={styles["form-title"]}>Give it a feedback</strong>
        <textarea
          id="post-comment"
          name="postComment"
          onChange={onTextAreaChange}
          value={newCommentText}
          placeholder="Give it a feedback"
          className={styles["textarea-input"]}
          onInvalid={onCommentInvalid}
          required
        />
        <footer className={styles["button-wrapper"]}>
          <button
            type="submit"
            className={styles["submit-button"]}
            disabled={isNewCommentEmpty}
          >
            Publish
          </button>
        </footer>
      </form>

      <ul className={styles["comment-list"]}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles["comment-list-item"]}>
            <Comment
              commentId={comment.id}
              onCommentDelete={onDeleteComment}
              author={comment.author}
              content={comment.content}
              postLikes={comment?.postLikes}
              publishedAt={comment.publishedAt}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
