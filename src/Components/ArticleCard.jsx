import React from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  CommentOutlined,
  StarOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Card, Popconfirm, Collapse, Tag } from 'antd';

export default function ArticleCard(props) {
  const {
    id,
    title,
    content,
    comments,
    isFavorite,
    onToggleFavorite,
    handleEdit,
    handleDelete,
    handleComment,
    createdAt,
    tags = [],
  } = props;

  const label = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      {`${comments.length} Comment${comments.length > 1 ? 's' : ''}`}
    </div>
  );

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const dateObj =
      typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return dateObj.toLocaleString('fr-FR', options);
  };

  return (
    <div>
      <Card
        className="custom-card"
        bordered={false}
        style={{
          width: '100%',
          border: isFavorite ? '0.8px solid #fadb14' : 'none',
          borderRadius: 8,
        }}
        // Actions stay the same
        actions={[
          <span key="fav" onClick={() => onToggleFavorite(id)} style={{ cursor: 'pointer' }}>
            {isFavorite ? <StarFilled style={{ color: '#fadb14' }} /> : <StarOutlined />}
          </span>,
          <EditOutlined key="edit" onClick={() => handleEdit(id)} />,
          <Popconfirm
            key="delete"
            title="Are you sure to delete this article?"
            onConfirm={() => handleDelete(id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>,
          <CommentOutlined key="comment" onClick={() => handleComment(id)} />,
        ]}
        title={
          <div className="article-card-header">
            <h3 className="article-card-title">{title}</h3>
            <div className="article-card-tags">
              {tags.map((tag) => (
                <Tag color="blue" key={tag} style={{ marginBottom: 4 }}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        }
      >
        {createdAt && (
          <div style={{ marginTop: 12, fontSize: '0.8rem', color: '#888', textAlign: 'right' }}>
            {formatDate(createdAt)}
          </div>
        )}

        <div className={`card-content ${comments && comments.length > 0 ? 'with-divider' : ''}`}>
          <p>{content}</p>
        </div>

        {comments && comments.length > 0 && (
          <Collapse
            ghost
            expandIconPosition="end"
            className="custom-collapse"
            items={[
              {
                key: '1',
                label,
                children: (
                  <div className="commentContainer">
                    {comments.map((comment, index) => (
                      <div key={index} className="commentItem">
                        <p>{comment}</p>
                      </div>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        )}
      </Card>
    </div>
  );
}
