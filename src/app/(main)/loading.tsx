export default function Loading() {
  return (
    <div className="w-full">
      <div className="h-8 w-32 bg-muted rounded animate-pulse mb-8" />
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-full border bg-card text-card-foreground shadow-sm rounded-xl overflow-hidden transition-colors">
            {/* Thumbnail Skeleton */}
            <div className="relative aspect-video w-full bg-muted animate-pulse" />
            
            <div className="flex flex-col space-y-1.5 p-6">
              {/* Title Skeleton */}
              <div className="h-5 bg-muted rounded animate-pulse w-3/4 mb-2" />
              {/* Excerpt Skeleton */}
              <div className="h-4 bg-muted rounded animate-pulse w-full mb-1" />
              <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
            </div>
            
            <div className="p-6 pt-0">
              {/* Meta information Skeleton */}
              <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
