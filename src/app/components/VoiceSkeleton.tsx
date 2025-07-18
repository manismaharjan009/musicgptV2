export default function VoiceSkeleton() {
  return (
    <div className="h-[170px] overflow-y-auto">
      <div className="grid grid-cols-3 items-center justify-center gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="group cursor-pointer p-2">
            <div className="relative mx-auto h-[46px] w-[46px]">
              <div className="h-[46px] w-[46px] animate-pulse rounded-full bg-gray-600"></div>
            </div>
            <div className="mt-2 text-center">
              <div className="mx-auto mb-1 h-3 w-16 animate-pulse rounded bg-gray-600"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
