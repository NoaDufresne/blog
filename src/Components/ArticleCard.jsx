import React from 'react';
import { DeleteOutlined, EditOutlined, CommentOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { Card, Popconfirm, Collapse } from 'antd';

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
  } = props;

  const label = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      {`${comments.length} Comment${comments.length > 1 ? 's' : ''}`}
    </div>
  );

  return (
    <div>
      <Card
        className="custom-card"
        title={<div style={{ textAlign: 'center' }}>{title}</div>}
        bordered={false}
        style={{
          width: 450,
          border: isFavorite ? '0.8px solid #fadb14' : 'none',
          borderRadius: 8,
        }}
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
      >
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
