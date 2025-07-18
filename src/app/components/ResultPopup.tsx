"use client";

import { useEffect, useState } from "react";

interface ResultPopupProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    success: boolean;
    message: string;
    data: {
      id: string;
      prompt: string;
      status: string;
      estimatedTime: string;
      type: string;
    };
  } | null;
  isLoading?: boolean;
}

export default function ResultPopup({
  isOpen,
  onClose,
  data,
  isLoading = false,
}: ResultPopupProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsClosing(false);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 400); // Match the slide-out animation duration
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !data) return null;

  return (
    <>
      <div
        className="backdrop-fade-in fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      <div
        className={`fixed top-20 right-5 z-50 h-full w-80 ${
          isClosing ? "slide-out" : "slide-in"
        }`}
      >
        <div className="h-auto w-full rounded-2xl border border-l border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl">
          <div className="flex h-full flex-col">
            <div className="flex-1 p-6">
              <div className="space-y-6">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-medium text-gray-300">
                    Task ID
                  </h3>
                  {isLoading ? (
                    <div className="h-4 animate-pulse rounded bg-white/10"></div>
                  ) : (
                    <p className="font-mono text-sm text-white">
                      {data.data.id}
                    </p>
                  )}
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-medium text-gray-300">
                    Prompt
                  </h3>
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="h-3 animate-pulse rounded bg-white/10"></div>
                      <div className="h-3 w-3/4 animate-pulse rounded bg-white/10"></div>
                    </div>
                  ) : (
                    <p className="text-sm text-white">{data.data.prompt}</p>
                  )}
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-medium text-gray-300">
                    Status
                  </h3>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-16 animate-pulse rounded bg-white/10"></div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${data.data.status === "processing" ? "animate-pulse bg-yellow-500" : data.data.status === "error" ? "bg-red-500" : "bg-green-500"}`}
                      ></div>
                      <span
                        className={`text-sm capitalize ${data.data.status === "processing" ? "text-yellow-400" : data.data.status === "error" ? "text-red-400" : "text-green-400"}`}
                      >
                        {data.data.status}
                      </span>
                    </div>
                  )}
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-medium text-gray-300">
                    Type
                  </h3>
                  {isLoading ? (
                    <div className="h-4 animate-pulse rounded bg-white/10"></div>
                  ) : (
                    <p className="text-sm text-white capitalize">
                      {data.data.type.replace("_", " ")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-6">
              <button
                onClick={handleClose}
                className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
