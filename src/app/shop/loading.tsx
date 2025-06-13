export default function ShopLoading() {
  return (
    <main className="container mx-auto px-4 pt-32 pb-24">
      <div className="h-12 w-48 bg-neutral-200 animate-pulse mb-12 mx-auto rounded"></div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar loading skeleton */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="h-8 w-32 bg-neutral-200 animate-pulse mb-6 rounded"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-full bg-neutral-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
        </aside>

        {/* Products grid loading skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[3/4] bg-neutral-200 animate-pulse rounded"></div>
                <div className="h-5 w-3/4 bg-neutral-200 animate-pulse rounded"></div>
                <div className="h-4 w-1/4 bg-neutral-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
