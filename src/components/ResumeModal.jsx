import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDFJS Worker using unpkg CDN matching the exact pdfjs version
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// CSS files required by react-pdf
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function ResumeModal({ isOpen, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(Math.min(window.innerWidth - 48, 800));

  // Dynamically scale PDF width on window resize
  useEffect(() => {
    const handleResize = () => {
      setPageWidth(Math.min(window.innerWidth - 48, 800));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) =>
      Math.min(Math.max(prevPageNumber + offset, 1), numPages || 1)
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-4xl bg-slate-900/90 border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10"
          >
            {/* Header Control Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/95 sticky top-0 z-20">
              <div>
                <h3 className="text-lg font-semibold text-slate-100">Curriculum Vitae</h3>
                <p className="text-xs text-slate-400">Rohit Buddhe - Portfolio Resume</p>
              </div>

              {/* Actions Grid */}
              <div className="flex items-center gap-2">
                {/* Open in new tab */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </a>

                {/* Download */}
                <a
                  href="/resume.pdf"
                  download="Rohit_Buddhe_Resume.pdf"
                  className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Download PDF"
                >
                  <Download size={18} />
                </a>

                {/* Vertical Divider */}
                <div className="w-[1px] h-6 bg-slate-850 mx-1" />

                {/* Close */}
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* PDF Viewer Container */}
            <div className="flex-1 overflow-auto bg-slate-950 p-4 sm:p-6 flex justify-center items-start custom-scrollbar">
              <Document
                file="/resume.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                    <span>Loading Document...</span>
                  </div>
                }
                error={
                  <div className="flex flex-col items-center justify-center py-20 text-red-400">
                    <span>Failed to load PDF resume.</span>
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg font-semibold flex items-center gap-2"
                    >
                      <ExternalLink size={16} /> Open Directly
                    </a>
                  </div>
                }
              >
                <div className="shadow-2xl rounded-lg overflow-hidden border border-slate-800 bg-white">
                  <Page
                    pageNumber={pageNumber}
                    width={pageWidth}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    loading={
                      <div className="flex items-center justify-center p-20 bg-slate-900 w-full h-[600px]">
                        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                      </div>
                    }
                  />
                </div>
              </Document>
            </div>

            {/* Footer Pagination Controls (Only if > 1 page) */}
            {numPages && numPages > 1 && (
              <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800/80 bg-slate-900/95 sticky bottom-0 z-20">
                <button
                  onClick={() => changePage(-1)}
                  disabled={pageNumber <= 1}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:hover:text-slate-400 transition-colors py-1 px-3 bg-slate-800 rounded-md cursor-pointer"
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                <span className="text-sm font-medium text-slate-350">
                  Page {pageNumber} of {numPages}
                </span>

                <button
                  onClick={() => changePage(1)}
                  disabled={pageNumber >= numPages}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:hover:text-slate-400 transition-colors py-1 px-3 bg-slate-800 rounded-md cursor-pointer"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
