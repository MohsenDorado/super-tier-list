"use server";
import React from "react";
import List from "@/components/list/List";
import AddList from "@/components/list/AddList";

const ListPage = () => {





  return (

    <div className="mt-[150px] mb-[150px] ">
      <AddList/>
      <List/>
    </div>
 
  );
};

export default ListPage;
