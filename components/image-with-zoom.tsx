"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";

type Props = {
  src: string | StaticImageData;
  zoomSrc: string | StaticImageData;
  alt: string;
  caption?: string;
};

export default function ImageWithZoom({ src, zoomSrc, alt, caption }: Props) {
  const [lightbox, setLightbox] = useState<"main" | "zoom" | null>(null);

  return (
    <div className="space-y-1">
      <div className="relative w-full overflow-hidden rounded-lg border border-black/10"
           style={{ aspectRatio: "16 / 9" }}>
        {/* Main image */}
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain cursor-pointer"
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 85vw, 1024px"
          onClick={() => setLightbox("main")}
        />

        {/* Highlight rectangle on top-left quadrant */}
        <div className="absolute top-[5%] left-[2%] w-[30%] h-[45%] border-2 border-dashed border-yellow-400 rounded pointer-events-none" />

        {/* SVG connector lines from highlight box to zoom panel */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {/* Line from bottom-right of highlight to top-left of zoom panel */}
          <line
            x1="32%" y1="50%"
            x2="60%" y2="55%"
            stroke="#facc15"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          <line
            x1="32%" y1="10%"
            x2="60%" y2="55%"
            stroke="#facc15"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
        </svg>

        {/* Zoom panel — positioned right side */}
        <div
          className="absolute right-[2%] top-[55%] w-[38%] border-2 border-yellow-400 rounded-lg overflow-hidden shadow-lg cursor-pointer bg-black"
          onClick={(e) => { e.stopPropagation(); setLightbox("zoom"); }}
          title="Click to expand"
        >
          <Image
            src={zoomSrc}
            alt={`${alt} — detail`}
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            sizes="300px"
          />
        </div>
      </div>

      {caption && (
        <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
          {caption}
        </p>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
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
              src={lightbox === "zoom" ? zoomSrc : src}
              alt={alt}
              width={1400}
              height={900}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
