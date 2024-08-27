"use client"
import React from 'react';


interface PostCardProps {
  title: string;
  content: string;
  onDelete: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, onDelete }) => {
  
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700 mt-2">{content}</p>
      <button onClick={onDelete} className="mt-4 text-red-600">Delete</button>
    </div>
  );
};

export default PostCard;
