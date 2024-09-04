'use client';

import { getPostsBySearch } from '@/services/getPosts';
import { Post } from '@/common/types/api';
import { FormEventHandler, useState } from 'react';


interface Props {
    onSearch: (value: Post[])=>void;
}

const PostSearch = ({ onSearch }:Props) => {
  const [ search, setSearch ] = useState('');
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const posts = await getPostsBySearch(search);
    onSearch(posts);
  };

  return (

    <form onSubmit={handleSubmit}>
      <input
        type='search'
        placeholder='search'
        value={search}
        onChange={ event => setSearch(event.target.value) }
      />
      <button type='submit'>Search</button>
    </form>
  );
};

export default PostSearch;
