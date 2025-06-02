import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { updateArticle } from '../Fire';

export default function CommentModal(props) {
  const [comment, setComment] = useState('');
  const handleSubmit = () => {
    let article = {
      "id": props.selectedArticle.id,
      "title": props.selectedArticle.title,
      "content": props.selectedArticle.content,
      "createdAt": props.selectedArticle.createdAt,
      "comments": props.selectedArticle.comments
    }
    article.comments.push(comment)
    updateArticle(article)
  };

  return (
    <Modal
      title="Add a comment"
      open={props.isVisible}
      onCancel={props.handleClose}
      footer={[
        <Button key="submit" type="primary" onClick={() => handleSubmit()}>
          Send
        </Button>
      ]}
    >
      <Input
        placeholder="Your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
      />
    </Modal>
  );
}
