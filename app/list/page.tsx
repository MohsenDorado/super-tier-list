"use server";
import React from "react";
import List from "@/components/list/List";

const ListPage = () => {
  async function fetchData() {
    const response = await fetch('api/list');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }







  return (

    <div className="mt-[150px] mb-[150px] ">
      <List/>
    </div>
  //   <div className="w-full flex items-center justify-center flex-col my-[100px]">
  //     <div className="w-[300px]">
  //   <input onChange={(e)=>setSearched(e.target.value)} value={searched} type="text" className="p-2 border rounded-xl w-full font-Yekan " placeholder="جستجو" />
  //  </div>
  //  <p>{finalData}</p>

   
  //     {isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8  p-4 border rounded shadow-md h-[130px] animate-pulse w-full">
  //       <div className="bg-gray-200 h-[30px] w-[20%]  rounded"></div>
  //     <div className="bg-gray-200 h-[90%] w-[20%]  rounded"></div>
  //   </div>}
   
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 w-full px-5">
  //     {posts
  //       .filter((post:any) =>
  //         post.person.toLowerCase().includes(searched.toLowerCase()) 
  //       ).map((post: any) => (
  //         <PostCard
  //           key={post?.id}
  //           title={post?.person}
  //           content={post?.amount}
  //           onDelete={() => {}}
  //         />
  //       ))}
  //     </div>
  //   </div>
  );
};

export default ListPage;
