"use client";
import { ImagesInterface } from "@/app/utils/types/types";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface MobileImageSliderInterface {
  images: ImagesInterface[];
}

export default function MobileImageSlider({
  images,
}: MobileImageSliderInterface) {
  const [index, setIndex] = useState(0);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartRef.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndRef.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchStartRef.current - touchEndRef.current > 150) {
      nextImage();
    }

    if (touchStartRef.current - touchEndRef.current < 150) {
      prevImage();
    }
  }

  function nextImage() {
    const i = index == images.length - 1 ? index : index + 1;
    setIndex(i);
  }
  function prevImage() {
    const i = index == 0 ? index : index - 1;
    setIndex(i);
  }

  return (
    <div
      className="relative md:hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-center aspect-1 rounded-md bg-gray-200 lg:aspect-none">
        <Image
          width={500}
          height={500}
          src={images[index].url}
          alt="img"
          className="object-cover object-center lg:h-full lg:w-full"
        />
        <div className="absolute bottom-2  flex justify-center items-center gap-1 bg-transparent">
          {images.map((image, idx) => (
            <div
              key={image.id}
              className={`h-2 w-2 rounded-full ${
                idx === index ? "bg-gray-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
