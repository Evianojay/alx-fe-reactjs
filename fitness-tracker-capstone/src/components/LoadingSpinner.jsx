const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
      <p className="text-lg">⚡ {message}</p>
    </div>
  </div>
);

export default LoadingSpinner;
