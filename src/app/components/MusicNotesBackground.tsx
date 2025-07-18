"use client";

import AudioSpectrumBands from "./AudioSpectrumBands";

export default function MusicNotesBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <AudioSpectrumBands />

      {/* Additional floating notes for variety */}
      <div className="music-note float" style={{ left: "15%", top: "20%" }}>
        ♪
      </div>
      <div
        className="music-note float"
        style={{ left: "85%", top: "30%", animationDelay: "1s" }}
      >
        ♫
      </div>
      <div
        className="music-note float"
        style={{ left: "25%", top: "70%", animationDelay: "2s" }}
      >
        ♬
      </div>
      <div
        className="music-note float"
        style={{ left: "75%", top: "80%", animationDelay: "3s" }}
      >
        ♩
      </div>
    </div>
  );
}
