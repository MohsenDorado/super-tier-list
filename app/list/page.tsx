"use client";
import PostCard from "@/components/PostCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListPage = () => {

  const [posts, setPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/list");
      setPosts(response.data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-col my-[100px]">
      <div className="  flex  w-full">CRUD Posts</div>
      {isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8  p-4 border rounded shadow-md h-[130px] animate-pulse w-full">
        <div className="bg-gray-200 h-[30px] w-[20%]  rounded"></div>
      <div className="bg-gray-200 h-[90%] w-[20%]  rounded"></div>
    </div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 w-full">
        {posts?.map((post: any) => (
          <PostCard
            key={post?.id}
            title={post?.person}
            content={post?.amount}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
