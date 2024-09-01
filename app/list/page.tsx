"use server";
import React from "react";
import List from "@/components/list/List";
import AddList from "@/components/list/AddList";
import ReactQueryProvider from "../providers/ReactQueryProvider";

const ListPage = () => {





  return (

    <div className="mt-[150px] mb-[150px] ">
      <ReactQueryProvider>
      <AddList/>

      <List/>
      </ReactQueryProvider>
    </div>
 
  );
};

export default ListPage;
