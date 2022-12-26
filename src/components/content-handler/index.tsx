import { useMemo } from "react";
import classnames from "classnames";

import styles from "./styles.module.scss";

export enum ContentHandlerTypes {
  PARAGRAPH = "paragraph",
  LINK = "link",
}

type ContentLinkType = {
  type: ContentHandlerTypes.LINK;
  className?: string;
  linkClassName?: string;
  content: string;
  href?: string;
};

type ContentParagraphType = {
  type: ContentHandlerTypes;
  content: string;
  className?: string;
};

type ContentHandlerProps = ContentLinkType | ContentParagraphType;

export function ContentHandler({
  content,
  className,
  type,
  ...rest
}: ContentHandlerProps) {
  const anchorHref = useMemo(() => {
    if ("href" in rest) {
      return rest.href;
    }

    return "/";
  }, []);

  const linkClassName = useMemo(() => {
    if ("linkClassName" in rest) {
      return rest.linkClassName;
    }

    return undefined;
  }, []);

  const renderContent = useMemo(() => {
    switch (type) {
      case ContentHandlerTypes.LINK: {
        return (
          <p className={classnames(styles["content-text"], className)}>
            <a
              href={anchorHref}
              className={classnames(styles["link"], linkClassName)}
            >
              {content}
            </a>
          </p>
        );
      }
      case ContentHandlerTypes.PARAGRAPH:
      default:
        return <p className={styles["content-text"]}>{content}</p>;
    }
  }, []);

  return renderContent;
}

export default ContentHandler;
