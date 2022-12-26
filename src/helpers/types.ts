import { ContentHandlerTypes } from "../components/content-handler";

export type AuthorProps = {
  name: string;
  role: string;
  avatarUrl: string;
};

export type PostContent = {
  type: ContentHandlerTypes;
  content: string;
};

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

export type ContentHandlerProps = ContentLinkType | ContentParagraphType;

export type MockedComments = {
  id: number | string;
  author: AuthorProps;
  content: ContentHandlerProps[];
  publishedAt: string;
  postLikes?: number;
};
