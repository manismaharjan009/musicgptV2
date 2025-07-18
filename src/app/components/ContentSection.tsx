"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import PopoverButton, { ToolOption } from "@/components/PopoverButton";
import VoiceList from "./VoiceList";
import VoiceSkeleton from "./VoiceSkeleton";
import ResultPopup from "./ResultPopup";
import clsx from "clsx";

interface VoiceResponse {
  data: Array<{
    id: string;
    voice_name: string;
    language: string;
    profile_picture: string;
    sample_audio_file: string;
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export default function ContentSection() {
  const [selectedOption, setSelectedOption] = useState<ToolOption>(
    ToolOption.CREATE_ANYTHING
  );
  const [voicesData, setVoicesData] = useState<VoiceResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [textareaContent, setTextareaContent] = useState("");
  const [popupData, setPopupData] = useState<{
    success: boolean;
    message: string;
    data: {
      id: string;
      prompt: string;
      status: string;
      estimatedTime: string;
      type: string;
    };
  } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  useEffect(() => {
    const fetchVoices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/voices");
        const data = await response.json();

        await new Promise(resolve => setTimeout(resolve, 1000));

        setVoicesData(data);
      } catch (error) {
        console.error("Error fetching voices:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVoices();
  }, []);

  const handleOptionSelect = (option: ToolOption) => {
    setSelectedOption(option);
    setTextareaContent("");
  };

  const handleSubmit = async () => {
    if (!textareaContent.trim()) return;

    const loadingData = {
      success: true,
      message: "Processing...",
      data: {
        id: "loading...",
        prompt: textareaContent.trim(),
        status: "processing",
        estimatedTime: "Calculating...",
        type: selectedOption.toLowerCase().replace("_", " "),
      },
    };

    setPopupData(loadingData);
    setIsPopupOpen(true);
    setIsLoadingResponse(true);
    setTextareaContent("");

    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: textareaContent.trim(),
          toolOption: selectedOption,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        setPopupData(data);
      } else {
        console.error("Error:", data.error);
        setPopupData({
          success: false,
          message: data.error,
          data: {
            id: "error",
            prompt: textareaContent.trim(),
            status: "error",
            estimatedTime: "N/A",
            type: selectedOption.toLowerCase().replace("_", " "),
          },
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      setPopupData({
        success: false,
        message: "Network error occurred",
        data: {
          id: "error",
          prompt: textareaContent.trim(),
          status: "error",
          estimatedTime: "N/A",
          type: selectedOption.toLowerCase().replace("_", " "),
        },
      });
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mx-auto px-[50px] md:w-[900px]">
      <div className="mb-6 text-center">
        <h1 className="mb-4 text-[32px] text-white">What song to create?</h1>
      </div>

      <div className="rounded-[27px] bg-gray-800 p-4">
        <div className="">
          {selectedOption === ToolOption.CREATE_ANYTHING && (
            <AutoResizeTextarea
              placeholder="Describe your song"
              className="border-none bg-transparent p-0 text-white placeholder-gray-400"
              minHeight="10px"
              maxHeight="300px"
              value={textareaContent}
              onChange={e => setTextareaContent(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          )}

          {selectedOption === ToolOption.TEXT_TO_SPEECH && (
            <div className="h-32">
              <div className="flex gap-4">
                <div className="w-1/2">
                  {isLoading ? (
                    <VoiceSkeleton />
                  ) : voicesData ? (
                    <VoiceList initialVoices={voicesData} />
                  ) : (
                    <div className="text-center text-gray-400">
                      Failed to load voices
                    </div>
                  )}
                </div>
                <div className="w-1/2">
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                      <Image
                        src="/logo.png"
                        alt="MusicGPT"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div>Default Voice</div>
                  </div>
                  <AutoResizeTextarea
                    placeholder="Enter text ..."
                    className="border-none bg-transparent p-0 text-white placeholder-gray-400"
                    minHeight="10px"
                    maxHeight="72px"
                    value={textareaContent}
                    onChange={e => setTextareaContent(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            {selectedOption === ToolOption.CREATE_ANYTHING && (
              <div className="flex flex-wrap gap-2">
                <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-neutral-500 transition-colors hover:border-neutral-600 hover:bg-neutral-500">
                  <Image
                    src="/svg/icon-attachment-white.svg"
                    alt="Instrumental"
                    width={20}
                    height={20}
                  />
                </div>
                <button className="flex cursor-pointer items-center gap-2 rounded-[18px] border border-neutral-500 px-2.5 py-1 text-sm text-white transition-colors hover:border-neutral-600 hover:bg-neutral-600">
                  <Image
                    src="/svg/icon-instrumental-white.svg"
                    alt="Instrumental"
                    width={20}
                    height={20}
                  />
                  Instrumental
                </button>
                <button className="flex cursor-pointer items-center gap-2 rounded-[18px] border border-neutral-500 px-2.5 py-1 text-sm text-white transition-colors hover:border-neutral-600 hover:bg-neutral-600">
                  <Image
                    src="/svg/icon-plus-white.svg"
                    alt="Instrumental"
                    width={20}
                    height={20}
                  />
                  Lyrics
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <PopoverButton onOptionSelect={handleOptionSelect} />
            <button
              className={clsx(
                "flex h-9 w-9 items-center gap-2 rounded-[18px] bg-white p-1.5 text-white transition-colors",
                textareaContent.trim().length > 0
                  ? "cursor-pointer"
                  : "opacity-40"
              )}
              disabled={!textareaContent.trim()}
              onClick={handleSubmit}
            >
              <Image
                src="/svg/icon-arrow-right-black.svg"
                alt="Instrumental"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>
      </div>

      <ResultPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        data={popupData}
        isLoading={isLoadingResponse}
      />
    </div>
  );
}
