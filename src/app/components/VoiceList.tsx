"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import VoiceSkeleton from "./VoiceSkeleton";
import clsx from "clsx";

interface Voice {
  id: string;
  voice_name: string;
  language: string;
  profile_picture: string;
  sample_audio_file: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface VoiceResponse {
  data: Voice[];
  pagination: PaginationInfo;
}

export default function VoiceList({
  initialVoices,
}: {
  initialVoices: VoiceResponse;
}) {
  const [voices, setVoices] = useState<Voice[]>(initialVoices.data);
  const [pagination, setPagination] = useState<PaginationInfo>(
    initialVoices.pagination
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialVoices.pagination.hasNextPage);
  const observer = useRef<IntersectionObserver | undefined>(undefined);
  const loadingRef = useRef<HTMLDivElement>(null);
  const isRequesting = useRef(false);

  const loadMoreVoices = useCallback(async () => {
    if (loading || !hasMore || isRequesting.current) return;

    // Immediately disconnect observer to prevent multiple calls
    if (observer.current) {
      observer.current.disconnect();
      observer.current = undefined;
    }

    isRequesting.current = true;
    setLoading(true);

    try {
      const nextPage = pagination.currentPage + 1;
      const response = await fetch(
        `/api/voices?page=${nextPage}&limit=${pagination.itemsPerPage}`
      );
      const newData: VoiceResponse = await response.json();

      await new Promise(resolve => setTimeout(resolve, 1000));

      setVoices(prev => [...prev, ...newData.data]);
      setPagination(newData.pagination);
      setHasMore(newData.pagination.hasNextPage);
    } catch (error) {
      console.error("Error loading more voices:", error);
    } finally {
      setLoading(false);
      isRequesting.current = false;
    }
  }, [loading, hasMore, pagination.currentPage, pagination.itemsPerPage]);

  useEffect(() => {
    // Disconnect any existing observer
    if (observer.current) {
      observer.current.disconnect();
      observer.current = undefined;
    }

    // Only create observer if not loading and has more data
    if (!loading && !isRequesting.current && hasMore && loadingRef.current) {
      observer.current = new IntersectionObserver(
        entries => {
          if (
            entries[0].isIntersecting &&
            !loading &&
            !isRequesting.current &&
            hasMore
          ) {
            loadMoreVoices();
          }
        },
        { threshold: 0.1, rootMargin: "50px" }
      );
      observer.current.observe(loadingRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = undefined;
      }
    };
  }, [loading, hasMore, loadMoreVoices]);

  return (
    <div
      className={clsx("scrollbar-hide h-[170px] overflow-y-auto", {
        "pointer-events-none opacity-75": loading,
      })}
    >
      <div className="grid grid-cols-3 items-center justify-center gap-4">
        {voices.map(voice => (
          <div key={voice.id} className="group cursor-pointer p-2">
            <div className="relative mx-auto h-[46px] w-[46px]">
              <Image
                src={voice.profile_picture}
                alt={voice.voice_name}
                width={46}
                height={46}
                className="aspect-square w-full rounded-full object-cover"
              />
              <div className="absolute right-2 bottom-3.5 h-1 w-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <button
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100"
                  onClick={e => {
                    e.stopPropagation();
                    // Handle play functionality here
                    console.log("Play voice:", voice.voice_name);
                  }}
                >
                  <Image
                    src="/svg/icon-control-play-gray.svg"
                    alt="Play"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
            <div className="mt-3 text-center">
              <h3 className="truncate text-sm font-medium text-white">
                {voice.voice_name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div ref={loadingRef} className="mt-4">
        {loading && <VoiceSkeleton />}
        {!hasMore && voices.length > 0 && <div className="text-center"></div>}
      </div>
    </div>
  );
}
