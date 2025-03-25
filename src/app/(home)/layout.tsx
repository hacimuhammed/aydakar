import React from "react";
import Navbar from "@/components/sections/navbar/default";
import FooterSection from "@/components/sections/footer/default";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full flex justify-center fixed top-0 z-50">
        <div className="container">
          <Navbar />
        </div>
      </div>
      <main className="flex justify-center w-full min-h-[70vh]">
        {children}
      </main>
      <FooterSection />
    </>
  );
};

export default HomeLayout;
