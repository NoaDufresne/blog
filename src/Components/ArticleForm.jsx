import React from 'react';
import { Input } from 'antd';

export default function ArticleForm({ title, content, handleChange }) {
  return (
    <form>
      <label htmlFor="title">Titre</label>
      <Input
        name="title"
        placeholder="Le titre de mon article"
        aria-label="Titre"
        value={title}
        onChange={handleChange}
      />
      <label htmlFor="content">Contenu</label>
      <Input.TextArea
        name="content"
        placeholder="Le contenu de mon article..."
        aria-label="Contenu"
        value={content}
        onChange={handleChange}
      />
    </form>
  );
}
