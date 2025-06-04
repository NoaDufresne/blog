import './App.css';
import React, { useState, useEffect } from 'react';
import ArticleModal from './Components/ArticleModal';
import CommentModal from './Components/CommentModal';
import { getArticles, deleteArticle } from './Fire';
import { Spin, Button, Input, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ArticleCard from './Components/ArticleCard';
import CustomCarousel from './Components/Carousel';
import { SearchOutlined } from '@ant-design/icons';


function App() {
  const [isArticleModalVisible, setIsArticleModalVisible] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // les Favorites ici
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const stored = localStorage.getItem('favoriteArticles');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    document.title = "Noa's travel blog";
    getArticles(posts => {
      setArticles(posts);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteArticles', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (id) => {
    const scrollY = window.scrollY;

    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

    setTimeout(() => {
      window.scrollTo({ top: scrollY, behavior: 'auto' });
    }, 0);
  };


    const filteredAndSortedArticles = articles
      .filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(a.tags) && a.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      )
      .sort((a, b) => {
        const aFav = favoriteIds.includes(a.id);
        const bFav = favoriteIds.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0;
      });



  const heroImages = [
    'https://source.unsplash.com/800x300/?travel,beach',
    'https://source.unsplash.com/800x300/?mountains',
    'https://source.unsplash.com/800x300/?city,night',
  ];

  return (
    <div className="app-wrapper">
      <header className="blog-header">
        <div className="logo-title">
          <h1>Noa's travel blog</h1>
        </div>
        <div className="header-actions">
          <Button
            className='button-create'
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsArticleModalVisible(true);
              setSelectedArticle(null);
            }}
          >
            Write an article
          </Button>
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: 250 }}
            prefix={<SearchOutlined style={{ color: 'rgb(191, 191, 191)' }} />}
          />

        </div>
      </header>

      <FloatButton.BackTop 
        tooltip="Back to top"
        className="custom-float-button" />

      {}
      <CustomCarousel images={heroImages} />

      <main className="main-content">
        <div className="container">
          {loading ? (
            <Spin />
          ) : filteredAndSortedArticles.length === 0 ? (
            <p className="no-articles">No articles yet :(</p>
          ) : (
            filteredAndSortedArticles.map(article => (
              <ArticleCard
                className="custom-card"
                key={article.id}
                id={article.id}
                title={article.title}
                content={article.content}
                comments={article.comments}
                createdAt={article.createdAt} 
                tags={article.tags}
                isFavorite={favoriteIds.includes(article.id)}
                onToggleFavorite={toggleFavorite}
                setIsArticleModalVisible={setIsArticleModalVisible}
                handleDelete={() => {
                  setSelectedArticle(article);
                  deleteArticle(article);
                }}
                handleComment={() => {
                  setSelectedArticle(article);
                  setIsCommentModalVisible(true);
                }}
                handleEdit={() => {
                  setSelectedArticle(article);
                  setIsArticleModalVisible(true);
                }}
              />
            ))
          )}
        </div>
      </main>

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
        />
      )}
    </div>
  );
}

export default App;
