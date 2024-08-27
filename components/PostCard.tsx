"use client"
import React from 'react';


interface PostCardProps {
  
  title: string;
  content: string;
  onDelete: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, onDelete }) => {
  function formatNumberString(input:string) {
    // Remove all non-digit characters from the input
    let cleanedInput = input.replace(/\D/g, '');
    
    // Reverse the cleaned input
    let reversed = cleanedInput.split('').reverse().join('');
    
    // Add a space every 3 digits
    let spacedReversed = reversed.replace(/(\d{3})(?=\d)/g, '$1,');
    
    // Reverse the string back to the original order
    let result = spacedReversed.split('').reverse().join('');
    
    return result;
}
  
  return (
    <div className="border p-4 rounded-lg shadow-lg ">
      <h2 className="text-xl font-bold font-Yekan">{title}</h2>
      <p className="text-gray-700 mt-2">{formatNumberString(content.toString())}</p>
      <button onClick={onDelete} className="mt-4 text-red-600">Delete</button>
    </div>
  );
};

export default PostCard;
