import React from "react";
import Map from "../../shared/components/Map";
import MarkPng from "../../assets/mark.png";

export default function Home() {
  return (
    <div>
      <Map />
      <div>
        <img
          className="w-[60px] fixed bottom-6 right-5 z-40 cursor-pointer animate-pulse"
          src={MarkPng}
          // onClick={ }
        />
      </div>
    </div>
  );
}
