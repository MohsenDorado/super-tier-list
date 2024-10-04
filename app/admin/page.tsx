"use client";
import AdminList from "@/components/admin/AdminList";
import React from "react";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Test from "@/components/Test";

const ContactPage = () => {

  return (
    <div className=" mt-[70px] mb-[150px]">
      <ReactQueryProvider>



      <Test/>
      {/* <AdminList/> */}
      </ReactQueryProvider>
    </div>
  );
};

export default ContactPage;
