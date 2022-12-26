import { ThumbsUp, Trash } from "phosphor-react";
import React, { useCallback, useState } from "react";
import {
  formatDateFormatted,
  formatRelativeDateFromNow,
} from "../../helpers/date-formatter";
import { AuthorProps, PostContent } from "../../helpers/types";
import { Avatar } from "../avatar";
import ContentHandler from "../content-handler";

import styles from "./styles.module.scss";

type CommentProps = {
  author: AuthorProps;
  content: PostContent[];
  publishedAt: string;
  postLikes?: number;
  commentId: string | number;
  onCommentDelete: (commentId: string | number) => void;
};

export function Comment({
  commentId,
  onCommentDelete,
  author,
  content,
  postLikes = 0,
  publishedAt,
}: CommentProps) {
  const [likeCount, setLikeCount] = useState(postLikes);

  const publishedDateFormatted = formatDateFormatted(
    publishedAt,
    "MM-dd 'at' HH:mm:ss'h'"
  );
  const publishedDateRelativeNow = formatRelativeDateFromNow(publishedAt);

  const handleCommentDelete = useCallback(() => {
    onCommentDelete(commentId);
  }, []);

  const onLikeClick = useCallback(() => {
    setLikeCount((prevValue) => prevValue + 1);
  }, [likeCount]);

  return (
    <div className={styles["comment-container"]}>
      <Avatar src={author.avatarUrl} variant="borderless" />

      <div className={styles["comment-box"]}>
        <div className={styles["comment-content"]}>
          <header className={styles["comment-content-header"]}>
            <div className={styles["author-and-time"]}>
              <strong className={styles["commenter-name"]}>
                {author.name}
              </strong>
              <time
                title={publishedDateFormatted}
                dateTime={publishedAt}
                className={styles["commented-at"]}
              >
                {publishedDateRelativeNow}
              </time>
            </div>

            <button
              onClick={handleCommentDelete}
              title="Delete comment"
              aria-label="Delete comment"
              className={styles["delete-comment-button"]}
            >
              <Trash size={24} />
            </button>
          </header>

          {content.map((item) => (
            <ContentHandler key={item.content} {...item} />
          ))}
        </div>
        <footer className={styles["comment-footer"]}>
          <button className={styles["claps-button"]} onClick={onLikeClick}>
            <ThumbsUp className={styles["thumbs-up-icon"]} />
            Claps <span className={styles["claps-quantity"]}>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
