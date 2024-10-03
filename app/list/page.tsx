"use server";
import React from "react";
import List from "@/components/list/List";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import ListHeader from "@/components/list/ListHeader";
import ListOrder from "@/components/list/ListOrder";
const ListPage = () => {
  return (
    <div className="mt-[70px] max-lg:mb-[60px] bg-[#f8f9fa] dark:bg-black  ">
      <ReactQueryProvider>
      {/* <AddList/>
      <Count/> */}
      {/* <ListOrder/> */}
      {/* <ListHeader/> */}
      <List/>
      </ReactQueryProvider>
    </div>
  );
};
export default ListPage;