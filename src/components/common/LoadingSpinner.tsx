const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="animate-rotation border-main m-3 box-border inline-block h-7 w-7 rounded-full border-[2.8px] border-b-transparent" />
    </div>
  );
};

export default LoadingSpinner;
