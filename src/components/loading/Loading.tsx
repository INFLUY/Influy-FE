import LoadingSpinner from '@/components/common/LoadingSpinner';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
