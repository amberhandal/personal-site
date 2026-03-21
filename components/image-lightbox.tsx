"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";

type Props = {
  src: string | StaticImageData;
  alt: string;
  className?: string;
};

export default function ImageLightbox({ src, alt, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className={`${className ?? "object-contain"} cursor-pointer`}
        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 85vw, 1024px"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-5 text-3xl text-white/80 hover:text-white z-10"
            aria-label="Close"
          >
            &times;
          </button>
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={1400}
              height={900}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
