const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
