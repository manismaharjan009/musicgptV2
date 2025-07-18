"use client";

import { useState } from "react";
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
}

export default function PopoverButton({ onOptionSelect }: PopoverButtonProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClickOutside={() => setIsPopoverOpen(false)}
      positions={["top", "bottom", "right", "left"]}
      align="end"
      content={
        <div className="min-w-[400px] rounded-[27px] bg-[#1d212599] p-2.5 text-base backdrop-blur-[50px]">
          <div className="space-y-2 text-white">
            {TOOL_OPTIONS.map(option => (
              <div
                key={option.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#0003]"
                onClick={() => {
                  onOptionSelect(option.id);
                  setIsPopoverOpen(false);
                }}
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
              </div>
            ))}
          </div>
        </div>
      }
    >
      <button
        className={clsx(
          "flex h-9 cursor-pointer items-center gap-2 rounded-[18px] px-2.5 py-1 text-sm text-white transition-colors hover:border-neutral-600 hover:bg-[#303438]",
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
        />
      </button>
    </Popover>
  );
}
