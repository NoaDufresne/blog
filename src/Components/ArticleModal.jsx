import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ArticleForm from './ArticleForm';
import { addArticle, updateArticle } from '../Fire';

const ArticleModal = (props) => {
  const [title, setTitle] = useState(props.selectedArticle ? props.selectedArticle.title : '');
  const [content, setContent] = useState(props.selectedArticle ? props.selectedArticle.content : '');

  const handleChange = (event) => {
    switch (event.target.name) {
      case "title":
        setTitle(event.target.value)
        break;
      case "content":
        setContent(event.target.value)
        break;

      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    let article = {
      "title": title,
      "content": content,
      "createdAt": new Date(),
      "comments": []
    };
    if (props.selectedArticle) {
      article.id = props.selectedArticle.id
      article.comments = props.selectedArticle.comments
      updateArticle(article)
    } else {
      addArticle(article)
    }
    setContent('')
    setTitle('')
    props.handleClose()
  }

  return (
    <Modal
      title="Write an article"
      open={props.isVisible}
      onCancel={props.handleClose}
      footer={
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Valider
        </Button>
      }
      width={800}
    >
      <ArticleForm title={title} content={content} handleChange={handleChange} />
    </Modal>
  );
};

export default ArticleModal;
