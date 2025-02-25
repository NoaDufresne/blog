import React from 'react';
import { Modal } from 'antd';

const ArticleModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      title="Rédiger un article"
      open={isVisible} // Utilise la prop "isVisible" pour l'affichage
      onCancel={onClose} // Ferme la modale quand on clique en dehors ou sur la croix
      footer={null} // Pas de footer
    >
      <p>Le formulaire devra apparaître ici…</p>
    </Modal>
  );
};

export default ArticleModal;
