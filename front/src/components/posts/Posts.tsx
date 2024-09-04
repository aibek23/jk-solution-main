import { Post } from '@/common/types/api';
import Link from 'next/link';


interface Props {
    posts:Post[]
}


const Posts = ({ posts }:Props) => {
  return (
    <ul>
      {
        posts.map((post:Post) => (
          <li key={ post.id }>
            <Link href={ `/blog/${ post.id }` }>{ post.title }</Link>
          </li>
        ))
      }
    </ul>
  );
};

export default Posts;
