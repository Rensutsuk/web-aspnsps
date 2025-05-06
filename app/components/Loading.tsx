export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-base-100/50 backdrop-blur-sm z-50">
      <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
      <p className="text-lg font-semibold animate-pulse">Loading...</p>
    </div>
  );
}