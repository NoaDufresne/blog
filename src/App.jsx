import './App.css';
import React, { useState, useEffect } from 'react';
import ArticleModal from './Components/ArticleModal';
import CommentModal from './Components/CommentModal';
import { getArticles, deleteArticle } from './Fire';
import { Spin, Button, Input, FloatButton } from 'antd';
import ArticleCard from './Components/ArticleCard';

function App() {
  const [isArticleModalVisible, setIsArticleModalVisible] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    getArticles(posts => {
      setArticles(posts);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <h1>Noa's Blog</h1>
      <FloatButton>A</FloatButton>
      <Button type="primary" onClick={() => { setIsArticleModalVisible(true); setSelectedArticle(null); }}>
        Open Modal
      </Button>
      <Input
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 300, marginBottom: '20px' }}
      />

      {isArticleModalVisible && (
        <ArticleModal
          selectedArticle={selectedArticle}
          isVisible={isArticleModalVisible}
          handleSubmit={() => setIsArticleModalVisible(false)}
          handleClose={() => setIsArticleModalVisible(false)}
        />
      )}
      {isCommentModalVisible && (
      <CommentModal
        selectedArticle={selectedArticle}
        isVisible={isCommentModalVisible}
        handleClose={() => setIsCommentModalVisible(false)}
        handleSubmit={() => setIsCommentModalVisible(false)}
      />)}

      <div className='container'>
        {loading ? (
          <Spin />
        ) : (
          articles
            .filter(article =>
              article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              article.content.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(article => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                content={article.content}
                comments={article.comments}
                setIsArticleModalVisible={setIsArticleModalVisible}
                handleDelete={() => {
                  setSelectedArticle(article);
                  deleteArticle(article);
                }}
                handleComment={() => {
                  setSelectedArticle(article);
                  setIsCommentModalVisible(true);
                }
                }
                handleEdit={() => {
                  setSelectedArticle(article);
                  setIsArticleModalVisible(true);
                }}

              />
            ))
        )}
      </div>
    </>
  );
}

export default App;
