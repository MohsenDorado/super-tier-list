"use server";
import React from "react";
import List from "@/components/list/List";
import AddList from "@/components/list/AddList";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Count from "@/components/list/Count";
import ListOrder from "@/components/list/ListOrder";

const ListPage = () => {





  return (

    <div className="mt-[150px] mb-[150px] ">
      <ReactQueryProvider>
      <AddList/>
      <ListOrder/>
      <Count/>

      <List/>
      </ReactQueryProvider>
    </div>
 
  );
};

export default ListPage;
