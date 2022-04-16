import { MarkdownRender } from '../Markdown';

export type PostBodyProps = {
  markdown: string;
};

function PostBody({ markdown }: PostBodyProps) {
  return <MarkdownRender markdown={markdown} />;
}

export default PostBody;
