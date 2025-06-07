import React, { useState, useEffect } from 'react';
import { Button, Modal, Select } from 'antd';
import ArticleForm from './ArticleForm';
import { addArticle, updateArticle } from '../Fire';
import { serverTimestamp } from "firebase/firestore";

const { Option } = Select;

const TAG_OPTIONS = ['Travel', 'Tips', 'Food', 'Adventure', 'Photo', 'Nature'];

const ArticleModal = (props) => {
  const { selectedArticle } = props;

  const [title, setTitle] = useState(selectedArticle ? selectedArticle.title : '');
  const [content, setContent] = useState(selectedArticle ? selectedArticle.content : '');
  const [tags, setTags] = useState(selectedArticle ? selectedArticle.tags || [] : []);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);


  useEffect(() => {
    if (selectedArticle) {
      setTitle(selectedArticle.title);
      setContent(selectedArticle.content);
      setTags(selectedArticle.tags || []);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
    }
  }, [selectedArticle]);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "title":
        setTitle(event.target.value);
        break;
      case "content":
        setContent(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleTagsChange = (value) => {
    setTags(value);
  };

  const handleSubmit = (e) => {
      let hasError = false;

      if (!title.trim()) {
        setTitleError(true);
        hasError = true;
      } else {
        setTitleError(false);
      }

      if (!content.trim()) {
        setContentError(true);
        hasError = true;
      } else {
        setContentError(false);
      }

      if (hasError) return;

      let article = {
        title,
        content,
        createdAt: serverTimestamp(),
        comments: [],
        tags,
      };

      if (props.selectedArticle) {
        article.id = props.selectedArticle.id;
        article.comments = props.selectedArticle.comments;
        updateArticle(article);
      } else {
        addArticle(article);
      }

      setTitle('');
      setContent('');
      props.handleClose();
    };


  return (
    <Modal
      title="Write an article"
      open={props.isVisible}
      onCancel={props.handleClose}
      footer={
        <Button className="button-form" key="submit" type="primary" onClick={handleSubmit}>
          Valider
        </Button>
      }
      width={800}
    >
      <ArticleForm
        title={title}
        content={content} 
        handleChange={handleChange}
        titleError={titleError}
        contentError={contentError} />
      <div style={{ marginTop: 24 }}>
        <label htmlFor="tags-select" style={{ fontWeight: 'bold', display: 'block', marginBottom: 8 }}>
          Select up to 3 tags
        </label>
        <Select
          id="tags-select"
          mode="multiple"
          allowClear
          maxTagCount={3}
          maxTagTextLength={10}
          placeholder="Choose tags"
          value={tags}
          onChange={handleTagsChange}
          style={{ width: '100%' }}
          options={TAG_OPTIONS.map(tag => ({ label: tag, value: tag }))}
        />
      </div>
    </Modal>
  );
};

export default ArticleModal;
