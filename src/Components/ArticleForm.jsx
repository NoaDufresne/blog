import React from 'react';
import { Input, Form } from 'antd';

export default function ArticleForm({ title, content, handleChange, titleError, contentError }) {
  return (
    <Form layout="vertical">
      <Form.Item
        label="Titre"
        validateStatus={titleError ? 'error' : ''}
        help={titleError ? 'You must enter a title.' : ''}
      >
        <Input
          name="title"
          placeholder="Article title"
          aria-label="Title"
          value={title}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Contenu"
        validateStatus={contentError ? 'error' : ''}
        help={contentError ? 'You must enter some content.' : ''}
      >
        <Input.TextArea
          name="content"
          placeholder="Content of my article..."
          aria-label="Content"
          value={content}
          onChange={handleChange}
          rows={6}
        />
      </Form.Item>
    </Form>
  );
}
