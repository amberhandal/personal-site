"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type Props = {
  src: string;
  caption?: string;
};

export default function PdfViewer({ src, caption }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  // Page width: in grid mode each page gets ~half the container minus the gap
  const pageWidth =
    containerWidth > 640
      ? Math.floor((containerWidth - 16) / 2)
      : containerWidth;

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      {/* Thumbnail grid view */}
      <Document
        file={src}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div className="h-40 flex items-center justify-center text-sm text-gray-500">
            Loading report...
          </div>
        }
      >
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 cursor-pointer"
          onClick={() => setExpanded(true)}
          title="Click to expand"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-black/10 hover:border-black/30 transition"
            >
              <Page
                pageNumber={i + 1}
                width={pageWidth || undefined}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          ))}
        </div>
      </Document>

      {caption && (
        <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
          {caption}
        </p>
      )}

      {/* Expanded modal overlay */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-4 dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-white z-10"
              aria-label="Close"
            >
              &times;
            </button>

            <Document file={src}>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {Array.from({ length: numPages }, (_, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-lg border border-black/10"
                  >
                    <Page
                      pageNumber={i + 1}
                      width={Math.min(550, window.innerWidth * 0.4)}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                ))}
              </div>
            </Document>
          </div>
        </div>
      )}
    </div>
  );
}
