"use server";
import AdminList from "@/components/admin/AdminList";
import React from "react";
import ReactQueryProvider from "../providers/ReactQueryProvider";

const ContactPage = () => {

  return (
    <div className=" mt-[70px] mb-[150px]">
      <ReactQueryProvider>

      <AdminList/>
      </ReactQueryProvider>
    </div>
  );
};

export default ContactPage;
