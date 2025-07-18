"use client";

export default function AudioSpectrumBands() {
  const bands = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {bands.map(band => (
        <div
          key={band}
          className={`audio-band vibrate-${(band % 5) + 1}`}
          style={{
            left: `${(band * 2) % 100}%`,
            animationDelay: `${(band * 0.1) % 2}s`,
            animationDuration: `${1.6 + (band % 3) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}
