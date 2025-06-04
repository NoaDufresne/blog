import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { updateArticle } from '../Fire';

export default function CommentModal(props) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      message.warning('Please enter a comment before sending.');
      return;
    }

    setLoading(true);

    try {
      const article = {
        ...props.selectedArticle,
        comments: [...(props.selectedArticle.comments || []), comment],
      };

      await updateArticle(article);

      setComment('');
      props.handleClose();
    } catch (error) {
      message.error('Failed to add comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add a Comment"
      open={props.isVisible}
      onCancel={props.handleClose}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit} loading={loading}>
          Send
        </Button>
      ]}
    >
      <Input.TextArea
        placeholder="Your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />
    </Modal>
  );
}
