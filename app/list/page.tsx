"use server";
import React from "react";
import List from "@/components/list/List";
import AddList from "@/components/list/AddList";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Count from "@/components/list/Count";
import ListOrder from "@/components/list/ListOrder";
import ListHeader from "@/components/list/ListHeader";

const ListPage = () => {





  return (

    <div className="mt-[150px] mb-[150px] ">
      <ReactQueryProvider>
      {/* <AddList/>
      <Count/> */}
      <ListOrder/>
      <ListHeader/>

      <List/>
      </ReactQueryProvider>
    </div>
 
  );
};

export default ListPage;
