"use server";
import React from "react";
import List from "@/components/list/List";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import ListHeader from "@/components/list/ListHeader";
import ListOrder from "@/components/list/ListOrder";
const ListPage = () => {
  return (
    <div className="mt-[70px] mb-[150px] bg-[#f8f9fa] min-h-[150vh] ">
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