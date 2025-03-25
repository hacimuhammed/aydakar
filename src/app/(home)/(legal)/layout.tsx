import React from "react";

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col pt-32">{children}</div>
    </div>
  );
};

export default LegalLayout;
