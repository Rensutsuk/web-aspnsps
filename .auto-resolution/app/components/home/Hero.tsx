export default function Hero() {
  return (
    <div className="hero min-h-min bg-base-200 mt-16 py-10">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Church Name</h1>
          <p className="py-6">Welcome to our parish community. Join us in prayer and worship.</p>
          <a href="/services" className="btn btn-primary">Services Offered</a>
        </div>
      </div>
    </div>
  );
}