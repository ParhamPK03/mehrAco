"use client";
import React from "react";

const UserPanelLayout = ({ children }) => {
  return (
    <div className="flex">
     

      <div className="w-[100%]">{children}</div>
    </div>
  );
};

export default UserPanelLayout;
