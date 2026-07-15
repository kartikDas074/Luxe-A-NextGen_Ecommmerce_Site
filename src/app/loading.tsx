export default function Loading() {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-primary animate-pulse"></div>

        <div>
          <h1 className="text-4xl font-black tracking-widest text-primary">
            LUXE
          </h1>
          <p className="text-sm text-base-content/60">
            Premium Marketplace
          </p>
        </div>
      </div>

      {/* Spinner */}
      <span className="loading loading-spinner loading-lg text-primary"></span>

      <p className="mt-5 text-base-content/70 text-sm">
        Loading your shopping experience...
      </p>

      {/* Skeleton Products */}
      <div className="w-full max-w-7xl mt-16 px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="border border-base-300 rounded-2xl p-4"
            >
              <div className="skeleton h-40 w-full rounded-xl"></div>

              <div className="skeleton h-4 w-3/4 mt-4"></div>

              <div className="skeleton h-4 w-1/2 mt-2"></div>

              <div className="skeleton h-8 w-1/3 mt-5"></div>

              <div className="skeleton h-10 w-full mt-6 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}