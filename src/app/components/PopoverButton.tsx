"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Popover } from "react-tiny-popover";
import clsx from "clsx";

export enum ToolOption {
  CREATE_ANYTHING = "create-anything",
  TEXT_TO_SPEECH = "text-to-speech",
}

export interface ToolOptionData {
  id: ToolOption;
  label: string;
  description: string;
  icon: string;
}

const TOOL_OPTIONS: ToolOptionData[] = [
  {
    id: ToolOption.CREATE_ANYTHING,
    label: "Create anything",
    description: "A simple text prompt to create it all",
    icon: "/svg/tool-icon-prompt.svg",
  },
  {
    id: ToolOption.TEXT_TO_SPEECH,
    label: "Text to speech",
    description: "Speak text in any voice",
    icon: "/svg/tool-icon-tts2.svg",
  },
];

interface PopoverButtonProps {
  onOptionSelect: (option: ToolOption) => void;
  selectedOption: ToolOption;
}

export default function PopoverButton({
  onOptionSelect,
  selectedOption,
}: PopoverButtonProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isPopoverOpen) {
      setShouldRender(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
      // Delay hiding to allow exit animation to complete
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200); // Match the slide-up animation duration
      return () => clearTimeout(timer);
    }
  }, [isPopoverOpen]);

  const handleClose = () => {
    setIsPopoverOpen(false);
  };

  const handleOptionSelect = (option: ToolOption) => {
    onOptionSelect(option);
    setIsPopoverOpen(false);
  };

  return (
    <Popover
      isOpen={shouldRender}
      onClickOutside={handleClose}
      positions={["top", "bottom", "right", "left"]}
      align="end"
      content={
        <div
          className={clsx(
            "min-w-[400px] rounded-[27px] bg-[#1d212599] p-2.5 text-base backdrop-blur-[50px]",
            isAnimating ? "popover-slide-down" : "popover-slide-up"
          )}
        >
          <div className="space-y-2 text-white">
            {TOOL_OPTIONS.map(option => (
              <div
                key={option.id}
                className="relative flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#0003]"
                onClick={() => handleOptionSelect(option.id)}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#252a2d]">
                  <Image
                    src={option.icon}
                    alt={option.label}
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex flex-col">
                  {option.label}
                  <span className="text-[13px] tracking-wide text-gray-400">
                    {option.description}
                  </span>
                </div>
                {option.id === selectedOption && (
                  <span className="absolute top-5 right-3 h-5 w-5 rounded-full bg-white p-[3px]">
                    <Image
                      src="/svg/icon-tick-white.svg"
                      alt="Instrumental"
                      width={15}
                      height={15}
                      className="invert filter"
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      }
    >
      <button
        className={clsx(
          "flex h-9 cursor-pointer items-center gap-2 rounded-[18px] px-2.5 py-1 text-sm text-white transition-all duration-300 hover:border-neutral-600 hover:bg-[#303438]",
          isPopoverOpen && "bg-neutral-600"
        )}
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        Tools
        <Image
          src="/svg/icon-chevron-down-white.svg"
          alt="Instrumental"
          width={20}
          height={20}
          className={clsx(
            "transition-transform duration-300",
            isPopoverOpen && "rotate-180"
          )}
        />
      </button>
    </Popover>
  );
}
