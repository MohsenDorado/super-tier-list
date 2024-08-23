"use server";
import React from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";

const ContactPage = () => {
  return (
    <div className="h-[200vh] relative">
      <Hero />
      <Features />
    </div>
  );
};

export default ContactPage;
