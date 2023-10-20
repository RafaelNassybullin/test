"use client";//
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";

const Progress = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="5px"
        color="#8A2BE2"
        options={{ showSpinner: false }}
        showOnShallow={true}
      />
    </>
  );
};

export default Progress;
