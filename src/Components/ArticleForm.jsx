import React from 'react';
import { Input } from 'antd';

export default function ArticleForm({ title, content, handleChange }) {
  return (
    <form>
      <label htmlFor="title">Titre</label>
      <Input
        name="title"
        placeholder="Article title"
        aria-label="Title"
        value={title}
        onChange={handleChange}
      />
      <label htmlFor="content">Contenu</label>
      <Input.TextArea
        name="content"
        placeholder="Content of my article..."
        aria-label="Content"
        value={content}
        onChange={handleChange}
      />
    </form>
  );
}
