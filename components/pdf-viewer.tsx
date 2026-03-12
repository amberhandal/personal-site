"use client";

import { useState } from "react";
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

  return (
    <div>
      <Document
        file={src}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div className="h-40 flex items-center justify-center text-sm text-gray-500">
            Loading report...
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: numPages }, (_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-black/10"
            >
              <Page
                pageNumber={i + 1}
                width={undefined}
                className="w-full"
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
    </div>
  );
}
