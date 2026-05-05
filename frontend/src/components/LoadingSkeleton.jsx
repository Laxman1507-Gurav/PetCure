export default function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-50" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-50 rounded-full w-3/4" />
            <div className="h-3 bg-gray-50 rounded-full w-full" />
            <div className="h-3 bg-gray-50 rounded-full w-5/6" />
            <div className="h-3 bg-gray-50 rounded-full w-2/3" />
            <div className="h-8 bg-gray-50 rounded-full w-1/3 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
