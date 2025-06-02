import React from 'react'
import {DeleteOutlined,EditOutlined, CommentOutlined} from '@ant-design/icons'
import {Card } from 'antd'
import { Popconfirm } from "antd";


export default function ArticleCard(props) {
  return (
    <div>
      <Card
        className="custom-card"
        title={<div style={{ textAlign: 'center' }}>{props.title}</div>}
        bordered={false}
        style={{ width: 300 }}
        actions={[
          <EditOutlined onClick={() => props.handleEdit(props.id)} />,
          <Popconfirm
            title="Are you sure to delete this article?"
            onConfirm={() => props.handleDelete(props.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>,
          <CommentOutlined onClick={() => props.handleComment(props.id)} />,
        ]}
      >
        {/* Align content to the left */}
        <div className="card-content">
          <p>{props.content}</p>
        </div>

        {/* Comments */}
        {props.comments && props.comments.length > 0 && (
          <div className="commentContainer">
            <strong style={{ color: '#aaa' }}>Comments:</strong>
            {props.comments.map((comment, index) => (
              <div key={index} className="commentItem">
                <p>{comment}</p>
              </div>
            ))}
          </div>
        )}
      </Card>


    </div>
  )
  
}

