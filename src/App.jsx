import './App.css';
import React, { useState } from 'react';
import AddButton from './Components/AddButton';
import ArticleModal from './Components/ArticleModal';

function App() {
  const [isArticleModalVisible, setIsArticleModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsArticleModalVisible(true); 
  };

  const handleCloseModal = () => {
    setIsArticleModalVisible(false);
  };

  return (
    <>
      <h1>My first React page</h1>
      <div className="card">
        {}
        <AddButton text="Coucou" onClick={handleOpenModal} />
      </div>
      {}
      <ArticleModal
        isVisible={isArticleModalVisible}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default App;
