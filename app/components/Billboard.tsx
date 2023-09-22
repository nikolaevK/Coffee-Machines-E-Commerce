import React from "react";
import { BillboardInterface } from "../utils/types/types";

interface BillboardComponentInterface {
  billboard: BillboardInterface;
}

export default function Billboard({
  billboard: { imageUrl, id, label },
}: BillboardComponentInterface) {
  return (
    <div className="overflow-hidden w-full mt-[-2px]">
      <div
        className="aspect-1 bg-right md:bg-inherit  md:aspect-[2.4/1.4] overflow-hidden bg-cover"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="hidden md:flex justify-start p-6 pt-[30%]">
          <div className="font-bold text-white max-w-xl text-3xl md:text-5xl lg:text-6xl"></div>
        </div>
      </div>
    </div>
  );
}
